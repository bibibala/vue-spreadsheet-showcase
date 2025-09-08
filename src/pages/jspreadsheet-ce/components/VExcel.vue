<template>
  <div style="padding: 10px 10px">
    <span class="table-link"
      >最新版本v5.0.1写法有很大不同。详情请看
      <a
        class="table-link"
        href="https://bossanova.uk/jspreadsheet/docs/upgrade-from-v4-to-v5"
        >JSpreadsheet-ce</a
      >
    </span>
    <br />
    <div style="width: 100vw; height: 60vh">
      <!-- 必须要有一个固定的高度，这样超出高度的时候，表头才会固定-->
      <div
        id="container"
        style="height: 95%"
        @mouseleave.passive="getSelectedRows"
      ></div>
    </div>
  </div>
</template>

<script setup>
import "jsuites/dist/jsuites.css";
import JExcel from "jspreadsheet-ce";
import JSuites from "jsuites";
import "jspreadsheet-ce/dist/jspreadsheet.css";
import { onMounted, toRefs, ref } from "vue";
import { createContextMenu } from "@/pages/jspreadsheet-ce/utils/tool.js";

let sheet = ref(null);

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  minDimensions: {
    type: Array,
    required: true,
  },
  pagination: {
    type: Number,
    default: 0,
  },
  paginationOptions: {
    type: Array,
    default: () => [5, 10, 15],
  },
  lazyLoad: {
    type: Boolean,
    default: true,
  },
  fullScreen: {
    type: Boolean,
    default: false,
  },
  columnSorting: {
    type: Boolean,
    default: false,
  },
  freezeColumns: {
    type: Number,
    default: 0,
  },
  tableHeight: {
    default: "100%",
  },
  tableWidth: {
    default: "100%",
  },
  // 新增操作权限
  allowClearColumn: {
    type: Boolean,
    default: true,
  },
  allowInsertRowBefore: {
    type: Boolean,
    default: true,
  },
  allowInsertRowAfter: {
    type: Boolean,
    default: true,
  },
  allowClearSelection: {
    type: Boolean,
    default: true,
  },
  allowClearCell: {
    type: Boolean,
    default: true,
  },
  allowDeleteRow: {
    type: Boolean,
    default: true,
  },
});
const emits = defineEmits([
  "page",
  "onload",
  "onchange",
  "updateTable",
  "selectionActive",
  "afterChange",
  "paste",
  "blur",
  "boxSelection",
  "insertBefore",
  "insertAfter",
]);

defineExpose({ sheet });

onMounted(() => {
  loadSheet();
});

JSuites.setDictionary({
  January: "一月",
  February: "二月",
  March: "三月",
  April: "四月",
  June: "六月",
  July: "七月",
  August: "八月",
  September: "九月",
  October: "十月",
  November: "十一月",
  December: "十二月",
  Reset: "重置",
  Done: "完成",
  Update: "更新",
  Sunday: "日",
  Monday: "一",
  Tuesday: "二",
  Wednesday: "三",
  Thursday: "四",
  Friday: "五",
  Saturday: "六",
});

function getSelectedRows() {
  let index = [];
  const selected = sheet.value.getSelectedRows();
  if (selected.length !== 0) {
    selected.forEach((item) => {
      index.push(Number(item.rowIndex) - 1);
    });
    emits("boxSelection", index);
  }
}

function loadSheet() {
  const {
    columns,
    freezeColumns,
    pagination,
    lazyLoad,
    fullScreen,
    minDimensions,
    columnSorting,
    tableWidth,
    tableHeight,
    paginationOptions,
  } = toRefs(props);

  const dom = document.getElementById("container");
  sheet.value = JExcel(dom, {
    columns: columns.value,
    lazyLoading: lazyLoad.value,
    loadingSpin: lazyLoad.value,
    tableOverflow: lazyLoad.value,
    fullscreen: fullScreen.value,
    pagination: pagination.value,
    paginationOptions: !lazyLoad.value ? paginationOptions.value : [],
    minDimensions: minDimensions.value,
    columnSorting: columnSorting.value,
    freezeColumns: freezeColumns.value,
    tableWidth: tableWidth.value,
    tableHeight: tableHeight.value,
    onchangepage: (el, pageNumber, oldPage) => {
      emits("page", { el, pageNumber, oldPage });
    },
    onload: (instance) => {
      emits("onload", instance);
    },
    // 处理粘贴板的数据，去除空格
    onbeforepaste: (instance, copiedText) => {
      let cleanedText = copiedText.trim();
      cleanedText = cleanedText
        .split("\n")
        .map((line) =>
          line
            .split("\t")
            .map((cell) => cell.trim())
            .join("\t"),
        )
        .join("\n");
      return cleanedText;
    },
    onpaste: (instance, value) => {
      // value 粘贴的值
      emits("paste", { instance, value });
    },
    onblur: (instance) => {
      emits("blur", instance);
    },
    // After a column value is changed.
    onchange: (instance, cell, c, r, value) => {
      emits("onchange", { instance, cell, c, r, value });
    },
    onafterchanges: (instance, cell) => {
      emits("afterChange", { instance, cell });
    },
    onselection: (instance, x1, y1, x2, y2) => {
      emits("selectionActive", { instance, x1, y1, x2, y2 });
    },
    updateTable: (instance, cell, col, row, val, label, cellName) => {
      emits("updateTable", {
        instance,
        cell,
        col,
        row,
        val,
        label,
        cellName,
      });
    },
    contextMenu: createContextMenu({ props, emits }),
  });
}
</script>

<style scoped>
::v-deep(.jexcel .highlight-selected) {
  background-color: #42b983;
}

.table-link {
  margin-bottom: 16px;
  color: #2c3e50;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;
}

.table-link:hover {
  color: #42b983;
}
</style>
