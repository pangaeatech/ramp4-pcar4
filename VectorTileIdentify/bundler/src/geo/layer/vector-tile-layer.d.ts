import { CommonTileLayer, InstanceAPI, IdentifyResult } from '../../api/internal';
import { IdentifyParameters, RampLayerConfig } from '../api';
import { EsriVectorTileLayer } from '../esri';
/**
 * A layer class which implements an ESRI Vector Tile Layer.
 */
export declare class VectorTileLayer extends CommonTileLayer {
    esriLayer: EsriVectorTileLayer | undefined;
    constructor(rampConfig: RampLayerConfig, $iApi: InstanceAPI);
    protected onInitiate(): Promise<void>;
    /**
     * Take a layer config from the RAMP application and derives a configuration for an ESRI layer
     *
     * @param rampLayerConfig snippet from RAMP for this layer
     * @returns configuration object for the ESRI layer representing this layer
     */
    protected makeEsriLayerConfig(rampLayerConfig: RampLayerConfig): __esri.VectorTileLayerProperties;
    runIdentify(options: IdentifyParameters): Array<IdentifyResult>;
    toHTML(attributes: {
        [key: string]: object;
    }): string;
}
