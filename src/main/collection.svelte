<script lang="ts" generics="T">
import { keyed } from "svelte-keyed";
import Icon from "./icon.svelte";
import type { Writable } from "svelte/store";

export let items: Writable<T[]>;
export let component: ConstructorOfATypedSvelteComponent;
export let getInstance: () => T = () => ({} as T);
export let key = 'item';
export let path = '';
export let sortKey: keyof T | null = null;

$: sorted = sortKey ? $items?.slice().sort((a,b) => (b[sortKey!] ?? 0 as any) - (a[sortKey!] ?? 0 as any)) ?? [] : $items;
</script>

{#each sorted ?? [] as item}
    <svelte:component this={component}
                      {...{
                          [key]: keyed(items, `[${$items.indexOf(item)}]`+ path)
                      }} />
    <Icon on:click={() => items.update(x => x.filter(i => i !== item))}>-</Icon>
{/each}
<Icon on:click={() => items.update(x => [...(x??[]), getInstance()])}>+</Icon>