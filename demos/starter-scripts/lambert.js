import { createInstance, geo } from '@/main';

window.debugInstance = null;

let config = {
    configs: {
        en: {
            map: {
                caption: { mapCoords: { formatter: "LAT_LONG_DMS" } },
                extentSets: [
                    {
                        id: 'ExtentSet',
                        default: {
                            xmin: -12741963.1763155,
                            ymin: -12741963.1763148,
                            xmax: 12741963.1763155,
                            ymax: 12741963.1763148,
                            spatialReference: {
                                wkt: 'PROJCS["Sphere_ARC_INFO_Lambert_Azimuthal_Equal_Area",GEOGCS["GCS_Sphere_ARC_INFO",DATUM["D_Sphere_ARC_INFO",SPHEROID["Sphere_ARC_INFO",6370997.0,0.0]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Lambert_Azimuthal_Equal_Area"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",-100.0],PARAMETER["Latitude_Of_Origin",45.0],UNIT["Meter",1.0]]',
                                wkid: 2163
                            }
                        }
                    }
                ],
                lodSets: [
                    {
                        id: 'LOD',
                        lods: [
                            { level: 0, resolution: 49773.2936574822, scale: 188119535.083397 },
                            { level: 1, resolution: 24886.6468287411, scale: 94059767.5416987 },
                            { level: 2, resolution: 12443.3234143706, scale: 47029883.7708494 },
                            { level: 3, resolution: 6221.66170718528, scale: 23514941.8854247 },
                            { level: 4, resolution: 3110.83085359264, scale: 11757470.9427123 },
                            { level: 5, resolution: 1555.41542679632, scale: 5878735.47135617 },
                            { level: 6, resolution: 777.70771339816, scale: 2939367.73567809 },
                            { level: 7, resolution: 388.85385669908, scale: 1469683.86783904 },
                            { level: 8, resolution: 194.42692834954, scale: 734841.933919521 },
                            { level: 9, resolution: 97.21346417477, scale: 367420.966959761 },
                            { level: 10, resolution: 48.606732087385, scale: 183710.48347988 },
                            { level: 11, resolution: 24.3033660436925, scale: 91855.2417399402 }
                        ]
                    }
                ],
                tileSchemas: [
                    {
                        id: "TileSchema",
                        name: "Tile Schema",
                        extentSetId: "ExtentSet",
                        lodSetId: "LOD",
                        thumbnailTileUrls: [],
                        hasNorthPole: false,
                        recoveryBasemap: {
                            basemapId: "basemap"
                        }
                    }
                ],
                basemaps: [
                    {
                        id: "basemap",
                        name: "My Basemap",
                        layers: [
                            {
                                id: "cecBasemapTileLayer",
                                layerType: "esri-vector-tile",
                                url: "https://tiles.arcgis.com/tiles/oF9CDB4lUYF7Um9q/arcgis/rest/services/CEC_Base_Map_English/VectorTileServer"
                            }
                        ],
                        tileSchemaId: "TileSchema",
                    }
                ],
                initialBasemapId: "basemap"
            },
        }
    }
};

let options = {
    loadDefaultFixtures: false,
    loadDefaultEvents: true
};

const rInstance = createInstance(document.getElementById('app'), config, options);
rInstance.fixture.addDefaultFixtures(['northarrow', 'appbar', 'overviewmap']);

window.debugInstance = rInstance;
