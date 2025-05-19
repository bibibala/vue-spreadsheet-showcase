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
  margin: 20px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

button {
  margin-right: 12px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #2c3e50;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:hover {
  background: #f0f2f5;
  border-color: #d0d0d0;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button:active {
  transform: translateY(0);
  box-shadow: none;
}

button:last-child {
  margin-right: 0;
}
</style>
