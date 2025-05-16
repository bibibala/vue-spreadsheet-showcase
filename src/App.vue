<template>
  <div>
    <div class="btn-group">
      <button @click="goTo('/handsontable')">Handsontable</button>
      <button @click="goTo('/spreadsheet')">JSpreadsheet</button>
      <button @click="goTo('/ag-grid')">Ag-Grid</button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function goTo(name) {
  router.push({ path: name });
}
</script>

<style scoped>
.btn-group {
  margin-bottom: 16px;
  margin-left: 10px;
}

button {
  margin-right: 10px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>
