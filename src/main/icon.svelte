<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import { session } from "../auth/session";
    const dispatch = createEventDispatcher<{
        click: void
    }>();
</script>
{#if $session.isLoggedIn}
<button class="icon" on:click={() => dispatch('click')}>
    <slot />
</button>
{/if}
<style>
    .icon{
        cursor: pointer;
        padding: 0;
        width: 1em;
        height: 1em;
        line-height: 1em;
        font-size: 1em;
        font-weight: 900;
        border-radius: 100%;
        border: solid 2px;
        display: inline-flex;
        align-items: center;
        justify-content: center;

        &:hover{
            box-shadow: 0 0 3px 1px;
        }
        &:active{
            box-shadow: 0 0 3px 3px;
        }
    }
</style>