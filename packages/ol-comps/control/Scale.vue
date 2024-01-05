<!-- eslint-disable no-unused-vars -->
<script setup>
import { defineOptions, inject } from 'vue'
import ScaleLine from "ol/control/ScaleLine";

defineOptions({
    name: "L-Scale"
})
const getMap = inject("getMap")

getMap(map => {
    console.log(map);
    initScale(map)
});

const initScale = (map) => {
    let scale = new ScaleLine();
    map.addControl(scale);
}

</script>

<template>
    <div class="Scale-container">

    </div>
</template>

<style scoped ></style>