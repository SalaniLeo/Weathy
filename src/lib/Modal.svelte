<script>
  // @ts-nocheck

  export let showModal; // boolean

  let dialog; // HTMLDialogElement

  $: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<dialog
  bind:this={dialog}
  on:close={() => (showModal = false)}
  on:click|self={() => dialog.close()}
  class="outline"
>
  <div on:click|stopPropagation>
    <slot name="header" />
    <hr />
    <slot />
    <hr />
    <button
      on:click={() => dialog.close()}
      style="margin-bottom: 0px; margin-top:15px;">Close</button
    >
  </div>
</dialog>

<style>
  dialog {
    background-color: var(--primary-color);
    border-radius: var(--border-radius-heavy);
    border: none;
    padding: 0px;
    outline: 2px solid var(--accent-color-primary);
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
  }
  dialog > div {
    padding: 1em;
  }
  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  button {
    display: block;
    padding: 10px;
    border-radius: var(--border-radius-medium);
  }
</style>
