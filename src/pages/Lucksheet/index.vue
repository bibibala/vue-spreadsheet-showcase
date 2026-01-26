<template>
  <div class="lucksheet-container">
    <a class="table-link" href="https://github.com/dream-num/Luckysheet">
      Luckysheet 是一款纯 JavaScript 编写的开源前端在线表格组件，旨在为 Web 应用提供类 Excel 的交互式表格功能。
    </a>
    <div class="toolbar">
      <button class="btn btn-primary" @click="handleImport">导入Excel</button>
      <button class="btn btn-success" @click="handleExport">导出Excel</button>
    </div>
    <div class="sheet-container">
      <div id="luckysheet" class="luck-sheet"></div>
    </div>
    <input ref="fileInput" type="file" accept=".xlsx" style="display: none" @change="handleFileChange">
  </div>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount} from 'vue'
import {exportExcel} from '@/pages/lucksheet/export.js'
import LuckyExcel from '@zwight/luckyexcel'

const fileInput = ref(null)

const loadedResources = {
  links: [],
  scripts: []
}

function loadCSS(href) {
  return new Promise((resolve, reject) => {
    const existingLink = document.querySelector(`link[href="${href}"]`)
    if (existingLink) {
      resolve(existingLink)
      return
    }

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    link.onload = () => resolve(link)
    link.onerror = reject
    document.head.appendChild(link)
    loadedResources.links.push(link)
  })
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${src}"]`)
    if (existingScript) {
      resolve(existingScript)
      return
    }

    const script = document.createElement('script')
    script.src = src
    script.onload = () => resolve(script)
    script.onerror = reject
    document.head.appendChild(script)
    loadedResources.scripts.push(script)
  })
}

async function loadLuckysheetResources() {
  try {
    await Promise.all([
      loadCSS('https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/css/pluginsCss.css'),
      loadCSS('https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/plugins.css'),
      loadCSS('https://cdn.jsdelivr.net/npm/luckysheet/dist/css/luckysheet.css'),
      loadCSS('https://cdn.jsdelivr.net/npm/luckysheet/dist/assets/iconfont/iconfont.css')
    ])

    await loadScript('https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/js/plugin.js')
    await loadScript('https://cdn.jsdelivr.net/npm/luckysheet/dist/luckysheet.umd.js')

    return new Promise((resolve) => {
      const checkLuckysheet = () => {
        if (window.luckysheet) {
          resolve()
        } else {
          setTimeout(checkLuckysheet, 50)
        }
      }
      checkLuckysheet()
    })
  } catch (error) {
    console.error('加载 luckysheet 资源失败:', error)
    alert('加载表格组件失败，请刷新页面重试')
    throw error
  }
}

function cleanupResources() {
  loadedResources.links.forEach(link => {
    if (link.parentNode) {
      link.parentNode.removeChild(link)
    }
  })
  loadedResources.scripts.forEach(script => {
    if (script.parentNode) {
      script.parentNode.removeChild(script)
    }
  })
  loadedResources.links = []
  loadedResources.scripts = []
}

const handleImport = () => {
  fileInput.value.click()
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const name = file.name
  const suffixArr = name.split('.')
  const suffix = suffixArr[suffixArr.length - 1]

  if (suffix !== 'xlsx') {
    alert('目前仅支持导入 xlsx 文件')
    return
  }

  LuckyExcel.transformExcelToLucky(file, function (exportJson, luckysheetfile) {
    if (!exportJson || !exportJson.sheets || exportJson.sheets.length === 0) {
      alert('无法读取Excel文件内容，目前不支持 xls 文件！')
      return
    }

    window.luckysheet.create({
      container: 'luckysheet',
      showinfobar: false,
      data: exportJson.sheets,
      title: exportJson.info.name,
      userInfo: exportJson.info.name.creator,
    })
  })

  event.target.value = ''
}

const handleExport = () => {
  exportExcel(window.luckysheet.getAllSheets(), 'Lucksheet_Export')
}

onMounted(async () => {
  try {
    await loadLuckysheetResources()

    if (window.luckysheet) {
      window.luckysheet.create({
        container: 'luckysheet',
      })
    }
  } catch (error) {
    console.error('初始化 luckysheet 失败:', error)
  }
})

onBeforeUnmount(() => {
  if (window.luckysheet && typeof window.luckysheet.destroy === 'function') {
    window.luckysheet.destroy()
  }
})
</script>

<style scoped>
.lucksheet-container {
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

.toolbar {
  display: flex;
  gap: 12px;
  padding: 16px 0;
}

.sheet-container {
  margin-top: 16px;
  height: 80vh;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
}

.luck-sheet {
  width: 100%;
  height: 100%;
}
</style>
