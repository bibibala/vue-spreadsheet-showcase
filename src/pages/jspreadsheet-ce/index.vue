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

/**
 *
 *
 * @description 表格的更新操作
 *
 */

function updateTable(obj) {
  const readOnlyColumns = [1];
  if (readOnlyColumns.includes(obj.col)) {
    obj.cell.style.backgroundColor = "#dcdcdc";
  }
}

/**
 *
 * @description 填充数据
 *
 */
function setData() {
  sheet.value.sheet.setData([
    { PUBG: "9999", LOL: "4344", CSGO: "2344", time: "2024-03-1 08:22:22" },
  ]);
}

/**
 *
 * @description 动态设置列的读写状态
 *
 */
function hideNameColumn() {
  header.value[0].type = "text";
  header.value[1].type = "hidden";
  // 通过设置两列同样的title的方式，实现编辑和只读的切换
  // 即使通过敲击回车的方式新增一行，列的状态仍是当前设置的状态
  // 列的name属性需要和另一列保持不同，否则会无法拿到输入的值会一直为空
  /**
   *
   *
   * [
   *   {
   *     "PUBG": "",
   *     "LOL": "",
   *     "CSGO": ""
   *   }
   * ]
   *
   * 正确的
   *
   * [
   *   {
   *     "PUBGS": "",
   *     "PUBG": "",
   *     "LOL": "",
   *     "CSGO": ""
   *   }
   * ]
   *
   */
  const { refresh, getJson } = sheet.value.sheet;
  refresh();
  console.log(getJson());
}

function showNameColumn() {
  header.value[0].type = "hidden";
  header.value[1].type = "text";
  const { refresh, getJson } = sheet.value.sheet;
  refresh();
  console.log(getJson());
}

/**
 *
 * setStyle
 * @description 修改B2单元格的背景色
 * @description C2 意思是 第三列。第二行，因为上面已经隐藏了一列，所以也是包含的
 * @description background-color  也可以是字体颜色，详情看源代码
 *
 * setReadOnly
 * @description 坐标是从 0 开始
 * @description true 代表设置为只读  false 代表取消只读的状态
 */

function setBgColor() {
  sheet.value.sheet.setReadOnly([2, 1], true);
  sheet.value.sheet.setStyle("C2", "background-color", "#F56565", true);
}
</script>

<template>
  <div class="spreadsheet-container">
    <div class="button-group">
      <button @click="moveUp" class="action-button">上移</button>
      <button @click="moveDown" class="action-button">下移</button>
      <button @click="removeSelected" class="action-button">删除</button>
      <button @click="insertRow" class="action-button">插入</button>
      <button @click="setData" class="action-button">填充数据</button>
      <button @click="hideNameColumn" class="action-button">
        动态设置（可写）
      </button>
      <button @click="showNameColumn" class="action-button">
        动态设置（只读）
      </button>

      <button @click="setBgColor" class="action-button">修改B2背景色</button>
    </div>
    <div class="excel-container">
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
  max-height: 60vh;
  border-radius: 6px;
  overflow: auto;
  border: 1px solid #e0e0e0;
  position: relative;
}
</style>
