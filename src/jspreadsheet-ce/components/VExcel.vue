<template>
  <div style="padding: 10px 10px">
    <span
      >最新版本v5.0.1写法有很大不同。详情请看
      <a href="https://bossanova.uk/jspreadsheet/docs/upgrade-from-v4-to-v5"
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
import "jspreadsheet-ce/dist/jspreadsheet.css";
import { onMounted, toRefs, ref } from "vue";

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
  search: {
    type: Boolean,
    default: false,
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
  columnDrag: {
    type: Boolean,
    default: false,
  },
  rowResize: {
    type: Boolean,
    default: true,
  },
  csvHeaders: {
    type: Boolean,
    default: true,
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
    search,
    columns,
    columnDrag,
    freezeColumns,
    pagination,
    lazyLoad,
    csvHeaders,
    fullScreen,
    minDimensions,
    rowResize,
    columnSorting,
    tableWidth,
    tableHeight,
    paginationOptions,
  } = toRefs(props);

  const dom = document.getElementById("container");
  sheet.value = JExcel(dom, {
    columns: columns.value,
    search: search.value,
    rowResize: rowResize.value,
    lazyLoading: lazyLoad.value,
    loadingSpin: lazyLoad.value,
    csvHeaders: csvHeaders.value,
    tableOverflow: lazyLoad.value,
    fullscreen: fullScreen.value,
    columnDrag: columnDrag.value,
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

    contextMenu: (obj, x, y) => {
      let items = [];
      const column = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ];
      if (!y) {
        items.push({
          title: "清空整列",
          onclick: () => {
            let length = obj.getColumnData(x).length;
            for (let i = 0; i <= length; i++) {
              obj.setValue(column[x] + i, "");
            }
          },
        });
      } else {
        if (obj.options.allowInsertRow === true) {
          items.push({
            title: "之前插入行",
            onclick: () => {
              if (y !== "0") {
                obj.insertRow(1, parseInt(y), 1);
                emits("insertBefore", { obj, y });
              } else {
                // useToast("info", `禁止在第一行进行插入操作`);
              }
            },
          });
          items.push({
            title: "之后插入行",
            onclick: () => {
              obj.insertRow(1, parseInt(y));
              emits("insertAfter", { obj, y });
            },
          });
        }
        if (obj.options.allowDeleteRow) {
          let index = [];
          obj.getSelectedRows().forEach((item) => {
            index.push(item.rowIndex);
          });
          if (x) {
            if (index.length > 1 || obj.getHighlighted().length > 1) {
              items.push({ type: "line" });
              items.push({
                title: "清空框选",
                onclick: () => {
                  obj.getHighlighted().forEach((item) => {
                    obj.setValue(
                      column[item.dataset.x] + (Number(item.dataset.y) + 1),
                      "",
                    );
                  });
                },
              });
            } else {
              items.push({
                title: "清空单元格",
                onclick: () => {
                  // 如果为只读的不做任何操作
                  let readOnly = obj.isReadOnly(column[x] + Number(y));
                  if (readOnly === true) {
                    // useToast("info", "该单元格为只读，不可编辑");
                  } else {
                    obj.setValue(column[x] + (Number(y) + 1), "");
                  }
                },
              });
            }
          } else {
            items.push({
              title: index.length > 1 ? "多项删除" : "删除整行",
              onclick: () => {
                obj.deleteRow();
                let row = obj.getData();
                if (row.length === 1) {
                  column.forEach((item) => {
                    obj.setValue(item + "0", "", true);
                  });
                }
              },
            });
          }
        }
      }
      return items;
    },
  });
}
</script>

<style scoped>
::v-deep(.jexcel .highlight-selected) {
  background-color: yellow;
}
</style>
