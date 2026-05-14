<template>
  <div class="page-container">
    <div class="page-header">
      <span class="page-title">Handsontable</span>
      <a class="page-link" href="https://handsontable.com/docs/javascript-data-grid/vue3-installation/">
        Documentation
      </a>
    </div>
    <div class="table-wrapper">
      <div ref="hotContainer" class="hot-container">
        <hot-table
          ref="hotTableRef"
          :data="data"
          :settings="settings"
          :row-headers="true"
          :col-headers="true"
        />
      </div>
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
  mergeCells: [
    { row: 1, col: 0, rowspan: 2, colspan: 1 },
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
.hot-container {
  height: 60vh;
  width: 100%;
}

@media (max-width: 768px) {
  .hot-container {
    height: 50vh;
  }
}
</style>
