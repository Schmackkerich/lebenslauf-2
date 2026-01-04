<script setup lang="ts">
import { computed } from "vue";

type Theme = "light" | "dark";

const props = defineProps<{ modelValue: Theme }>();
const emit = defineEmits<{ (e: "update:modelValue", v: Theme): void }>();

const label = computed(() =>
  props.modelValue === "dark" ? "Dark Mode: an" : "Dark Mode: aus"
);

function toggle(): void {
  emit("update:modelValue", props.modelValue === "dark" ? "light" : "dark");
}
</script>

<template>
  <button class="btn" type="button" @click="toggle">
    {{ label }}
  </button>
</template>
