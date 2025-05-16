下面是一个简洁明了的 `README.md` 示例，适合描述你这个项目的用途和结构：

---

## 🧪 表格组件对比示例项目

本项目演示了三种主流 JavaScript 表格组件的基本使用：

- ✅ [**Handsontable**](https://handsontable.com/)
- ✅ [**JSpreadsheet**](https://jspreadsheet.com/)
- ✅ [**Ag-Grid**](https://www.ag-grid.com/)

### 📌 项目结构

- `/handsontable` - 使用 Handsontable 渲染交互表格
- `/spreadsheet` - 使用 JSpreadsheet 渲染电子表格样式界面
- `/ag-grid` - 使用 Ag-Grid 展示强大表格功能

### 🚀 快速开始

```bash
# 安装依赖
pnpm install

# 运行项目
pnpm run dev
```

### 📺 访问页面

页面按钮位于首页：

```html
<button @click="goTo('/handsontable')">Handsontable</button>
<button @click="goTo('/spreadsheet')">JSpreadsheet</button>
<button @click="goTo('/ag-grid')">Ag-Grid</button>
```

点击对应按钮可查看每个表格组件的基础使用效果。

---

### 🤔 适用场景建议

| 组件         | 特点                           | 适用场景               |
| ------------ | ------------------------------ | ---------------------- |
| Handsontable | Excel 风格、功能强、商用需付费 | 高级交互编辑表格       |
| JSpreadsheet | 轻量、简单、免费版功能有限     | 简单数据录入、快速原型 |
| Ag-Grid      | 功能全面、灵活、性能优秀       | 大规模数据展示、企业级 |

---

如需添加新组件或深入功能对比，可扩展各子页面逻辑。

是否需要我继续帮你写这三个子页面的 Markdown 使用说明？
