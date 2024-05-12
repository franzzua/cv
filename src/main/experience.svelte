<script lang="ts">
    import type { Experience } from "../store/cv";
    import Text from "./text.svelte";
    import Date from "./date.svelte";
    import Editor from "./editor.svelte";
    import type { Writable } from "svelte/store";
    import { keyed } from "svelte-keyed";

    export let experience: Writable<Experience>;

</script>
<div class="container">
    <div class="header">
        <Text value={keyed(experience, 'company')} class="company"/>
        <Text value={keyed(experience, 'role')} class=""/>
        <div class="dates">
        <Date value={keyed(experience, 'start')} class=""/>
        <span>—</span>
        <Date value={keyed(experience, 'end')} class=""/>
        </div>
    </div>
    <Editor text={keyed(experience, 'description')}/>
</div>
<style lang="less">
  .container {
    display: flex;
    flex-flow: column nowrap;
    margin-top: 1em;

    .header {
      display: flex;
      flex-flow: row wrap;
      align-items: baseline;
      gap: 1ch;
    }
  }
  .dates {
    display: flex; 
    flex: 1; 
    justify-content: flex-end;
    gap: 1em;
    align-items: baseline;
  }
</style>