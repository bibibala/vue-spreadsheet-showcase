import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: { path: "/handsontable" },
    },
    {
      path: "/handsontable",
      component: () => import("@/handsontable"),
      meta: {
        title: "handsontable",
      },
    },
    {
      path: "/ag-grid",
      component: () => import("@/ag-grid"),
      meta: {
        title: "ag-gird",
      },
    },

    {
      path: "/spreadsheet",
      component: () => import("@/jspreadsheet-ce"),
      meta: {
        title: "jspreadsheet-ce",
      },
    },
  ],
});

export default router;
