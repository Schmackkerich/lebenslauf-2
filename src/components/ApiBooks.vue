<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { OpenLibraryDoc, OpenLibrarySearchResponse } from "../types/OpenLibrary";

const props = defineProps<{
  query: string;
  limit?: number;
}>();

type Book = {
  key: string;
  title: string;
  authors: string;
  year?: number;
};

const items = ref<Book[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

async function load(): Promise<void> {
  loading.value = true;
  error.value = null;

  try {
    const limit = props.limit ?? 6;
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
      props.query
    )}&limit=${limit}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = (await res.json()) as OpenLibrarySearchResponse;

    items.value = data.docs.map((d: OpenLibraryDoc) => ({
      key: d.key,
      title: d.title,
      authors: (d.author_name ?? []).slice(0, 2).join(", ") || "Unbekannt",
      year: d.first_publish_year,
    }));
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Unbekannter Fehler";
  } finally {
    loading.value = false;
  }
}

onMounted(load);
</script>

<template>
  <div class="row">
    <div class="muted">Datenquelle: Open Library</div>

    <div v-if="loading" class="muted">Lade Daten...</div>
    <div v-else-if="error" class="muted">Fehler beim Laden: {{ error }}</div>

    <ul v-else class="list">
      <li v-for="b in items" :key="b.key">
        <strong>{{ b.title }}</strong>
        <span class="muted">
          – {{ b.authors }}<span v-if="b.year">, {{ b.year }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>
