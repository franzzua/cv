<script lang="ts">
    import { session } from "../auth/session";
    import { get, type Writable } from "svelte/store";
    import Icon from "./icon.svelte";
    
    export let value: Writable<number | null>;
    let className: string;
    $: date = $value ? new Date($value) : null;
    $: text =  !date || isNaN(+date) ? 'CurrentTime' : date.toLocaleString('default', {month: 'long', year: "numeric"});
    $: year = date?.getFullYear();
    $: month = date?.getMonth();

    function onChangeYear(e: Event) {
        const input = e.currentTarget as HTMLInputElement;
        if (!Number.isFinite(input.valueAsNumber))
            return;
        const current = date ?? new Date(0);
        current.setFullYear(input.valueAsNumber);
        value.set(+current);
    }

    function onChangeMonth(e: Event) {
        const input = e.currentTarget as HTMLInputElement;
        if (!Number.isFinite(input.valueAsNumber))
            return;
        const current = date ?? new Date(0);
        current.setMonth(input.valueAsNumber);
        value.set(+current);
    }

    function getMonthName(month: number) {
        const d = new Date();
        d.setMonth(month);
        return d.toLocaleString('default', {month: 'long'});
    }

    export { className as class };
</script>
<div class:text={true} class={className}>
    {#if $session.isLoggedIn}
        <input class="year" on:change={onChangeYear} type="number" min="1970" max={new Date().getFullYear()} value={year}>
        <select on:change={onChangeMonth} value={month}>
            {#each Array(12).fill(0) as _, month}
                <option value={month}>{getMonthName(month)}</option>
            {/each}
        </select>
        <Icon on:click={() => value.set(null)}>x</Icon>
    {:else }
        {text}
    {/if}
</div>
<style lang="less">
  .text {
    padding: .1em;
    border: none;
    outline: none;
    min-height: 1em;
    font-size: .8em;
    display: flex;
    white-space: nowrap;
    &:empty, &:hover {
      background: var(--hoverBg);
    }

    .year {
      width: 7ch;
    }
    input, select {
      border: none;
      background: none;
      color: var(--accent);
      outline: none;
    }
    &:hover{
      input, select {
        color: var(--hoverColor);
        
      }
    }
  }
</style>