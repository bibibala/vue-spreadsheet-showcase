import { bus } from "@/utils/mitt.js";

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
};
