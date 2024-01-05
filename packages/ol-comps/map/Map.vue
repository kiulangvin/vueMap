<!-- eslint-disable no-unused-vars -->
<script setup>
import Map from 'ol/Map'
import View from 'ol/View'

import { epsg4490 } from '../../utils/epsg'
import { basemap_tdt } from '../../utils/basemap'

import { defineOptions, reactive, onMounted, provide } from 'vue'

defineOptions({
    name: "L-Map"
})

const state = reactive({
    map: null
})

onMounted(() => {
    initMap()
})

const initMap = () => {
    state.map = new Map({
        target: 'Map-container',
        view: new View({
            center: [119.876, 30.716],
            zoom: 12,
            projection: epsg4490()
        }),
        layers: basemap_tdt('vec_c')
    })
}

const getMap = (calllback) => {
    function checkForMap() {
        if (state.map) {
            calllback(state.map);
        } else {
            setTimeout(checkForMap, 50);
        }
    }
    checkForMap();
}

provide('getMap', getMap)

</script>

<template>
    <div class="Map-container" id="Map-container">
        <slot></slot>
    </div>
</template>

<style scoped>
.Map-container {
    width: 100%;
    height: 100%;
    background: black;
}
</style>