import type { Writable } from "svelte/store";

export function append<TKey extends keyof T, TValue, T extends {
    [key in TKey]?: Array<TValue>
}>(w: Writable<T | undefined>, key: TKey, value: TValue = {} as TValue){
    w.update(c => ({
        ...(c ?? {}) as T,
        [key]: [...(c?.[key] as any ?? []), value]
    }));
}