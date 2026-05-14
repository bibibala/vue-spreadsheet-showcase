<template>
  <div class="page-container">
    <div class="page-header">
      <span class="page-title">Univer</span>
      <a class="page-link" href="https://docs.univer.ai/zh-CN/guides/sheets/integrations/vue">
        Documentation — 适合复杂在线编辑多人协作场景
      </a>
    </div>
    <div class="table-wrapper">
      <div ref="container" style="width: 100%; height: 100%" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";

import {
  createUniver,
  defaultTheme,
  LocaleType,
  merge,
} from "@univerjs/presets";
import { UniverSheetsCorePreset } from "@univerjs/presets/preset-sheets-core";
import UniverPresetSheetsCoreZhCN from "@univerjs/presets/preset-sheets-core/locales/zh-CN";

import "@univerjs/presets/lib/styles/preset-sheets-core.css";

const container = ref(null);

let univerInstance = null;
let univerAPIInstance = null;

onMounted(() => {
  const { univer, univerAPI } = createUniver({
    locale: LocaleType.ZH_CN,
    locales: {
      [LocaleType.ZH_CN]: merge({}, UniverPresetSheetsCoreZhCN),
    },
    theme: defaultTheme,
    presets: [
      UniverSheetsCorePreset({
        container: container.value,
      }),
    ],
  });

  univerAPI.createWorkbook({ name: "Test Sheet" });

  univerInstance = univer;
  univerAPIInstance = univerAPI;
});

onBeforeUnmount(() => {
  univerInstance.dispose();
  univerAPIInstance.dispose();
  univerInstance = null;
  univerAPIInstance = null;
});
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
