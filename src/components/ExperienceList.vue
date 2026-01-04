<script setup lang="ts">
import type { ExperienceItem } from "../types/CvTypes";

defineProps<{ items: ExperienceItem[] }>();
</script>

<template>
  <div class="row">
    <article
      v-for="item in items"
      :key="item.role + item.company"
      class="card"
      style="box-shadow: none"
    >
      <div class="cardBody">
        <div style="display: flex; justify-content: space-between; gap: 10px; flex-wrap: wrap">
          <div>
            <strong>{{ item.role }}</strong>
            <div class="muted">{{ item.company }}</div>
          </div>
          <div class="muted">{{ item.period }}</div>
        </div>

        <ul class="list" style="margin-top: 10px">
          <li v-for="d in item.details" :key="d">{{ d }}</li>
        </ul>
      </div>
    </article>
  </div>
</template>
