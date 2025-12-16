import { AttribLayer, InstanceAPI, ReactiveIdentifyFactory } from '@/api/internal';
import type { IdentifyResult } from '@/api/internal';
import { DefPromise, GeometryType, IdentifyResultFormat, LayerFormat, LayerIdentifyMode, LayerType } from '@/geo/api';
import type { IdentifyParameters, Point, RampLayerConfig } from '@/geo/api';
import { EsriAPI } from '@/geo/esri';
import type { EsriImageryTileLayer } from '@/geo/esri';
import { markRaw, reactive } from 'vue';

/**
 * A layer class which implements an ESRI ImageryTile Layer.
 */
export class ImageryTileLayer extends AttribLayer {
    declare esriLayer: EsriImageryTileLayer | undefined;

    constructor(rampConfig: RampLayerConfig, $iApi: InstanceAPI) {
        super(rampConfig, $iApi);

        this.layerType = LayerType.IMAGERYTILE;
        this.layerFormat = LayerFormat.IMAGERYTILE;
        this.schemaLocked = false;
        this.supportsIdentify = true;
        this.identifyMode = LayerIdentifyMode.GEOMETRIC;
        this.features = await EsriRequest(layerUrl + "/rasterAttributeTable", { query: { f: "json" } })?.data?.features;
    }

    protected async onInitiate(): Promise<void> {
        this.esriLayer = markRaw(await EsriAPI.ImageryTileLayer(this.makeEsriLayerConfig(this.origRampConfig)));
        await super.onInitiate();
    }

    /**
     * Take a layer config from the RAMP application and derives a configuration for an ESRI layer
     *
     * @param rampLayerConfig snippet from RAMP for this layer
     * @returns configuration object for the ESRI layer representing this layer
     */
    protected makeEsriLayerConfig(rampLayerConfig: RampLayerConfig): __esri.ImageryTileLayerProperties {
        const esriConfig: __esri.ImageryTileLayerProperties = super.makeEsriLayerConfig(rampLayerConfig);

        return esriConfig;
    }

    runIdentify(options: IdentifyParameters): Array<IdentifyResult> {
        if (!this.canIdentify() || !this.esriLayer.identify) {
            return [];
        }

        const dProm = new DefPromise<void>();

        const result: IdentifyResult = reactive({
            items: [],
            loading: dProm.getPromise(),
            loaded: false,
            errored: false,
            uid: this.uid,
            layerId: this.id,
            requestTime: Date.now()
        });

        this.esriLayer.identify(options.geometry.toESRI(), { returnPixelValue: true }).then((hitResult) => {
            if (hitResult.value !== undefined) {
                result.items.push(ReactiveIdentifyFactory.makeRawItem(IdentifyResultFormat.HTML, this.toHTML(hitResult.value)));
            }

            result.loaded = true;
            dProm.resolveMe();
        })
        .catch(() => {
            result.errored = true;
            dProm.resolveMe(); // keeping it this way so that we don't need to make annoying changes
        });

        return [ result ];
    }

    toHTML(value: number | string): string {
        const string = `<div class="p-5 pl-3 flex justify-end flex-wrap even:bg-gray-300"><span class="inline font-bold">Value</span><span class="flex-auto"></span><span class="inline">${value}</span></div>`;

        return `<div class="p-8">${string}</div>`;
    }
}
