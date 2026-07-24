const runPreTest = (config, options, utils) => {

    // Add feature-search fixture
    config.startingFixtures.push('feature-search');

    // Configure feature-search
    config.configs.en.fixtures['feature-search'] = {
        maxResultsPerLayer: 50
    };
    config.configs.fr.fixtures['feature-search'] = {
        maxResultsPerLayer: 50
    };

    // Add a feature layer to search through
    const featureLayerConfig = {
        id: 'search-demo-layer',
        layerType: 'esri-feature',
        url: 'https://section917.canadacentral.cloudapp.azure.com/arcgis/rest/services/TestData/Oilsands/MapServer/0',
        name: 'Oil Sands Facilities'
    };

    utils.addLayer(featureLayerConfig);

    return { config, options };
};

const runPostTest = () => {
    // Not used in this test
};

export { runPreTest, runPostTest };
