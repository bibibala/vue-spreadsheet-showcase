<template>
  <div style="padding: 10px 10px">
    <a href="https://www.ag-grid.com/">AgGrid</a>
    <ag-grid-vue
      :rowData="rowData"
      :columnDefs="colDefs"
      style="width: 100vw; height: 80vh"
      :defaultColDef="defaultColDef"
      :animateRows="true"
      @grid-ready="onGridReady"
    ></ag-grid-vue>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([AllCommunityModule]);

const defaultColDef = ref({
  minWidth: 100,
  resizable: true,
  suppressSizeToFit: false,
});

const rowData = ref([
  {
    pubg: 1200,
    lol: 3500,
    csgo: 2100,
    fearless: 1800,
    power1: 80,
    power2: 76,
    power3: 82,
    power4: 69,
    power5: 91,
  },
  {
    pubg: 1100,
    lol: 3000,
    csgo: 2200,
    fearless: 1600,
    power1: 85,
    power2: 77,
    power3: 79,
    power4: 70,
    power5: 88,
  },
  {
    pubg: 1400,
    lol: 3800,
    csgo: 2300,
    fearless: 1900,
    power1: 83,
    power2: 74,
    power3: 84,
    power4: 71,
    power5: 93,
  },
]);

const colDefs = ref([
  {
    field: "pubg",
    headerName: "PUBG 玩家数",
    sortable: false,
    filter: true,
    flex: 10,
  },
  { field: "lol", headerName: "英雄联盟" },
  { field: "csgo", headerName: "CS:GO 玩家数" },
  { field: "fearless", headerName: "无畏契约" },
  { field: "power1", headerName: "电量 A区" },
  { field: "power2", headerName: "电量 B区" },
  { field: "power3", headerName: "电量 C区" },
  { field: "power4", headerName: "电量 D区" },
  { field: "power5", headerName: "电量 E区" },
]);

function onGridReady(data) {
  console.log(data.api);
}
</script>
