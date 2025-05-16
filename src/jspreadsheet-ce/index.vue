<script setup>
import VExcel from "@/jspreadsheet-ce/components/VExcel.vue";
import { onMounted, ref } from "vue";

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
    { PUBG: "999999", LOL: "99992222", CSGO: "2233222" },
  ]);
});
</script>

<template>
  <VExcel ref="sheet" :min-dimensions="[4, 10]" :columns="header"></VExcel>
</template>

<style scoped></style>
