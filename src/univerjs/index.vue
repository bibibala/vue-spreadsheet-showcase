<template>
  <div class="univer-container">
    <a
      class="table-link"
      href="https://docs.univer.ai/zh-CN/guides/sheets/integrations/vue"
    >
      Univer Documentation（开发套件包含docs excel 等等） &
      适合更复杂的在线编辑多人协作等场景
    </a>
    <div class="sheet-container">
      <div ref="container" class="univer-sheet"></div>
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
.univer-container {
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

.sheet-container {
  height: 60vh;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
}

.univer-sheet {
  width: 100%;
  height: 100%;
}
</style>
