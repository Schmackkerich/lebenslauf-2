export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  location: string;
  website?: string;
  summary: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  details: string[];
}

export interface EducationItem {
  degree: string;
  school: string;
  period: string;
  focus?: string;
}
