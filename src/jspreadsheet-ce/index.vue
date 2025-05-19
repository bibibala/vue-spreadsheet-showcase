<script setup>
import { bus } from "@/utils/mitt.js";
import { onMounted, onUnmounted, ref } from "vue";
import VExcel from "@/jspreadsheet-ce/components/VExcel.vue";
import { useTool } from "@/jspreadsheet-ce/utils/tool.js";

const header = [
  { type: "text", title: "PUBG", name: "PUBG", width: "250", readOnly: true },
  { type: "text", title: "LOL", name: "LOL", width: "250" },
  { type: "text", title: "CSGO", name: "CSGO", width: "250" },
  { type: "text", title: "无畏契约", name: "CSGO", width: "250" },
  { type: "text", title: "战地风云5", name: "CSGO", width: "250" },
];

const sheet = ref(null);

onMounted(() => {
  sheet.value.sheet.setData([
    { PUBG: "9999", LOL: "4344", CSGO: "2344" },
    { PUBG: "8888", LOL: "55444", CSGO: "5432" },
    { PUBG: "7777", LOL: "3454", CSGO: "5643" },
  ]);

  bus.on("update-rowIndex", (i) => {
    switch (i) {
      case 0:
        --rowIndex.value;
        break;
      case 1:
        ++rowIndex.value;
        break;
      case 2:
        boxRow.value = null;
        break;
    }
  });
});

onUnmounted(() => {
  bus.off("update-rowIndex");
});

const boxRow = ref(null);
const x = ref(-1);
const rowIndex = ref(-1);

function selection({ instance, x1, y1 }) {
  if (x.value !== -1 && rowIndex.value !== -1) {
    if (x.value !== x1 || rowIndex.value - 1 !== y1) {
      useTool.resetCellStyle(instance.jexcel, x.value, rowIndex.value);
    }
  }
  x.value = x1;
  rowIndex.value = y1 + 1;
  const { getData, insertRow } = instance.jexcel;
  const data = getData();
  if (data.length - 1 === y1) {
    const [a, b, c, d, e] = data[y1];
    if (a !== "" || b !== "" || c !== "" || d !== "" || e !== "") {
      insertRow();
    }
  }
}

function moveUp() {
  useTool.moveUp(rowIndex.value, x.value, sheet.value.sheet);
}

function moveDown() {
  useTool.moveDown(rowIndex.value, x.value, sheet.value.sheet);
}

function insertRow() {
  useTool.insertRow(rowIndex.value, sheet.value.sheet);
}

function removeSelected() {
  useTool.removeSelected(boxRow.value, sheet.value.sheet);
}

function getBoxSelection(da) {
  boxRow.value = da;
}
</script>

<template>
  <div class="spreadsheet-container">
    <div class="button-group">
      <button @click="moveUp" class="action-button">上移</button>
      <button @click="moveDown" class="action-button">下移</button>
      <button @click="removeSelected" class="action-button">删除</button>
      <button @click="insertRow" class="action-button">插入</button>
    </div>
    <div class="excel-container">
      <VExcel
        ref="sheet"
        :min-dimensions="[4, 4]"
        :columns="header"
        @boxSelection="getBoxSelection"
        @selectionActive="selection"
      />
    </div>
  </div>
</template>

<style scoped>
.spreadsheet-container {
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.button-group {
  margin-bottom: 16px;
  display: flex;
  gap: 8px;
}

.action-button {
  padding: 8px 16px;
  font-size: 14px;
  color: #2c3e50;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-button:hover {
  background: #f0f2f5;
  border-color: #d0d0d0;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.action-button:active {
  transform: translateY(0);
  box-shadow: none;
}

.excel-container {
  height: 60vh;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
}

:deep(.jexcel) {
  font-size: 14px;
  height: 100% !important;
}

:deep(.jexcel > thead > tr > td) {
  background-color: #f8f9fa;
  font-weight: 500;
}

:deep(.jexcel > tbody > tr > td) {
  padding: 8px;
}
</style>
