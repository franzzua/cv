<script lang="ts">
    import {cv} from "../store/cv";
</script>
<div class="name" contenteditable bind:innerHTML={$cv.name} />
<style lang="less">
    .name{
        font-size: 24px;
        background: #213547;
        width: 100%;
        height: 1.5em;
    }
</style>
