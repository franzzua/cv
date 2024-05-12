import type { CV, Education, Experience } from "./cv";
import {rdf, RDFValue} from "./rdf";

@rdf.subject("WorkHistory", "http://rdfs.org/resume-rdf/cv.rdfs")
export class ExperienceRDF implements Experience {
    @rdf.property("startDate", RDFValue.Integer)
    start?: number;
    @rdf.property("endDate", RDFValue.Integer)
    end?: number;
    @rdf.property("employedIn")
    company?: string;
    @rdf.property("jobTitle")
    role?: string;
    @rdf.property("jobDescription")
    description?: string;
    @rdf.property("isPet", RDFValue.Boolean)
    isPet?: boolean;
}
@rdf.subject("Education", "http://rdfs.org/resume-rdf/cv.rdfs")
export class EducationRDF implements Education {
    @rdf.property("eduStartDate", RDFValue.Integer)
    start?: number;
    @rdf.property("eduGradDate", RDFValue.Integer)
    end?: number;
    @rdf.property("studiedIn")
    schoolName?: string;
    @rdf.property("degreeType")
    degree?: string;
    @rdf.property("eduDescription")
    description?: string;
}

@rdf.subject("Skill", "http://rdfs.org/resume-rdf/cv.rdfs")
export class SkillRDF {
    id?: string;
    @rdf.property("skillName")
    name?: string;
    @rdf.property("skillLevel")
    level?: string;
    @rdf.property("skillYearsExperience")
    experienceInYears?: number;
}
@rdf.subject("CV", "http://rdfs.org/resume-rdf/cv.rdfs")
export class CVRDF implements CV {
    @rdf.property("cvDescription")
    summary?: string;
    @rdf.property("cvTitle")
    title?: string;
    @rdf.property("photo")
    photo?: string;
    @rdf.property("name")
    name?: string;
    @rdf.entity("hasWorkHistory", ExperienceRDF, true)
    experience?: ExperienceRDF[];
    @rdf.entity("hasEducation", EducationRDF, true)
    education?: EducationRDF[];
    @rdf.entity("hasSkill", SkillRDF, true)
    skills?: SkillRDF[];
}
