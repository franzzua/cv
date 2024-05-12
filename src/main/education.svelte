<script lang="ts">
    import type { Education, Experience } from "../store/cv";
    import Text from "./text.svelte";
    import Date from "./date.svelte";
    import Editor from "./editor.svelte";
    import type { Writable } from "svelte/store";
    import { keyed } from "svelte-keyed";

    export let education: Writable<Education>;

</script>
<div class="container">
    <div class="header">
        <Text value={keyed(education, 'schoolName')} class="schoolName"/>
        <Text value={keyed(education, 'degree')} class=""/>
        <div style="display: flex; flex: 1; justify-content: flex-end">
        <Date value={keyed(education, 'start')} class=""/>
        <span> — </span>
        <Date value={keyed(education, 'end')} class=""/>
        </div>
    </div>
    <Editor text={keyed(education, 'description')}/>
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
</style>