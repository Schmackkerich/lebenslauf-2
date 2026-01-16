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
  title: "Frontend Developer",
  email: "max.mustermann@example.com",
  location: "Musterstraße 1, 12345 Musterstadt",
  website: "https://example.com",
  summary:
    "Primär Frontend-Entwickler, jedoch auch Erfahrung in der Fullstack Entwicklung",
});

const education: EducationItem[] = [
  {
    degree: "Bachelor of Engineering: Medieninformatik",
    school: "Hochschule Esslingen",
    period: "2015 – 2019",
    focus: "Webentwicklung, Software Engineering",
  },
  { degree: "Abitur", school: "Muster-Gymnasium", period: "2008 – 2015" },
];

const experience: ExperienceItem[] = [
  {
    role: "Webentwickler",
    company: "TestSolutions GmbH",
    period: "2019 – heute",
    details: [
      "Entwicklung von Web-Apps",
      "Kaffee machen",
    ],
  },
  {
    role: "Werkstudent IT",
    company: "TestCom AG",
    period: "2017 – 2019",
    details: [
      "Excel",
      "Kaffee machen",
    ],
  },
];

const skills: string[] = [
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

function toggle(key: SectionKey): void {
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
      <div class="muted">Lebenslauf</div>
      <ThemeToggle v-model="theme" />
    </div>

    <div class="grid">
      <ProfileHeader :info="info" />

      <SectionCard title="Persönliche Daten" :open="true" :hideToggle="true">
        <div class="kv">
          <strong>Name</strong><span>{{ info.fullName }}</span>
          <strong>Titel</strong><span>{{ info.title }}</span>
          <strong>E-Mail</strong><span>{{ info.email }}</span>
          <strong>Ort</strong><span>{{ info.location }}</span>
        </div>
      </SectionCard>

      <SectionCard title="Ausbildung" :open="educationOpen" @toggle="toggle('education')">
        <div class="row">
          <div v-for="e in education" :key="e.degree + e.school" class="card" style="box-shadow: none">
            <div class="cardBody">
              <strong>{{ e.degree }}</strong>
              <div class="muted">{{ e.school }} · {{ e.period }}</div>
              <div v-if="e.focus" style="margin-top: 6px">{{ e.focus }}</div>
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

      <SectionCard title="Gelesene Bücher" :open="apiOpen" @toggle="toggle('api')">
        <ApiBooks query="web development" :limit="6" />
      </SectionCard>

      <div class="footer">

      </div>
    </div>
  </div>
</template>
