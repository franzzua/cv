/** Used at the top-level node to indicate the context for the JSON-LD objects used. The context provided in this type is compatible with the keys and URLs in the rest of this generated file. */
export type WithContext<T extends Thing> = T & {
    "@context": "http://rdfs.org/resume-rdf/cv.rdfs";
};
export interface Graph {
    "@context": "http://rdfs.org/resume-rdf/cv.rdfs";
    "@graph": readonly Thing[];
}
type SchemaValue<T> = T | readonly T[];
type IdReference = {
    /** IRI identifying the canonical address of this object. */
    "@id": string;
};

interface AltLeaf extends ResourceBase {
    "@type": "http://www.w3.org/1999/02/22-rdf-syntax-ns#Alt";
}
/** The class of containers of alternatives. */
export type Alt = AltLeaf;

interface BagLeaf extends ResourceBase {
    "@type": "http://www.w3.org/1999/02/22-rdf-syntax-ns#Bag";
}
/** The class of unordered containers. */
export type Bag = BagLeaf;

interface ClassBase extends ResourceBase {
    /** The subject is a subclass of a class. */
    "http://www.w3.org/2000/01/rdf-schema#subClassOf"?: SchemaValue<Class | IdReference>;
}
interface ClassLeaf extends ClassBase {
    "@type": "http://www.w3.org/2000/01/rdf-schema#Class";
}
/** The class of classes. */
export type Class = ClassLeaf;

interface CompanyBase extends OrganizationBase {
    /** Industry of the company */
    "Industry"?: SchemaValue<Literal | IdReference>;
}
interface CompanyLeaf extends CompanyBase {
    "@type": "Company";
}
/** A class for company information. */
export type Company = CompanyLeaf;

interface CompoundLiteralBase extends ResourceBase {
    /** The base direction component of a CompoundLiteral. */
    "http://www.w3.org/1999/02/22-rdf-syntax-ns#direction"?: SchemaValue<never>;
    /** The language component of a CompoundLiteral. */
    "http://www.w3.org/1999/02/22-rdf-syntax-ns#language"?: SchemaValue<never>;
}
interface CompoundLiteralLeaf extends CompoundLiteralBase {
    "@type": "http://www.w3.org/1999/02/22-rdf-syntax-ns#CompoundLiteral";
}
/** A class representing a compound literal. */
export type CompoundLiteral = CompoundLiteralLeaf;

interface ContainerLeaf extends ResourceBase {
    "@type": "http://www.w3.org/2000/01/rdf-schema#Container";
}
/** The class of RDF containers. */
export type Container = ContainerLeaf | Alt | Bag | Seq;

interface ContainerMembershipPropertyLeaf extends PropertyBase {
    "@type": "http://www.w3.org/2000/01/rdf-schema#ContainerMembershipProperty";
}
/** The class of container membership properties, rdf:_1, rdf:_2, ..., all of which are sub-properties of 'member'. */
export type ContainerMembershipProperty = ContainerMembershipPropertyLeaf;

interface CourseBase extends ResourceBase {
    /** Description of the course / certification. */
    "courseDescription"?: SchemaValue<Literal | IdReference>;
    /** Date when course was finished / certification acquired. */
    "courseFinishDate"?: SchemaValue<Literal | IdReference>;
    /** Start date of the course taken. */
    "courseStartDate"?: SchemaValue<Literal | IdReference>;
    /** Title of the course taken or certification acquired. */
    "courseTitle"?: SchemaValue<Literal | IdReference>;
    /** Web page of the courses taken / certification acquired. May be pointer to certification transcript. */
    "courseURL"?: SchemaValue<Literal | IdReference>;
    /** Does this course entry include certification? */
    "isCertification"?: SchemaValue<never>;
    /** Organization that organized courses and/or provided certification. */
    "organizedBy"?: SchemaValue<Organization | IdReference>;
}
interface CourseLeaf extends CourseBase {
    "@type": "Course";
}
/** CV entry for courses taken */
export type Course = CourseLeaf;

interface CVBase extends Partial<IdReference> {
    "aboutPerson"?: SchemaValue<Person | IdReference>;
    /** Copyright notice - who owns rights to CV, how may it be used, other legal info. */
    "cvCopyright"?: SchemaValue<Literal | IdReference>;
    /** Text describing what the person wants to accomplish by this CV; what is s/he looking for; ... */
    "cvDescription"?: SchemaValue<Literal | IdReference>;
    /** If the CV is active and the person is actively looking for job opportunities. */
    "cvIsActive"?: SchemaValue<Literal | IdReference>;
    /** If the CV is confidential and may be used by receiving party only. */
    "cvIsConfidential"?: SchemaValue<Literal | IdReference>;
    /** CV title. */
    "cvTitle"?: SchemaValue<Literal | IdReference>;
    "hasCourse"?: SchemaValue<Course | IdReference>;
    "hasEducation"?: SchemaValue<Education | IdReference>;
    "hasOtherInfo"?: SchemaValue<OtherInfo | IdReference>;
    "hasReference"?: SchemaValue<Refernece | IdReference>;
    "hasSkill"?: SchemaValue<Skill | IdReference>;
    "hasTarget"?: SchemaValue<Target | IdReference>;
    "hasWorkHistory"?: SchemaValue<WorkHistory | IdReference>;
    /** Date when the information in CV was last updated. */
    "lastUpdate"?: SchemaValue<Literal | IdReference>;
}
interface CVLeaf extends CVBase {
    "@type": "CV";
}
/** CV subclass of WordNet Curriculum Vitae */
export type CV = CVLeaf;

interface CV_EntryLeaf extends ResourceBase {
    "@type": "CV_Entry";
}
/** Single entry of CV information. Type of CV information specified in subclasses */
export type CV_Entry = CV_EntryLeaf | Course | Education | OtherInfo | Refernece | Skill | Target | WorkHistory;

interface DatatypeBase extends Partial<IdReference> {
}
interface DatatypeLeaf extends DatatypeBase {
    "@type": "http://www.w3.org/2000/01/rdf-schema#Datatype";
}
/** The class of RDF datatypes. */
export type Datatype = "http://www.w3.org/1999/02/22-rdf-syntax-ns#HTML" | "https://www.w3.org/1999/02/22-rdf-syntax-ns#HTML" | "http://www.w3.org/1999/02/22-rdf-syntax-ns#JSON" | "https://www.w3.org/1999/02/22-rdf-syntax-ns#JSON" | "http://www.w3.org/1999/02/22-rdf-syntax-ns#langString" | "https://www.w3.org/1999/02/22-rdf-syntax-ns#langString" | "http://www.w3.org/1999/02/22-rdf-syntax-ns#PlainLiteral" | "https://www.w3.org/1999/02/22-rdf-syntax-ns#PlainLiteral" | "http://www.w3.org/1999/02/22-rdf-syntax-ns#XMLLiteral" | "https://www.w3.org/1999/02/22-rdf-syntax-ns#XMLLiteral" | DatatypeLeaf;

interface EducationBase extends ResourceBase {
    /** Type (title) of the degree. */
    "degreeType"?: SchemaValue<never>;
    /** Description of the education info. */
    "eduDescription"?: SchemaValue<Literal | IdReference>;
    /** Education end (graducation) date (YYYY-MM-DD) May contain only year or year and month. */
    "eduGradDate"?: SchemaValue<Literal | IdReference>;
    /** Major speciality graduated. */
    "eduMajor"?: SchemaValue<Literal | IdReference>;
    /** Minor speciality(-ies) graduated. */
    "eduMinor"?: SchemaValue<Literal | IdReference>;
    /** Education start date (YYYY-MM-DD) May contain only year or year and month. */
    "eduStartDate"?: SchemaValue<Literal | IdReference>;
    /** Educational organization where person studied. */
    "studiedIn"?: SchemaValue<EducationalOrg | IdReference>;
}
interface EducationLeaf extends EducationBase {
    "@type": "Education";
}
/** CV entry for education */
export type Education = EducationLeaf;

interface EducationalOrgLeaf extends OrganizationBase {
    "@type": "EducationalOrg";
}
/** Educational organization (university, ...) */
export type EducationalOrg = EducationalOrgLeaf;

interface HTMLLeaf extends ResourceBase {
    "@type": "http://www.w3.org/1999/02/22-rdf-syntax-ns#HTML";
}
/** The datatype of RDF literals storing fragments of HTML content */
export type HTML = HTMLLeaf;

interface JSONLeaf extends ResourceBase {
    "@type": "http://www.w3.org/1999/02/22-rdf-syntax-ns#JSON";
}
/** The datatype of RDF literals storing JSON content. */
export type JSON = JSONLeaf;

interface langStringLeaf extends ResourceBase {
    "@type": "http://www.w3.org/1999/02/22-rdf-syntax-ns#langString";
}
/** The datatype of language-tagged string values */
export type langString = langStringLeaf;

interface LanguageSkillLeaf extends SkillBase {
    "@type": "LanguageSkill";
}
/** Language skill. Contains 3 levels for skill: spoken, written, reading. Inherited skill level used for spoken. */
export type LanguageSkill = LanguageSkillLeaf;

interface ListBase extends ResourceBase {
    /** The first item in the subject RDF list. */
    "http://www.w3.org/1999/02/22-rdf-syntax-ns#first"?: SchemaValue<Resource | IdReference>;
    /** The rest of the subject RDF list after the first item. */
    "http://www.w3.org/1999/02/22-rdf-syntax-ns#rest"?: SchemaValue<List | IdReference>;
}
interface ListLeaf extends ListBase {
    "@type": "http://www.w3.org/1999/02/22-rdf-syntax-ns#List";
}
/** The class of RDF Lists. */
export type List = "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil" | "https://www.w3.org/1999/02/22-rdf-syntax-ns#nil" | ListLeaf;

interface LiteralLeaf extends ResourceBase {
    "@type": "http://www.w3.org/2000/01/rdf-schema#Literal";
}
/** The class of literal values, eg. textual strings and integers. */
export type Literal = LiteralLeaf | HTML | JSON | langString | PlainLiteral | XMLLiteral;

interface OrganizationBase extends ResourceBase {
    /** Country where the company is located. */
    "Country"?: SchemaValue<never>;
    /** Region / state of the company. */
    "Locality"?: SchemaValue<Literal | IdReference>;
    /** Name of the company */
    "Name"?: SchemaValue<Literal | IdReference>;
    /** Notes about the company. */
    "Notes"?: SchemaValue<Literal | IdReference>;
    /** Company home page */
    "URL"?: SchemaValue<Literal | IdReference>;
}
interface OrganizationLeaf extends OrganizationBase {
    "@type": "Organization";
}
/** General class for organizations */
export type Organization = OrganizationLeaf | Company | EducationalOrg;

interface OtherInfoBase extends ResourceBase {
    /** Description - content of misc CV information. */
    "otherInfoDescription"?: SchemaValue<Literal | IdReference>;
    /** Type of other CV information (interests / awards / accomplishments / point of view / membership / social activities / other) */
    "otherInfoType"?: SchemaValue<never>;
}
interface OtherInfoLeaf extends OtherInfoBase {
    "@type": "OtherInfo";
}
/** Other information in CV */
export type OtherInfo = OtherInfoLeaf;

interface PersonBase extends Partial<IdReference> {
    /** Place of birth of the person. */
    "birthPlace"?: SchemaValue<Literal | IdReference>;
    /** Gender property (man/woman) */
    "gender"?: SchemaValue<never>;
    /** Person's citizenship. */
    "hasCitizenship"?: SchemaValue<never>;
    /** Indicates if the person has drivers license (for regular cars). */
    "hasDriversLicense"?: SchemaValue<never>;
    /** Person's nationality. */
    "hasNationality"?: SchemaValue<Literal | IdReference>;
    /** Indicates person's marital status. */
    "maritalStatus"?: SchemaValue<never>;
    /** Number of children the person has. */
    "noOfChildren"?: SchemaValue<Literal | IdReference>;
}
interface PersonLeaf extends PersonBase {
    "@type": "Person";
}
/** CV subclass of WordNet person */
export type Person = PersonLeaf;

interface PersonalReferenceBase extends Partial<IdReference> {
}
interface PersonalReferenceLeaf extends PersonalReferenceBase {
    "@type": "PersonalReference";
}
/** Personal reference */
export type PersonalReference = PersonalReferenceLeaf;

interface PlainLiteralLeaf extends ResourceBase {
    "@type": "http://www.w3.org/1999/02/22-rdf-syntax-ns#PlainLiteral";
}
/** The class of plain (i.e. untyped) literal values, as used in RIF and OWL 2 */
export type PlainLiteral = PlainLiteralLeaf;

interface ProfessionalReferenceBase extends Partial<IdReference> {
}
interface ProfessionalReferenceLeaf extends ProfessionalReferenceBase {
    "@type": "ProfessionalReference";
}
/** Professional reference */
export type ProfessionalReference = ProfessionalReferenceLeaf;

interface PropertyBase extends ResourceBase {
    /** A domain of the subject property. */
    "http://www.w3.org/2000/01/rdf-schema#domain"?: SchemaValue<Class | IdReference>;
    /** A range of the subject property. */
    "http://www.w3.org/2000/01/rdf-schema#range"?: SchemaValue<Class | IdReference>;
    /** The subject is a subproperty of a property. */
    "http://www.w3.org/2000/01/rdf-schema#subPropertyOf"?: SchemaValue<Property | IdReference>;
}
interface PropertyLeaf extends PropertyBase {
    "@type": "http://www.w3.org/1999/02/22-rdf-syntax-ns#Property";
}
/** The class of RDF properties. */
export type Property = PropertyLeaf | ContainerMembershipProperty;

interface ReferneceBase extends ResourceBase {
    /** Points to a person who provides the reference. */
    "referenceBy"?: SchemaValue<Person | IdReference>;
}
interface ReferneceLeaf extends ReferneceBase {
    "@type": "Refernece";
}
/** CV entry for references */
export type Refernece = ReferneceLeaf;

interface ResourceBase extends Partial<IdReference> {
    /** A description of the subject resource. */
    "http://www.w3.org/2000/01/rdf-schema#comment"?: SchemaValue<Literal | IdReference>;
    /** The defininition of the subject resource. */
    "http://www.w3.org/2000/01/rdf-schema#isDefinedBy"?: SchemaValue<Resource | IdReference>;
    /** A human-readable name for the subject. */
    "http://www.w3.org/2000/01/rdf-schema#label"?: SchemaValue<Literal | IdReference>;
    /** A member of the subject resource. */
    "http://www.w3.org/2000/01/rdf-schema#member"?: SchemaValue<Resource | IdReference>;
    /** Further information about the subject resource. */
    "http://www.w3.org/2000/01/rdf-schema#seeAlso"?: SchemaValue<Resource | IdReference>;
    /** The subject is an instance of a class. */
    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"?: SchemaValue<Class | IdReference>;
    /** Idiomatic property used for structured values. */
    "http://www.w3.org/1999/02/22-rdf-syntax-ns#value"?: SchemaValue<Resource | IdReference>;
}
interface ResourceLeaf extends ResourceBase {
    "@type": "http://www.w3.org/2000/01/rdf-schema#Resource";
}
/** The class resource, everything. */
export type Resource = ResourceLeaf | Class | CompoundLiteral | Container | CV_Entry | List | Literal | Organization | Property | Statement;

interface SeqLeaf extends ResourceBase {
    "@type": "http://www.w3.org/1999/02/22-rdf-syntax-ns#Seq";
}
/** The class of ordered containers. */
export type Seq = SeqLeaf;

interface SkillBase extends ResourceBase {
    /** Date when skill was last used. */
    "skillLastUsed"?: SchemaValue<Literal | IdReference>;
    /** Level of the skill (0..5) */
    "skillLevel"?: SchemaValue<Literal | IdReference>;
    /** Name of the skill */
    "skillName"?: SchemaValue<Literal | IdReference>;
    /** Year of experience in this skill. */
    "skillYearsExperience"?: SchemaValue<Literal | IdReference>;
}
interface SkillLeaf extends SkillBase {
    "@type": "Skill";
}
/** CV entry for description of skills */
export type Skill = SkillLeaf | LanguageSkill;

interface StatementBase extends ResourceBase {
    /** The object of the subject RDF statement. */
    "http://www.w3.org/1999/02/22-rdf-syntax-ns#object"?: SchemaValue<Resource | IdReference>;
    /** The predicate of the subject RDF statement. */
    "http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate"?: SchemaValue<Resource | IdReference>;
    /** The subject of the subject RDF statement. */
    "http://www.w3.org/1999/02/22-rdf-syntax-ns#subject"?: SchemaValue<Resource | IdReference>;
}
interface StatementLeaf extends StatementBase {
    "@type": "http://www.w3.org/1999/02/22-rdf-syntax-ns#Statement";
}
/** The class of RDF statements. */
export type Statement = StatementLeaf;

interface TargetBase extends ResourceBase {
    /** Is candidate willing to relocate? */
    "conditionWillRelocate"?: SchemaValue<never>;
    /** Is candidate willing to travel? */
    "conditionWillTravel"?: SchemaValue<never>;
    /** Target career level. */
    "targetCareerLevel"?: SchemaValue<never>;
    /** Description on the company where the candidate would like to work. */
    "targetCompanyDescription"?: SchemaValue<Literal | IdReference>;
    /** Industry of the company where the candidate would like to work. */
    "targetCompanyIndustry"?: SchemaValue<Literal | IdReference>;
    /** Size of the target company. */
    "targetCompanySize"?: SchemaValue<Literal | IdReference>;
    /** Country where would like to work. */
    "targetCountry"?: SchemaValue<never>;
    /** Description of the job applicant is seeking. Notes. */
    "targetJobDescription"?: SchemaValue<Literal | IdReference>;
    /** Job mode: full-time / part-time */
    "targetJobMode"?: SchemaValue<never>;
    /** Target job type. */
    "targetJobType"?: SchemaValue<never>;
    /** Target salary */
    "targetSalary"?: SchemaValue<Literal | IdReference>;
    /** Currency for target salary. */
    "targetSalaryCurrency"?: SchemaValue<Literal | IdReference>;
    /** Notice period in weeks when can start to work. */
    "weeksNoticePeriod"?: SchemaValue<Literal | IdReference>;
}
interface TargetLeaf extends TargetBase {
    "@type": "Target";
}
/** CV information for target of job application. (Single entry per CV. May be defined in the properties of CV class instead). */
export type Target = TargetLeaf;

interface WorkHistoryBase extends ResourceBase {
    /** Career level for the position in company. */
    "careerLevel"?: SchemaValue<never>;
    /** The company where the person is/was employed. */
    "employedIn"?: SchemaValue<Company | IdReference>;
    /** End date of employment. Format: YYYY-MM-DD May containt only year or year and month. */
    "endDate"?: SchemaValue<Literal | IdReference>;
    /** Indicates if this is a current workplace. */
    "isCurrent"?: SchemaValue<never>;
    /** Description of the job in company. */
    "jobDescription"?: SchemaValue<Literal | IdReference>;
    /** Title in the company. */
    "jobTitle"?: SchemaValue<Literal | IdReference>;
    /** Type of the job: employee / contractor / intern */
    "jobType"?: SchemaValue<never>;
    /** Number of subordinates. */
    "numSubordinates"?: SchemaValue<Literal | IdReference>;
    /** Start date of employment. Format: YYYY-MM-DD May containt only year or year and month. */
    "startDate"?: SchemaValue<Literal | IdReference>;
}
interface WorkHistoryLeaf extends WorkHistoryBase {
    "@type": "WorkHistory";
}
/** CV entry for work history */
export type WorkHistory = WorkHistoryLeaf;

interface XMLLiteralLeaf extends ResourceBase {
    "@type": "http://www.w3.org/1999/02/22-rdf-syntax-ns#XMLLiteral";
}
/** The datatype of XML literal values. */
export type XMLLiteral = XMLLiteralLeaf;

