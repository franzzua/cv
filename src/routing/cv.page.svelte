<script lang="ts">
    import CV from "../main/cv.svelte";

    function getUrl() {
        const url = new URLSearchParams(location.search).get('url');
        console.log(url)
        if (!url) return undefined;
        return atob(url);
    }

    $: url = getUrl();
</script>
{#if url}
<CV url={url}/>
{/if}