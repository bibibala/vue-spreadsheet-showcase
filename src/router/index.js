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
      component: () => import("@/pages/handsontable"),
      meta: {
        title: "handsontable",
      },
    },
    {
      path: "/ag-grid",
      component: () => import("@/pages/ag-grid"),
      meta: {
        title: "ag-gird",
      },
    },

    {
      path: "/spreadsheet",
      component: () => import("@/pages/jspreadsheet-ce"),
      meta: {
        title: "jspreadsheet-ce",
      },
    },
    {
      path: "/univerjs",
      component: () => import("@/pages/univerjs"),
      meta: {
        title: "univerjs",
      },
    },
    {
      path: "/microsoft",
      component: () => import("@/pages/microsoft"),
      meta: {
        title: "microsoft",
      },
    },
  ],
});

export default router;
