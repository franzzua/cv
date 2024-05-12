<script lang="ts">
    import type { SkillGroup } from "../store/cv";
    import Text from "./text.svelte";
    import type { Writable } from "svelte/store";
    import { keyed } from "svelte-keyed";
    import Collection from "./collection.svelte";
    export let item: Writable<SkillGroup>;
</script>
<div class="skill-group">
    <Text value={keyed(item, 'title')} class="skill-group-title"/>
    <Collection items={keyed(item, `skills`)} 
                component={Text} 
                key="value" 
                path=".title"/>
</div>
<style>
    .skill-group{
        display: flex;
        flex-flow: row wrap;
        gap: .5em;
        margin-bottom: 1em;
    }
</style>