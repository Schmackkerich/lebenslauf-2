<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{ skills: string[] }>();

const query = ref("");

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return props.skills;
  return props.skills.filter((s) => s.toLowerCase().includes(q));
});
</script>

<template>
  <div class="row">
    <label>
      <div class="muted" style="margin-bottom:6px;">Skills filtern</div>
      <input
        class="input"
        v-model="query"
        placeholder="z. B. typescript"
      />
    </label>

    <div class="badgeRow">
      <span v-for="s in filtered" :key="s" class="badge">
        {{ s }}
      </span>
    </div>

    <div v-if="filtered.length === 0" class="muted">
      Keine Treffer.
    </div>
  </div>
</template>
