<script lang="ts">

import { session } from "../auth/session";
import { getFiles, getPods } from "../store/api";

let path: string[] = [];
$: console.log(path)
let selectedFile: string;
function select(p: string){
    if (p.endsWith('/'))
        path = [...path, p];
    else
        selectedFile = p;
}
</script>
<div>
{#if $session.webId}
    <div>User: {$session.webId}</div>
    <div>Select pod</div>
    <select bind:value={path[0]}>
        <option value={undefined}>Select</option>
        {#await getPods($session.webId)}
            Loading...
        {:then pods}
        {#each pods as pod}
            <option value={pod}>{pod}</option>
        {/each}
        {/await}
    </select>
    {#await getFiles(path.join(''))}
        Loading...
    {:then files}
    {#each files as file}
        <button class:folder={file.endsWith('/')} class="file"
             class:selected={selectedFile === file} 
             on:click={() => select(file)}>{file}</button>
    {/each}
    {/await}
    {#if selectedFile}
    <a href={'/cv?url='+btoa(path.join('')+selectedFile)}>open</a>
    {/if}
{:else}
    <a href="/login">login</a>
{/if}
</div>
<style lang="less">
  .file {
    border: none;
    padding: .5em 1em;
    background: transparent;
    cursor: pointer;
    margin: 0;
    display: block;
    &.folder:before {
      content: '*';
    }
  }
    .selected {
      color: var(--accent);
      text-decoration: underline;
    }
</style>