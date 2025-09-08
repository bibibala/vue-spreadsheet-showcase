import { bus } from "@/utils/mitt.js";
import JExcel from "jspreadsheet-ce";

let color = "#42b983";

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
export const useTool = {
  /**
   *
   * @param obj{obj}
   * @param x1{number}
   * @param y1{number}
   */
  resetCellStyle(obj, x1, y1) {
    const { setStyle, getStyle, getData } = obj;
    if (y1 <= getData().length) {
      const str = getStyle([x1, y1 === 0 ? 0 : y1 - 1]);
      if (str.indexOf("background-color: rgb(220, 220, 220)") === -1) {
        setStyle(column[x1] + y1, "background-color", "#FFFFFF", true);
      }
    }
  },
  /**
   *
   * @param rowIndex{number}
   * @param obj{Object}
   */
  insertRow(rowIndex, obj) {
    if (rowIndex) {
      if (rowIndex !== 1) {
        obj.insertRow(1, parseInt(rowIndex - 1), 1);
      } else {
        alert(`禁止在第一行进行插入操作`);
      }
    } else {
      alert(`请使用鼠标点击选择某一行,进行插入操作`);
    }
  },
  /**
   *
   * @param x1{number} x1
   * @param rowIndex{number} y1
   * @param obj{Object}
   */
  moveUp(rowIndex, x1, obj) {
    const { setStyle, moveRow } = obj;
    if (rowIndex) {
      if (rowIndex - 2 !== 0) {
        if (rowIndex > 1) {
          moveRow(rowIndex - 1, rowIndex - 2);
          setStyle(
            column[x1] + Number(rowIndex - 1),
            "background-color",
            `${color}`,
            true,
          );
          bus.emit("update-rowIndex", 0);
        } else {
          alert(`已经是第一行，无法上移`);
        }
      } else {
        alert(`禁止与第一行数据进行上移操作`);
      }
    } else {
      alert(`请使用鼠标点击选择某一行,进行上移操作`);
    }
  },
  /**
   *
   * @param x1{number} x1
   * @param rowIndex{number} y1
   * @param obj{Object}
   */
  moveDown(rowIndex, x1, obj) {
    const { moveRow, getData, setStyle } = obj;
    if (rowIndex) {
      if (rowIndex !== 1) {
        const data = getData();
        if (rowIndex < data.length) {
          moveRow(rowIndex - 1, rowIndex);
          setStyle(
            column[x1] + Number(rowIndex + 1),
            "background-color",
            `${color}`,
            true,
          );
          bus.emit("update-rowIndex", 1);
        } else {
          alert(`已经是最后一行，无法下移`);
        }
      } else {
        alert(`禁止在第一行进行下移操作`);
      }
    } else {
      alert(`请使用鼠标点击选择某一行,进行下移操作`);
    }
  },
  /**
   *
   * @param selectedRow{Array}框选的行
   * @param obj{Object}
   */
  removeSelected(selectedRow, obj) {
    // obj.refresh()
    if (selectedRow) {
      const data = obj.getData();
      if (selectedRow.length === data.length) {
        obj.insertRow(1, 0);
        obj.deleteRow(0, selectedRow.length);
      } else {
        obj.deleteRow(selectedRow[0], selectedRow.length);
      }
      bus.emit("update-rowIndex", 2);
    } else {
      alert(`请使用鼠标框选,进行删除操作`);
    }
  },
  /**
   * @description 在最后插入一行
   * @param length{number}
   * @param instance{object}
   */
  insetRowLast(instance, length) {
    instance.insertRow(1, length);
  },
  /**
   *
   * 重写 JExcel 方法
   * @param instance{object}
   * @param rowNumber{number}
   * @param data{array}
   */
  setRowData(instance, rowNumber, data) {
    const { setValue, headers } = instance;
    for (let i = 0; i < headers.length; i++) {
      let columnName = JExcel.getColumnNameFromId([i, rowNumber]);
      if (data[i] != null) {
        setValue(columnName, data[i], true);
      }
    }
  },
};

/**
 * 创建 JExcel 的 contextMenu
 * @param {Object} options
 * @param {Object} options.props - 组件传入的 props
 * @param {Function} options.emits - 组件 emits 函数
 * @returns {Function} contextMenu 回调
 */
export function createContextMenu({ props, emits }) {
  return (obj, x, y) => {
    let items = [];

    if (!y) {
      // 清空整列
      if (props.allowClearColumn) {
        items.push({
          title: "清空整列",
          onclick: () => {
            let length = obj.getColumnData(x).length;
            for (let i = 0; i <= length; i++) {
              obj.setValue(column[x] + i, "");
            }
          },
        });
      }
    } else {
      if (obj.options.allowInsertRow === true) {
        // 之前插入行
        if (props.allowInsertRowBefore) {
          items.push({
            title: "之前插入行",
            onclick: () => {
              if (y !== "0") {
                obj.insertRow(1, parseInt(y), 1);
                emits("insertBefore", { obj, y });
              } else {
                alert("禁止在第一行进行插入操作");
              }
            },
          });
        }
        // 之后插入行
        if (props.allowInsertRowAfter) {
          items.push({
            title: "之后插入行",
            onclick: () => {
              obj.insertRow(1, parseInt(y));
              emits("insertAfter", { obj, y });
            },
          });
        }
      }

      if (obj.options.allowDeleteRow) {
        let index = [];
        obj.getSelectedRows().forEach((item) => {
          index.push(item.rowIndex);
        });

        if (x) {
          if (index.length > 1 || obj.getHighlighted().length > 1) {
            if (props.allowInsertRowAfter) items.push({ type: "line" });
            if (props.allowClearColumn) {
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
            }
          } else if (props.allowClearCell) {
            items.push({
              title: "清空单元格",
              onclick: () => {
                let readOnly = obj.isReadOnly(column[x] + Number(y));
                if (readOnly === true) {
                  alert("该单元格为只读，不可编辑");
                } else {
                  obj.setValue(column[x] + (Number(y) + 1), "");
                }
              },
            });
          }
        } else if (props.allowDeleteRow) {
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
  };
}
