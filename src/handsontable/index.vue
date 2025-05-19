<template>
  <div class="table-container">
    <a
      class="table-link"
      href="https://handsontable.com/docs/javascript-data-grid/vue3-installation/"
    >
      Handsontable Documentation
    </a>
    <div ref="hotContainer" class="ht-theme-main-dark-auto hot-container">
      <hot-table
        ref="hotTableRef"
        :data="data"
        :settings="settings"
        :row-headers="true"
        :col-headers="true"
      ></hot-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { HotTable } from "@handsontable/vue3";
import { registerAllModules } from "handsontable/registry";
import "handsontable/styles/handsontable.min.css";
import "handsontable/styles/ht-theme-main.min.css";

registerAllModules();

const data = ref([
  ["SSS", "Ford", "Volvo", "Toyota", "Honda"],
  ["2016", 10, 11, 12, 13],
  ["2017", 20, 11, 14, 13],
  ["2018", 30, 15, 12, 13],
]);

const settings = {
  licenseKey: "non-commercial-and-evaluation",
  stretchH: "all",
  width: "100%",
  height: "100%",
  autoWrapRow: true,
  autoWrapCol: true,
  // readOnly: true,
  mergeCells: [
    { row: 1, col: 0, rowspan: 2, colspan: 1 },
    // { row: 3, col: 0, rowspan: 1, colspan: 1 },
    // { row: 4, col: 0, rowspan: 1, colspan: 2 },
  ],
  nestedHeaders: [
    [
      { label: "Group A", colspan: 2 },
      { label: "Group B", colspan: 3 },
    ],
    ["Col A", "Col B", "Col C", "Col D"],
  ],
  cells(row, col) {
    return {
      className: "htCenter htMiddle",
    };
  },
};

const hotTableRef = ref(null);

onMounted(async () => {
  await nextTick();
  const hotInstance = hotTableRef.value?.hotInstance;

  if (hotInstance) {
    hotInstance.render();
  }

  window.addEventListener("resize", () => {
    if (hotTableRef.value?.hotInstance) {
      hotTableRef.value.hotInstance.render();
    }
  });
});
</script>

<style scoped>
.table-container {
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.table-link {
  display: inline-block;
  margin-bottom: 16px;
  color: #2c3e50;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;
}

.table-link:hover {
  color: #42b983;
}

.hot-container {
  height: 60vh;
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
}

:deep(.htCore) {
  font-size: 14px;
}

:deep(.ht_master) {
  border-radius: 6px;
}
</style>
