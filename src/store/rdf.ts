import {
    getThing,
    type SolidDataset,
    getStringNoLocaleAll,
    getUrlAll,
    getIntegerAll,
    createThing,
    setUrl,
    setInteger,
    setStringNoLocale,
    setThing,
    addUrl,
    removeUrl,
    setBoolean, getBooleanAll, removeAll
} from "@inrupt/solid-client";

const subjects: Array<{
    target: any;
    namespace: string;
    subject: string;
}> = [];

const predicates: Array<{
    target: any;
    namespace: string | undefined;
    predicate: string;
    isArray: boolean;
    type?: RDFValue;
    property: string;
}> = [];
const entityPredicates: Array<{
    target: any;
    namespace: string | undefined;
    predicate: string;
    property: string;
    isArray: boolean;
    entity: any;
}> = [];

export const rdf = {
    serialize<T>(target: new () => T, data: T, id: string, dataset: SolidDataset, datasetURI: string) {
        const def = subjects.find(x => x.target == target);
        if (!def) throw `Unknown type ${target}`;
        const uri = `${datasetURI}#${id}`;
        let thing = getThing(dataset, uri) ?? createThing({name: id});
        thing = setUrl(thing, "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", `${def.namespace}#${def.subject}`)
        for (let predicate of predicates.filter(x => x.target == target)) {
            const predicateURI = `${predicate.namespace ?? def.namespace}#${predicate.predicate}`;
            let value = data[predicate.property as keyof T] as any;
            if (value == null){
                thing = removeAll(thing, predicateURI);
            } else {
                switch (predicate.type) {
                    case RDFValue.Boolean:
                        thing = setBoolean(thing, predicateURI, value)
                        break;
                    case RDFValue.Integer:
                        thing = setInteger(thing, predicateURI, value)
                        break;
                    case RDFValue.String:
                    default:
                        thing = setStringNoLocale(thing, predicateURI, value)
                        break;
                }
            }
        }
        for (let predicate of entityPredicates.filter(x => x.target == target)) {
            const predicateURI = `${predicate.namespace ?? def.namespace}#${predicate.predicate}`;
            let value = data[predicate.property as keyof T] as any;
            if (!Array.isArray(value)) value = [value];
            const existed = new Set(getUrlAll(thing, predicateURI));
            for (let v of value) {
                const entityId = v.id ?? Array.from(crypto.getRandomValues(new Uint8Array(4))).map(x => x.toString(16)).join('');
                dataset = rdf.serialize(predicate.entity, v, entityId, dataset, datasetURI);
                const uri = `${datasetURI}#${entityId}`;
                if (existed.has(uri)){
                    existed.delete(uri)
                } else {
                    thing = addUrl(thing, predicateURI, uri);
                }
            }
            for (let string of existed) {
                thing = removeUrl(thing, predicateURI, string);
            }
        }
        return setThing(dataset, thing);
    },
    parse<T>(target: new () => T, id: string, dataset: SolidDataset, datasetURI: string): T{
        const result = {} as any;
        const def = subjects.find(x => x.target == target);
        if (!def) throw `Unknown type ${target}`;
        const thing = getThing(dataset, `${datasetURI}#${id}`);
        if (!thing) return null as any;
        result.id = thing.url.substring(datasetURI.length + 1);
        for (let predicate of predicates.filter(x => x.target == target)) {
            const predicateURI = `${predicate.namespace ?? def.namespace}#${predicate.predicate}`;
            const values = (() => {
                switch (predicate.type) {
                    case RDFValue.Boolean:
                        return getBooleanAll(thing, predicateURI);
                    case RDFValue.Integer:
                        return getIntegerAll(thing, predicateURI);
                    case RDFValue.String:
                    default:
                        return getStringNoLocaleAll(thing, predicateURI);
                }
            })();
            if (!values)
                continue;
            result[predicate.property] = predicate.isArray ? values : values[0];
        }
        for (let predicate of entityPredicates.filter(x => x.target == target)) {
            const predicateURI = `${predicate.namespace ?? def.namespace}#${predicate.predicate}`;
            const values = getUrlAll(thing, predicateURI).map(
                url => rdf.parse(predicate.entity, url.substring(datasetURI.length + 1), dataset, datasetURI)
            );
            if (!values)
                continue;
            result[predicate.property] = predicate.isArray ? values : values[0];
        }
        return result;
    },

    subject(subject: string, namespace: string) {
        return (target: any) => {
            subjects.push({target, subject, namespace})
        }
    },
    property(predicate: string, type = RDFValue.String, isArray: boolean = false, namespace: string | undefined = undefined) {
        return (target: any, property: string) => {
            predicates.push({
                target: target.constructor, namespace, predicate, property, isArray, type
            })
        }
    },
    entity(predicate: string, entity: any, isArray: boolean = false, namespace: string | undefined = undefined) {
        return (target: any, property: string) => {
            entityPredicates.push({
                target: target.constructor, namespace, predicate, property, entity, isArray
            })
        }
    },
}
export enum RDFValue {
    String,
    Integer,
    Boolean
}

