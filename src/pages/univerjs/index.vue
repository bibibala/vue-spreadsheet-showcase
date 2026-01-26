<template>
  <div class="univer-container">
    <a
      class="table-link"
      href="https://docs.univer.ai/zh-CN/guides/sheets/integrations/vue"
    >
      Univer Documentation（开发套件包含docs excel 等等） &
      适合更复杂的在线编辑多人协作等场景
    </a>
    <div class="toolbar">
      <button class="btn btn-primary" @click="handleImport">导入Excel</button>
      <button class="btn btn-success" @click="handleExport">导出Excel</button>
    </div>
    <div class="sheet-container">
      <div ref="container" class="univer-sheet"></div>
    </div>
    <input ref="fileInput" type="file" accept=".xlsx" style="display: none" @change="handleFileChange">
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import LuckyExcel from '@zwight/luckyexcel';

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
const fileInput = ref(null);

let univerInstance = null;
let univerAPIInstance = null;

const handleImport = () => {
  fileInput.value.click();
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  LuckyExcel.transformExcelToUniver(
    file,
    (exportJson) => {
      if (!exportJson || !exportJson.sheets || exportJson.sheets.length === 0) {
        alert('无法读取Excel文件内容');
        return;
      }
      initUniver(exportJson);
    },
    (error) => {
      alert('导入失败: ' + error.message);
      console.error('Import error:', error);
    }
  );
  event.target.value = '';
};

const handleExport = () => {
  const workbook = univerAPIInstance.getActiveWorkbook();
  if (!workbook) {
    alert('没有可导出的工作簿');
    return;
  }

  const snapshot = workbook.getSnapshot();
  const fileName = snapshot.name || 'export';

  LuckyExcel.transformUniverToExcel({
    snapshot,
    fileName,
    getBuffer: false,
    success: () => {
      alert('导出成功');
    },
    error: (error) => {
      alert('导出失败: ' + error.message);
      console.error('Export error:', error);
    }
  });
};

function initUniver(exportJson) {
  if (univerInstance) {
    univerInstance.dispose();
    univerAPIInstance.dispose();
  }

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

  univerAPI.createWorkbook({
    name: exportJson.info?.name || 'Imported Sheet',
    sheets: exportJson.sheets
  });

  univerInstance = univer;
  univerAPIInstance = univerAPI;
}

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

.toolbar {
  display: flex;
  gap: 12px;
  padding: 16px 0;
}

.sheet-container {
  margin-top: 16px;
  height: 80vh;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
}

.univer-sheet {
  width: 100%;
  height: 100%;
}
</style>
