<template>
    <panel-screen :panel="panel">
        <template #header>{{ t('feature-search.title') }}</template>

        <template #content>
            <div class="flex flex-col h-full">
                <!-- Search bar -->
                <div class="flex-none px-8 py-8">
                    <input
                        type="text"
                        class="w-full border border-gray-400 rounded px-8 py-4 text-sm"
                        :placeholder="t('feature-search.searchText')"
                        v-model="searchTerm"
                        @input="onSearchInput"
                    />
                </div>

                <!-- Loading indicator -->
                <div v-if="isLoading" class="px-8 py-4 text-sm text-gray-600">
                    {{ t('feature-search.loading') }}
                </div>

                <!-- No results message -->
                <div
                    class="px-8 mb-10 py-8 flex-grow text-wrap border-y border-gray-600 overflow-y-auto"
                    v-if="searchTerm.length >= 3 && results.length === 0 && !isLoading"
                >
                    <span class="relative h-48">
                        {{ t('feature-search.noResults') }}
                        <span class="font-bold text-blue-600">"{{ searchTerm }}"</span>
                    </span>
                </div>

                <!-- Results list -->
                <ul
                    class="flex-grow mb-5 border-t border-b border-gray-600 overflow-y-auto"
                    v-focus-list
                    v-if="results.length > 0"
                >
                    <li
                        v-for="(result, idx) in results"
                        :key="idx"
                        class="relative flex items-center px-8 py-4 border-b border-gray-200 hover:bg-gray-200"
                        v-focus-item
                    >
                        <!-- Icon -->
                        <span
                            class="flex-none w-24 h-24 flex items-center justify-center mr-4"
                            v-html="result.icon"
                        ></span>

                        <!-- Feature name and layer name -->
                        <div class="flex-grow min-w-0 mr-4">
                            <div class="text-sm font-bold truncate">{{ result.name }}</div>
                            <div class="text-xs text-gray-600 truncate">{{ result.layerName }}</div>
                        </div>

                        <!-- Zoom button -->
                        <button
                            type="button"
                            class="flex-none flex items-center justify-center w-28 h-28 p-2 text-gray-600 hover:text-black"
                            :content="t(`feature-search.zoom${result.zoomStatus === 'none' ? '' : '.' + result.zoomStatus}`)"
                            v-tippy="{ placement: 'top' }"
                            :aria-label="t(`feature-search.zoom${result.zoomStatus === 'none' ? '' : '.' + result.zoomStatus}`)"
                            @click="zoomToFeature(result)"
                            v-if="result.isMapLayer"
                        >
                            <div v-if="result.zoomStatus === 'zooming'" class="animate-spin spinner h-16 w-16"></div>
                            <svg
                                v-else-if="result.zoomStatus === 'zoomed'"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="green"
                                class="w-16 h-16"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            <svg
                                v-else-if="result.zoomStatus === 'error'"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="red"
                                class="w-16 h-16"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span v-else v-html="iApi.ui.getZoomIcon()"></span>
                        </button>

                        <!-- Details button -->
                        <button
                            type="button"
                            class="flex-none flex items-center justify-center w-28 h-28 p-2 text-gray-600 hover:text-black"
                            :content="t('feature-search.details')"
                            v-tippy="{ placement: 'top' }"
                            :aria-label="t('feature-search.details')"
                            @click="openDetails(result)"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16">
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path
                                    style="fill: #979797"
                                    d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"
                                />
                            </svg>
                        </button>
                    </li>
                </ul>
            </div>
        </template>
    </panel-screen>
</template>

<script setup lang="ts">
import { inject, ref, reactive } from 'vue';
import type { PropType } from 'vue';
import type { InstanceAPI, PanelInstance, LayerInstance } from '@/api/internal';
import { GlobalEvents } from '@/api/internal';
import { IdentifyResultFormat } from '@/geo/api';
import { useLayerStore } from '@/stores/layer';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const iApi = inject('iApi') as InstanceAPI;
const layerStore = useLayerStore();

defineProps({
    panel: {
        type: Object as PropType<PanelInstance>
    }
});

interface FeatureResult {
    name: string;
    layerName: string;
    icon: string;
    uid: string;
    oid: number;
    isMapLayer: boolean;
    zoomStatus: 'none' | 'zooming' | 'zoomed' | 'error';
}

const searchTerm = ref('');
const results = reactive<FeatureResult[]>([]);
const isLoading = ref(false);
let searchDebounce: ReturnType<typeof setTimeout> | null = null;

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

const onSearchInput = () => {
    if (searchDebounce) {
        clearTimeout(searchDebounce);
    }
    searchDebounce = setTimeout(() => {
        runSearch();
    }, 300);
};

const runSearch = async () => {
    const term = searchTerm.value.trim();

    // Clear results if search is too short
    if (term.length < 3) {
        results.splice(0, results.length);
        return;
    }

    isLoading.value = true;
    results.splice(0, results.length);

    const normalizedTerm = disregardAccents(term);
    // Split on whitespace — all words must match (same as grid quickFilter)
    const searchWords = normalizedTerm.split(/\s+/).filter(w => w.length > 0);

    if (searchWords.length === 0) {
        isLoading.value = false;
        return;
    }

    // Get the fixture config for layer filtering
    const fixtureConfig = iApi.fixture.get('feature-search')?.config ?? {};
    const layerFilter: string[] | undefined = fixtureConfig.layers;
    const maxResultsPerLayer = fixtureConfig.maxResultsPerLayer ?? 50;

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
                    const fieldType = f.type.toLowerCase();
                    return (
                        fieldType === 'string' ||
                        fieldType === 'double' ||
                        fieldType === 'integer' ||
                        fieldType === 'small-integer' ||
                        fieldType === 'single' ||
                        fieldType === 'long' ||
                        fieldType === 'oid'
                    );
                })
                .map(f => f.name);

            if (searchableFields.length === 0) {
                return [];
            }

            const oidField = layer.oidField;
            const layerResults: FeatureResult[] = [];

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
                    const displayName = layer.nameValue(feature) || '(unnamed)';
                    const oid = feature[oidField];

                    // Get icon
                    let iconStr = '';
                    try {
                        iconStr = await layer.getIcon(oid);
                    } catch {
                        // Icon fetch failed, leave empty
                    }

                    layerResults.push({
                        name: displayName,
                        layerName: layer.name,
                        icon: iconStr,
                        uid: layer.uid,
                        oid,
                        isMapLayer: layer.mapLayer,
                        zoomStatus: 'none'
                    });
                }
            }
            return layerResults;
        } catch {
            return [];
        }
    });

    const allResults = await Promise.all(searchPromises);
    for (const layerResults of allResults) {
        results.push(...layerResults);
    }

    isLoading.value = false;
};

const zoomToFeature = (result: FeatureResult) => {
    if (result.zoomStatus !== 'none') return;

    result.zoomStatus = 'zooming';
    const layer = layerStore.getLayerByUid(result.uid);

    if (!layer || !layer.isLoaded) {
        updateZoomStatus(result, 'error');
        return;
    }

    layer.zoomToFeature(result.oid).then(success => {
        if (success) {
            updateZoomStatus(result, 'zoomed');
            iApi.updateAlert(t('feature-search.zoom.zoomed'));
        } else {
            updateZoomStatus(result, 'error');
        }
    });
};

const updateZoomStatus = (result: FeatureResult, status: 'zooming' | 'zoomed' | 'error' | 'none') => {
    if (status === 'zoomed' || status === 'error') {
        setTimeout(() => {
            result.zoomStatus = status;
            setTimeout(() => {
                result.zoomStatus = 'none';
            }, 3000);
        }, 300);
    } else {
        result.zoomStatus = status;
    }
};

const openDetails = async (result: FeatureResult) => {
    const layer = layerStore.getLayerByUid(result.uid);
    if (!layer) return;

    const sourceGraphic = await layer.getGraphic(result.oid, { getAttribs: true });

    iApi.event.emit(
        GlobalEvents.DETAILS_TOGGLE,
        {
            data: sourceGraphic.attributes,
            uid: result.uid,
            format: IdentifyResultFormat.ESRI
        },
        true
    );
};
</script>

<style lang="scss" scoped></style>
