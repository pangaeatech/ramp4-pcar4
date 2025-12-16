/*
Test 16: Image Tile Layer
- Loads an image tile layer from an external source (WDPA)
 */

const runPreTest = (config, options, utils) => {
    const wdpa = {
        id: 'landcover',
        name: 'North American Land Cover',
        layerType: 'esri-imagery-tile',
        url: 'https://tiledimageservices7.arcgis.com/oF9CDB4lUYF7Um9q/arcgis/rest/services/NA_NALCMS_landcover_2020v2_30m/ImageServer'
    };

    utils.addLayerLegend(wdpa);
    config.configs.en.map.initialBasemapId = 'baseEsriTerrain';
    config.configs.fr.map.initialBasemapId = 'baseEsriTerrain';

    return { config, options };
};

const runPostTest = () => {
    // Not used in this test
};

export { runPreTest, runPostTest };
