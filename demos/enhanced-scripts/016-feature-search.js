const runPreTest = (config, options, utils) => {

    // Add geosearch and feature-search fixtures
    config.startingFixtures.push('geosearch');
    config.startingFixtures.push('feature-search');

    // Configure feature-search
    config.configs.en.fixtures['feature-search'] = {
        categoryName: 'Map Feature',
        maxResultsPerLayer: 50
    };
    config.configs.fr.fixtures['feature-search'] = {
        categoryName: 'Entité cartographique',
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
