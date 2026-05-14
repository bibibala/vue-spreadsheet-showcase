<template>
  <div class="page-container">
    <div class="page-header">
      <span class="page-title">AG Grid</span>
      <a class="page-link" href="https://www.ag-grid.com/">
        Documentation — 适合展示数据
      </a>
    </div>
    <div class="table-wrapper">
      <ag-grid-vue
        style="width: 100%; height: 100%"
        :rowData="rowData"
        :columnDefs="colDefs"
        :defaultColDef="defaultColDef"
        :animateRows="true"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

const defaultColDef = ref({
  minWidth: 100,
  resizable: true,
  suppressSizeToFit: false,
});

const rowData = ref([
  {
    pubg: 1200, lol: 3500, csgo: 2100, fearless: 1800,
    power1: 80, power2: 76, power3: 82, power4: 69, power5: 91,
  },
  {
    pubg: 1100, lol: 3000, csgo: 2200, fearless: 1600,
    power1: 85, power2: 77, power3: 79, power4: 70, power5: 88,
  },
  {
    pubg: 1400, lol: 3800, csgo: 2300, fearless: 1900,
    power1: 83, power2: 74, power3: 84, power4: 71, power5: 93,
  },
]);

const colDefs = ref([
  { field: "pubg", headerName: "PUBG 玩家数", sortable: false, filter: true, flex: 10 },
  { field: "lol", headerName: "英雄联盟" },
  { field: "csgo", headerName: "CS:GO 玩家数" },
  { field: "fearless", headerName: "无畏契约" },
  { field: "power1", headerName: "电量 A区" },
  { field: "power2", headerName: "电量 B区" },
  { field: "power3", headerName: "电量 C区" },
  { field: "power4", headerName: "电量 D区" },
  { field: "power5", headerName: "电量 E区" },
]);
</script>

<style scoped>
.table-wrapper {
  height: 60vh;
}

@media (max-width: 768px) {
  .table-wrapper {
    height: 50vh;
  }
}
</style>
