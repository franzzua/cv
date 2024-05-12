<script lang="ts">
    import Photo from "./photo.svelte"
    import Text from "./text.svelte"
    import { getCV, writeCV } from "../store/api";
    import { cv } from "../store/cv";
    import { get } from "svelte/store";
    import { keyed } from "svelte-keyed"
    import { session } from "../auth/session";
    import SkillGroup from "./skill-group.svelte";
    import Experience from "./experience.svelte";
    import Education from "./education.svelte";
    import Editor from "./editor.svelte";
    import Collection from "./collection.svelte";

    export let url: string;
    if (get(session).isLoggedIn){
        cv.set(JSON.parse(localStorage.getItem('cv') ?? 'null'));
        cv.subscribe(x => localStorage.setItem('cv', JSON.stringify(x)));
    } else {
        getCV(url).then(cv.set);
    }
    $: experiencesSorted = $cv?.experience?.slice().sort((a,b) => (b.start ?? 0) - (a.start ?? 0)) ?? [];
    $: educationSorted = $cv?.education?.slice().sort((a,b) => (b.start ?? 0) - (a.start ?? 0)) ?? [];
</script>
{#if $cv}
<div class="container">
<aside>
    <Photo/>
    <Collection items={keyed(cv, 'skillGroups')} component={SkillGroup}/>
</aside>
<main>
    <Text value={keyed(cv, 'name')} class="name"/>
    <Text value={keyed(cv, 'title')} class="title"/>
    <details open={!$session.isLoggedIn}>
        <summary class="label">Summary</summary>
        <Editor text={keyed(cv, 'summary')}/>
    </details>
    <details open={!$session.isLoggedIn}>
        <summary  class="label">Experience</summary>
        <Collection component={Experience} 
                    items={keyed(cv, `experience`)}
                    sortKey="start"
                    key="experience"/>
    </details>
    <details open={!$session.isLoggedIn}>
        <summary  class="label">Education</summary>
        <Collection component={Education}
                    sortKey="start"
                    items={keyed(cv, `education`)} key="education"/>
    </details>
    <details open={!$session.isLoggedIn}>
        <summary  class="label">Pet projects</summary>
        <Collection component={Experience}
                    sortKey="start"
                    items={keyed(cv, `petProjects`)} key="experience"/>
    </details>
    {#if $session.isLoggedIn}
        <div style="flex: 1"></div>
        <div class="button-bar">
            <button on:click={() => getCV(url).then(x => cv.set(x))}>Load</button>
            <button on:click={() => writeCV(get(cv), url)}>Save</button>
        </div>
    {/if}
</main>
</div>
{/if}
<style>
    .container{
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        box-sizing: border-box;
        height: 100%;
        margin: 4em auto 12em;
        background: var(--background);
        box-shadow: var(--aside) 0 0 40px 0;

        @media (max-width: 120ch) {
            margin: 0;
        }
    }
    aside {
        background: var(--aside);
        color: var(--colorAside);
        width: 24ch;
        padding: 1em;
        box-sizing: border-box;
    }
    main {
        flex: 1;
        color: var(--color);
        max-width: 72ch;
        display: flex;
        flex-direction: column;
        padding: 1em 2em 3em 1em;
        box-sizing: border-box;
    }
</style>
