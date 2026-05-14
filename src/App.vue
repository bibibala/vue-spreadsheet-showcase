<template>
  <div class="app">
    <nav class="nav">
      <div class="nav-inner">
        <span class="nav-brand">Spreadsheet Showcase</span>
        <div class="nav-links" :class="{ 'nav-open': menuOpen }">
          <button
            v-for="r in routes"
            :key="r.path"
            @click="goTo(r.path)"
            :class="{ active: currentPath === r.path }"
          >
            {{ r.meta.title }}
          </button>
        </div>
        <button class="nav-toggle" @click="menuOpen = !menuOpen">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { computed, ref } from "vue";

const router = useRouter();
const route = useRoute();
const menuOpen = ref(false);

const routes = computed(() => {
  return router.options.routes.filter((r) => r.path !== "/");
});

const currentPath = computed(() => route.path);

function goTo(path) {
  router.push({ path });
  menuOpen.value = false;
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg-white);
  border-bottom: 1px solid var(--border);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.nav-inner {
  max-width: var(--content-max-width);
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: var(--nav-height);
  padding: 0 20px;
  gap: 24px;
}

.nav-brand {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
}

.nav-links {
  display: flex;
  gap: 4px;
}

.nav-links button {
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  background: transparent;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.nav-links button:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.nav-links button.active {
  background: var(--primary);
  color: white;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.nav-toggle span {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all 0.2s ease;
}

.main {
  flex: 1;
  padding: 24px 20px;
  max-width: var(--content-max-width);
  width: 100%;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .nav-inner {
    padding: 0 12px;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: var(--nav-height);
    left: 0;
    right: 0;
    flex-direction: column;
    background: var(--bg-white);
    border-bottom: 1px solid var(--border);
    padding: 8px;
    gap: 2px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
  }

  .nav-links.nav-open {
    display: flex;
  }

  .nav-links button {
    padding: 10px 14px;
    font-size: 14px;
    width: 100%;
    text-align: left;
    border-radius: 4px;
  }

  .nav-toggle {
    display: flex;
    margin-left: auto;
  }

  .main {
    padding: 0;
  }
}
</style>
