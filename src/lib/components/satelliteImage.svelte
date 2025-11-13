<script lang="ts">
    let { title, image } = $props();
</script>

<div class="flexcolumn gap2 wrapper padding2 radius-heavy halign border">
    {#if title}
        <p>{title}</p>
    {/if}
    <a href="javascript:window.open('{image}','','scrollbars=no,width=1265,height=955');void('');">
        <img class="hexpand vexpand radius-light" src="{image}" alt="">
    </a>
</div>

<style>
    img {
        max-width: 250px;
        max-height: 250px;
        min-width: 150px;
    }
    .wrapper {
        background-color: var(--terthiary-color);
        text-align: start;
    }
</style>