<template>
  <div
    ref="hotContainer"
    class="ht-theme-main-dark-auto"
    style="height: 100vh; width: 100vw;"
  >
    <hot-table
      ref="hotTableRef"
      :data="data"
      :settings="settings"
      :row-headers="true"
      :col-headers="true"
    ></hot-table>
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
  readOnly: true,
  mergeCells: [
    { row: 1, col: 0, rowspan: 2, colspan: 1 },
    // { row: 3, col: 0, rowspan: 1, colspan: 1 },
    // { row: 4, col: 0, rowspan: 1, colspan: 2 },
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
