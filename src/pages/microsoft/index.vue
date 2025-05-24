<script setup>
// https://view.officeapps.live.com/op/view.aspx?src= 有工具栏
// https://view.officeapps.live.com/op/embed.aspx?src= 没有工具栏
// excel 的url，https可以直接访问的链接
const url =
  "https://fs-im-kefu.7moor-fs1.com/ly/4d2c3f00-7d4c-11e5-af15-41bf63ae4ea0/1748070275077/工作簿2 (1).xlsx";
</script>

<template>
  <div class="microsoft-container">
    <a
      class="table-link"
      href="https://learn.microsoft.com/zh-cn/officeonlineserver/deploy-office-online-server"
    >
      Microsoft Office Online Server Documentation；
    </a>
    <a href="https://up.ly93.cc/" class="table-link"
      >https://up.ly93.cc/（直链生成）</a
    >
    <div class="iframe-container">
      <iframe
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        :src="'https://view.officeapps.live.com/op/embed.aspx?src=' + url"
        class="office-iframe"
      >
      </iframe>
    </div>
  </div>
</template>

<style scoped>
.microsoft-container {
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.table-link {
  display: inline-block;
  margin-bottom: 16px;
  color: #2c3e50;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;
}

.table-link:hover {
  color: #42b983;
}

.iframe-container {
  height: 60vh;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
}

.office-iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
