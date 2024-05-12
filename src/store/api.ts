import {
    overwriteFile,
    deleteFile,
    getPodUrlAll,
    getSolidDataset,
    saveSolidDatasetAt
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import { setPublicAccess } from "@inrupt/solid-client/universal";
import type { CV } from "./cv";
import {parse, serialize} from "./converter";
import { rdf } from "./rdf";
import { CVRDF } from "./cv.rdf";

export async function uploadPhoto(file: File): Promise<string> {
    const rnd = Array.from(crypto.getRandomValues(new Uint8Array(4))).map(x => x.toString(16)).join('')
    const url = `${pod}tmp/${rnd}.${file.name.split(".").pop()}`;
    await overwriteFile(url, file, {contentType: file.type, fetch});
    await setPublicAccess(url, {read: true}, {fetch});
    return url;
}

const pod = `https://storage.inrupt.com/6f111ebe-3483-403a-918c-b60c4ff07e09/`;

export async function writeCV(cv: CV | undefined, cvUrl: string): Promise<void> {
    if (!cv) return ;
    // await deleteFile(cvUrl, {fetch})
    const dataset = await getSolidDataset(cvUrl, {fetch});
    const updated = rdf.serialize(CVRDF, serialize(cv), 'default', dataset, cvUrl)
    await saveSolidDatasetAt(cvUrl, updated, {fetch});
    await setPublicAccess(cvUrl, {read: true}, {fetch});
}
export async function getCV(cvUrl: string): Promise<CV>{
    const dataset = await getSolidDataset(cvUrl);
    const cvRDF = rdf.parse(CVRDF, 'default', dataset, cvUrl);
    return  parse(cvRDF)
    // return await fetch(cvUrl).then(x => x.blob()).then(parse).catch(() => ({experience: []} as CV));
}

export async function removePhoto(url: string){
    await deleteFile(url, {fetch});
}

export async function getPods(webId: string){
    return await getPodUrlAll(webId, { fetch });

}

export async function getFiles(path: string){
    if (!path) return [];
    const file = await getSolidDataset(path, {fetch});
    console.log(file.graphs.default);
    return Object.keys(file.graphs.default).map(x => x.substring(path.length));
}
