import {loadFile, load} from "schema-dts-gen/dist/src/triples/reader.js"
import {WriteDeclarations} from "schema-dts-gen";
import { Context } from "schema-dts-gen/dist/src/ts/context.js";
import * as fs from "node:fs";
const graph = await loadFile("./src/cv.nt");
const rdfSchema = await load('https://www.w3.org/2000/01/rdf-schema');
const rdfSyntax = await load(' https://www.w3.org/1999/02/22-rdf-syntax-ns');
graph.addQuads(rdfSchema.getQuads());
graph.addQuads(rdfSyntax.getQuads());
const context = Context.Parse('http://rdfs.org/resume-rdf/cv.rdfs');
await fs.promises.truncate('./src/store/cv.n3.ts')
await WriteDeclarations(graph, false, context, async x => {
    await fs.promises.appendFile('./src/store/cv.n3.ts', x, 'utf8');
});