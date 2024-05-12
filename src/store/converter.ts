import type { CV } from "./cv";
import {CVRDF, ExperienceRDF, SkillRDF} from "./cv.rdf";
import { type SolidDataset } from "@inrupt/solid-client";
import { rdf } from "./rdf";

export function serialize(cv: CV): CVRDF {
    return {
        ...cv,
        skills: cv.skillGroups?.flatMap(x => x.skills?.map(s => ({
            id: s.id,
            name: `${x.title}:${s.title}`
        } as SkillRDF)) ?? []) ?? [],
        experience: [
            ...(cv.experience ?? []).map(x => ({...x, isPet: false} as ExperienceRDF)),
            ...(cv.petProjects ?? []).map(x => ({...x, isPet: true} as ExperienceRDF)),
        ]
    }
}
export function parse(cvRDF: CVRDF): CV {
    return {
        ...cvRDF,
        experience: cvRDF.experience?.filter(x => x.isPet == false),
        petProjects: cvRDF.experience?.filter(x => x.isPet == true),
        skillGroups: Array.from(Map.groupBy(cvRDF.skills ?? [], x => x.name?.split(':')[0])).map(([group, skills]) => ({
            title: group,
            skills: skills.map(x => ({
                id: x.id,
                title: x.name?.split(':').pop()
            }))
        })) ?? []
    }
}