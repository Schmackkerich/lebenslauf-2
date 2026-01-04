<script setup lang="ts">
import type { PersonalInfo } from "../types/CvTypes";

defineProps<{ info: PersonalInfo }>();
</script>

<template>
  <section class="card">
    <div class="cardBody">
      <h1 class="h1">{{ info.fullName }}</h1>
      <p class="subtitle">{{ info.title }}</p>

      <div style="height: 10px"></div>

      <div class="kv">
        <strong>E-Mail</strong>
        <span><a :href="`mailto:${info.email}`">{{ info.email }}</a></span>

        <strong>Ort</strong>
        <span>{{ info.location }}</span>

        <strong v-if="info.website">Website</strong>
        <span v-if="info.website">
          <a :href="info.website" target="_blank" rel="noreferrer">
            {{ info.website }}
          </a>
        </span>
      </div>

      <div style="height: 12px"></div>
      <div class="muted">{{ info.summary }}</div>
    </div>
  </section>
</template>
