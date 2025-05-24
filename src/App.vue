<template>
  <div>
    <div class="btn-group">
      <button
        v-for="route in routes"
        :key="route.path"
        @click="goTo(route.path)"
        :class="{ active: currentPath === route.path }"
      >
        {{ route.meta.title }}
      </button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { computed } from "vue";

const router = useRouter();
const route = useRoute();

const routes = computed(() => {
  return router.options.routes.filter((r) => r.path !== "/");
});

const currentPath = computed(() => route.path);

function goTo(path) {
  router.push({ path });
}
</script>

<style scoped>
.btn-group {
  margin: 20px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

button {
  margin-right: 12px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #2c3e50;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:hover {
  background: #f0f2f5;
  border-color: #d0d0d0;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button:active {
  transform: translateY(0);
  box-shadow: none;
}

button:last-child {
  margin-right: 0;
}

button.active {
  background: #42b983;
  color: white;
  border-color: #42b983;
}

button.active:hover {
  background: #3aa876;
  border-color: #3aa876;
}
</style>
