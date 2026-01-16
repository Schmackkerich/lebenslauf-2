<script setup lang="ts">
defineProps<{
  title: string;
  open: boolean;
  hideToggle?: boolean; // wenn true: Button ausblenden
}>();

const emit = defineEmits<(e: "toggle") => void>();
</script>

<template>
  <section class="card">
    <header class="cardHeader">
      <h2 style="margin: 0; font-size: 16px">{{ title }}</h2>

      <button
        v-if="!hideToggle"
        class="btn"
        type="button"
        @click="emit('toggle')"
      >
        {{ open ? "Schließen" : "Öffnen" }}
      </button>
    </header>

    <transition name="fade">
      <div v-if="open" class="cardBody">
        <slot />
      </div>
    </transition>
  </section>
</template>
