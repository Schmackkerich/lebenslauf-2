<script setup lang="ts">
import { computed, reactive, ref, watchEffect } from "vue";

import ProfileHeader from "./components/ProfileHeader.vue";
import ThemeToggle from "./components/ThemeToggle.vue";
import SectionCard from "./components/SectionCard.vue";
import ExperienceList from "./components/ExperienceList.vue";
import SkillList from "./components/SkillList.vue";
import ApiBooks from "./components/ApiBooks.vue";

import type { EducationItem, ExperienceItem, PersonalInfo } from "./types/CvTypes";

type SectionKey = "personal" | "education" | "experience" | "skills" | "api";

const theme = ref<"light" | "dark">("light");

watchEffect(() => {
  const root = document.documentElement;
  if (theme.value === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
});

const info: PersonalInfo = reactive({
  fullName: "Max Mustermann",
  title: "Frontend Developer (Vue, TypeScript)",
  email: "max.mustermann@example.com",
  location: "Musterstadt, Deutschland",
  website: "https://example.com",
  summary:
    "Interesse an modernen Webtechnologien, komponentenbasierter UI-Entwicklung und sauberer Code-Struktur. Fokus auf verständliche Frontend-Architektur und zuverlässige Umsetzung.",
});

const education: EducationItem[] = [
  {
    degree: "B.Sc. Informatik",
    school: "Universität Musterstadt",
    period: "2015 – 2018",
    focus: "Webentwicklung, Software Engineering",
  },
  { degree: "Abitur", school: "Muster-Gymnasium", period: "2012 – 2015" },
];

const experience: ExperienceItem[] = [
  {
    role: "Webentwickler",
    company: "TechSolutions GmbH",
    period: "2019 – heute",
    details: [
      "Umsetzung responsiver Oberflächen mit Vue und TypeScript",
      "Komponentenbibliothek für wiederverwendbare UI-Elemente",
      "API-Anbindungen und Zustandsverwaltung in Komponenten",
    ],
  },
  {
    role: "Werkstudent IT",
    company: "SoftCom AG",
    period: "2017 – 2019",
    details: [
      "Unterstützung im Support und bei internen Webtools",
      "Dokumentation und Qualitätssicherung",
    ],
  },
];

const skills = [
  "Vue 3",
  "TypeScript",
  "HTML5",
  "CSS3",
  "Fetch API",
  "Git",
  "REST",
  "UI-Komponenten",
  "Responsive Design",
  "Grundlagen SQL",
];

const openSection = ref<SectionKey>("personal");

function toggle(key: SectionKey) {
  openSection.value = openSection.value === key ? "personal" : key;
}

const educationOpen = computed(() => openSection.value === "education");
const experienceOpen = computed(() => openSection.value === "experience");
const skillsOpen = computed(() => openSection.value === "skills");
const apiOpen = computed(() => openSection.value === "api");
</script>

<template>
  <div class="container">
    <div class="topbar">
      <div class="muted">Lebenslauf 2 (Vue 3, TypeScript, API)</div>
      <ThemeToggle v-model="theme" />
    </div>

    <div class="grid">
      <ProfileHeader :info="info" />

      <SectionCard title="Persönliche Daten" :open="true" @toggle="toggle('personal')">
        <div class="kv">
          <strong>Name</strong><span>{{ info.fullName }}</span>
          <strong>Titel</strong><span>{{ info.title }}</span>
          <strong>E-Mail</strong><span>{{ info.email }}</span>
          <strong>Ort</strong><span>{{ info.location }}</span>
        </div>
      </SectionCard>

      <SectionCard title="Ausbildung" :open="educationOpen" @toggle="toggle('education')">
        <div class="row">
          <div v-for="e in education" :key="e.degree + e.school" class="card" style="box-shadow:none;">
            <div class="cardBody">
              <strong>{{ e.degree }}</strong>
              <div class="muted">{{ e.school }} · {{ e.period }}</div>
              <div v-if="e.focus" style="margin-top:6px;">{{ e.focus }}</div>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Berufserfahrung" :open="experienceOpen" @toggle="toggle('experience')">
        <ExperienceList :items="experience" />
      </SectionCard>

      <SectionCard title="Kenntnisse" :open="skillsOpen" @toggle="toggle('skills')">
        <SkillList :skills="skills" />
      </SectionCard>

      <SectionCard title="API: Lieblingsbücher" :open="apiOpen" @toggle="toggle('api')">
        <ApiBooks query="web development" :limit="6" />
      </SectionCard>

      <div class="footer">
        Nach dem Entpacken sollten npm install und npm run build fehlerfrei laufen.
      </div>
    </div>
  </div>
</template>
