<div class="gap2 fhorizontal">
    <div class="fhorizontal gap1">
      <div>
        <h1>Radar</h1>
      </div>

      <div class="scrollableMapRow fhorizontal gap1 card">
        <div class="mapWidgetContainer gap2 fhorizontal">
          <b>Radar - Protezione Civile</b>
          <!-- svelte-ignore a11y-invalid-attribute -->
          <a
            href="javascript:window.open('https://cdn4.3bmeteo.com/images/radar/VMI_animation.gif','','scrollbars=no,width=1265,height=955');void('');"
          >
            <img
              class="mapWidget"
              src="https://cdn4.3bmeteo.com/images/radar/VMI_animation.gif"
              alt="ingrandisci"
            />
          </a>
        </div>
      </div>
    </div>

    <div class="fhorizontal gap1">
      <div>
        <h1>Strikes</h1>
      </div>
  
      <div class="scrollableMapRow fhorizontal gap1 card">
        <div class="mapWidgetContainer gap2 fhorizontal">
          <p>Strikes - Meteociel</p>
          <!-- svelte-ignore a11y-invalid-attribute -->
          <a
            href="javascript:window.open('https://www.meteociel.fr/obs/foudre/anim_it.gif','','scrollbars=no,width=692,height=692');void('');"
          >
            <img
              class="mapWidget"
              src="https://www.meteociel.fr/obs/foudre/anim_it.gif"
              alt="ingrandisci"
            /></a
          >
        </div>
      </div>
    </div>
  </div>

<style>
    .mapWidget {
        height: 10rem;
        width: auto;
    }
</style>