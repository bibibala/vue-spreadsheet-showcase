<script setup>
import { bus } from "@/utils/mitt.js";
import { onMounted, onUnmounted, ref } from "vue";
import VExcel from "@/jspreadsheet-ce/components/VExcel.vue";
import { useTool } from "@/jspreadsheet-ce/utils/tool.js";

const header = [
  { type: "text", title: "PUBG", name: "PUBG", width: "250" },
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
  <div style="margin-left: 10px">
    <button @click="moveUp">上移</button>
    <button @click="moveDown">下移</button>
    <button @click="removeSelected">删除</button>
    <button @click="insertRow">插入</button>
  </div>
  <VExcel
    ref="sheet"
    :min-dimensions="[4, 4]"
    :columns="header"
    @boxSelection="getBoxSelection"
    @selectionActive="selection"
  />
</template>

<style scoped></style>
