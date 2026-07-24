import { FixtureInstance } from '@/api';
import { useGeosearchStore } from '../geosearch/store';
import { useLayerStore } from '@/stores/layer';
import type { LayerInstance } from '@/api/internal';
import type { ISearchResult } from '../geosearch/definitions';

/**
 * Configuration interface for the feature-search fixture.
 */
interface FeatureSearchConfig {
    /**
     * Optional list of layer IDs to search. If not provided, all feature layers are searched.
     */
    layers?: string[];

    /**
     * The category name displayed in the geosearch type filter for feature results.
     * Defaults to 'Map Feature'.
     */
    categoryName?: string;

    /**
     * Maximum number of results to return per layer.
     * Defaults to 50.
     */
    maxResultsPerLayer?: number;
}

/**
 * Strips accents from a string for accent-insensitive matching.
 * Replicates the grid's disregardAccents behavior.
 */
function disregardAccents(s: string): string {
    if (!s || typeof s !== 'string') return s;
    let r = s.toLowerCase();
    r = r.replace(/[àáâãäå]/g, 'a');
    r = r.replace(/æ/g, 'ae');
    r = r.replace(/ç/g, 'c');
    r = r.replace(/[èéêë]/g, 'e');
    r = r.replace(/[ìíîï]/g, 'i');
    r = r.replace(/ñ/g, 'n');
    r = r.replace(/[òóôõö]/g, 'o');
    r = r.replace(/œ/g, 'oe');
    r = r.replace(/[ùúûü]/g, 'u');
    r = r.replace(/[ýÿ]/g, 'y');
    return r;
}

class FeatureSearchFixture extends FixtureInstance {
    async added() {
        const config: FeatureSearchConfig = this.config ?? {};
        const categoryName = config.categoryName ?? 'Map Feature';
        const maxResultsPerLayer = config.maxResultsPerLayer ?? 50;
        const layerFilter = config.layers;

        const geosearchStore = useGeosearchStore(this.$vApp.$pinia);
        const layerStore = useLayerStore(this.$vApp.$pinia);
        const iApi = this.$iApi;

        // Add a custom source to geosearch that dynamically searches feature layer attributes
        const featureSource = {
            code: 'FEAT',
            catName: categoryName,
            onSearch: async (searchTerm: string): Promise<ISearchResult[]> => {
                // Decode and clean the search term (geosearch encodes it for web requests)
                const cleanedTerm = decodeURIComponent(geosearchStore.cleanVal(searchTerm)).replace('*', '');

                if (!cleanedTerm) {
                    return [];
                }

                // Split search on whitespace — all words must match (same as grid quickFilter)
                const searchWords = cleanedTerm.split(/\s+/).filter(w => w.length > 0);
                if (searchWords.length === 0) {
                    return [];
                }

                const results: ISearchResult[] = [];

                // Collect all layers (including sublayers via BFS)
                const allLayers: LayerInstance[] = [];
                const queue: LayerInstance[] = [...(layerStore.layers as unknown as LayerInstance[])];
                while (queue.length > 0) {
                    const layer = queue.shift()!;
                    if (layer.sublayers && layer.sublayers.length > 0) {
                        queue.push(...layer.sublayers);
                    }
                    allLayers.push(layer);
                }

                // Filter to feature layers that support features (same set as layers with datatables)
                const featureLayers = allLayers.filter(layer => {
                    if (!layer.supportsFeatures) return false;
                    if (!layer.isLoaded) return false;
                    if (layerFilter && layerFilter.length > 0) {
                        return layerFilter.includes(layer.id);
                    }
                    return true;
                });

                // Search each feature layer's attributes across all columns (same as grid "search table")
                const searchPromises = featureLayers.map(async layer => {
                    try {
                        const attribSet = await layer.getAttributes();
                        if (!attribSet || !attribSet.features || attribSet.features.length === 0) {
                            return [];
                        }

                        // Get searchable field names (text and number fields, matching grid behavior)
                        const searchableFields = layer.fields
                            .filter(f => {
                                const t = f.type.toLowerCase();
                                return (
                                    t === 'string' ||
                                    t === 'double' ||
                                    t === 'integer' ||
                                    t === 'small-integer' ||
                                    t === 'single' ||
                                    t === 'long' ||
                                    t === 'oid'
                                );
                            })
                            .map(f => f.name);

                        if (searchableFields.length === 0) {
                            return [];
                        }

                        const nameField = layer.nameField || searchableFields[0];

                        // Search through features: concatenate all field values and check
                        // if ALL search words match (replicating AG Grid quickFilter behavior)
                        const layerResults: ISearchResult[] = [];
                        for (const feature of attribSet.features) {
                            if (layerResults.length >= maxResultsPerLayer) break;

                            // Build a concatenated string of all searchable column values
                            const rowText = searchableFields
                                .map(fieldName => {
                                    const val = feature[fieldName];
                                    if (val == null) return '';
                                    return String(val);
                                })
                                .join(' ');

                            const normalizedRowText = disregardAccents(rowText);

                            // All search words must be found somewhere in the row
                            const allWordsMatch = searchWords.every(word => normalizedRowText.includes(word));

                            if (allWordsMatch) {
                                // Use the nameField value for display
                                const displayName = feature[nameField] != null ? String(feature[nameField]) : '(unnamed)';

                                // Try to get a bounding box for this feature.
                                // Use the layer extent as fallback.
                                let bbox: number[] | undefined;

                                if (layer.extent) {
                                    const ext = layer.extent;
                                    if (ext.sr.wkid === 4326) {
                                        bbox = [ext.xmin, ext.ymin, ext.xmax, ext.ymax];
                                    } else {
                                        try {
                                            const projExt = await iApi.geo.proj.projectExtent(
                                                'EPSG:4326',
                                                ext
                                            );
                                            bbox = [
                                                projExt.xmin,
                                                projExt.ymin,
                                                projExt.xmax,
                                                projExt.ymax
                                            ];
                                        } catch {
                                            // If projection fails, skip bbox
                                        }
                                    }
                                }

                                if (!bbox) {
                                    bbox = [-180, -90, 180, 90];
                                }

                                layerResults.push({
                                    name: displayName,
                                    type: `${categoryName} (${layer.name})`,
                                    bbox,
                                    flav: 'nme',
                                    location: {},
                                    order: 999
                                });
                            }
                        }
                        return layerResults;
                    } catch {
                        // If fetching attributes fails, skip the layer
                        return [];
                    }
                });

                const allResults = await Promise.all(searchPromises);
                for (const layerResults of allResults) {
                    results.push(...layerResults);
                }

                return results;
            }
        };

        // Inject the custom source into geosearch's config
        geosearchStore.GSservice.config.customSources.push(featureSource);
    }

    removed() {
        // Remove the custom source from geosearch
        const geosearchStore = useGeosearchStore(this.$vApp.$pinia);
        const idx = geosearchStore.GSservice.config.customSources.findIndex(s => s.code === 'FEAT');
        if (idx >= 0) {
            geosearchStore.GSservice.config.customSources.splice(idx, 1);
        }
    }
}

export default FeatureSearchFixture;
