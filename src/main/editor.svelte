<script lang="ts">
    import { onMount, onDestroy } from 'svelte'
    import Quill from 'quill'
    import 'quill/dist/quill.snow.css'
    import { get, type Writable } from "svelte/store";
    import { session } from "../auth/session";

    let element: HTMLDivElement | undefined;
    let editor: Quill | undefined;
    export let text: Writable<string>;
    onMount(() => {
        if (!element) return;
        element.innerHTML = get(text);
        editor = new Quill(element!, {
            theme: 'snow',
            modules: {
                toolbar: get(session).isLoggedIn,
            },
            readOnly: !get(session).isLoggedIn,
        });
        editor.on('text-change', e => {
            const html = editor?.getSemanticHTML();
            text.set(html!);
        })
    })

    onDestroy(() => {
        if (element) {
            for (let elem of element.children) elem.remove()
        }
    })
</script>

<div style="display: flex; flex-flow: column">
<div bind:this={element}/>
</div>
<style lang="less">
  :global(.ql-container.ql-disabled) {
    border: none;
  }
  :global(.ql-editor) {
    border: none !important;
    :global(h2) {
      font-size: 2rem;
      &:not(:first-child) {
        margin-top: 1em;
      }
    }
    :global(ol){
      padding-left: 0;
    }
  }
</style>