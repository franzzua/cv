import { writable } from "svelte/store";

export const cv = writable<CV | undefined>(undefined);


export type CV = {
    id?: string;
    photo?: string;
    name?: string;
    title?: string;
    summary?: string;
    experience?: Array<Experience>;
    petProjects?: Array<Experience>;
    skillGroups?: Array<SkillGroup>;
    education?: Array<Education>
}

export type SkillGroup = {
    title?: string;
    skills?: Array<{
        title?: string;
        id?: string;
    }>;
}

export type Experience = {
    id?: string;
    company?: string;
    role?: string;
    description?: string;
    start?: number;
    end?: number;
}

export type Education = {
    id?: string;
    schoolName?: string;
    degree?: string;
    description?: string;
    start?: number;
    end?: number;
}