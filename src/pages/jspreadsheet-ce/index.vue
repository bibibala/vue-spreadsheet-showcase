<script setup>
import { bus } from "@/utils/mitt.js";
import { onMounted, onUnmounted, ref } from "vue";
import VExcel from "@/pages/jspreadsheet-ce/components/VExcel.vue";
import { useTool } from "@/pages/jspreadsheet-ce/utils/tool.js";

const header = ref([
  { type: "hidden", title: "PUBG", name: "PUBGS", width: 150 },
  { type: "text", title: "PUBG", name: "PUBG", readOnly: true, width: 150 },
  { type: "text", title: "LOL", name: "LOL", width: 150 },
  { type: "text", title: "CSGO", name: "CSGO", width: 150 },
  {
    title: "日期",
    type: "calendar",
    options: {
      format: "YYYY-MM-DD hh:mm:ss",
      time: true,
    },
    name: "time",
    width: 200,
  },
]);

const sheet = ref(null);

onMounted(() => {
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

function updateTable(obj) {
  const readOnlyColumns = [1];
  if (readOnlyColumns.includes(obj.col)) {
    obj.cell.style.backgroundColor = "#dcdcdc";
  }
}

function setData() {
  sheet.value.sheet.setData([
    { PUBG: "9999", LOL: "4344", CSGO: "2344", time: "2024-03-1 08:22:22" },
  ]);
}

function hideNameColumn() {
  header.value[0].type = "text";
  header.value[1].type = "hidden";
  const { refresh } = sheet.value.sheet;
  refresh();
}

function showNameColumn() {
  header.value[0].type = "hidden";
  header.value[1].type = "text";
  const { refresh } = sheet.value.sheet;
  refresh();
}

function setBgColor() {
  sheet.value.sheet.setReadOnly([2, 1], true);
  sheet.value.sheet.setStyle("C2", "background-color", "#F56565", true);
}
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <span class="page-title">JSpreadsheet CE</span>
      <a
        class="page-link"
        href="https://bossanova.uk/jspreadsheet/docs/upgrade-from-v4-to-v5"
      >
        Documentation — 注意 v5 写法有较大不同
      </a>
    </div>
    <div class="btn-group">
      <button class="btn" @click="moveUp">上移</button>
      <button class="btn" @click="moveDown">下移</button>
      <button class="btn" @click="removeSelected">删除</button>
      <button class="btn" @click="insertRow">插入</button>
      <button class="btn" @click="setData">填充数据</button>
      <button class="btn" @click="hideNameColumn">动态设置（可写）</button>
      <button class="btn" @click="showNameColumn">动态设置（只读）</button>
      <button class="btn" @click="setBgColor">修改 B2 背景色</button>
    </div>
    <div class="table-wrapper">
      <VExcel
        ref="sheet"
        :min-dimensions="[4, 4]"
        :columns="header"
        @boxSelection="getBoxSelection"
        @selectionActive="selection"
        @updateTable="updateTable"
      />
    </div>
  </div>
</template>
