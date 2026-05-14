<template>
  <div class="page-container">
    <div class="page-header">
      <span class="page-title">Microsoft Office Online</span>
      <div>
        <a class="page-link" href="https://learn.microsoft.com/zh-cn/officeonlineserver/deploy-office-online-server">
          Documentation
        </a>
        <a class="page-link" href="https://up.ly93.cc/">
          直链生成
        </a>
      </div>
    </div>
    <div class="table-wrapper">
      <iframe
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        :src="'https://view.officeapps.live.com/op/embed.aspx?src=' + url"
        class="office-iframe"
      />
    </div>
  </div>
</template>

<script setup>
const url =
  "https://fs-im-kefu.7moor-fs1.com/ly/4d2c3f00-7d4c-11e5-af15-41bf63ae4ea0/1748070275077/工作簿2 (1).xlsx";
</script>

<style scoped>
.table-wrapper {
  height: 60vh;
}

.office-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

@media (max-width: 768px) {
  .table-wrapper {
    height: 50vh;
  }
}
</style>
