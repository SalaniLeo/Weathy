<div class="gap2 fhorizontal">
    <div class="fhorizontal gap1">
      <div>
        <h1>Rainfall</h1>
      </div>

      <div class="fvertical gap2 scrollableMapRow">
        <div class="fhorizontal gap1 card">
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
        <div class="fhorizontal gap1 card">
          <div class="mapWidgetContainer gap2 fhorizontal">
            <b>NOAA - 7 Day</b>
            <!-- svelte-ignore a11y-invalid-attribute -->
            <a
              href="javascript:window.open('https://www.cpc.ncep.noaa.gov/products/JAWF_Monitoring/Europe/daily/p.7day.figa.gif','','scrollbars=no,width=1265,height=955');void('');"
            >
              <img
                class="mapWidget"
                src="https://www.cpc.ncep.noaa.gov/products/JAWF_Monitoring/Europe/daily/p.7day.figa.gif"
                alt="ingrandisci"
              />
            </a>
          </div>
        </div>
      </div>


    </div>

    <div class="fhorizontal gap1">
      <div>
        <h1>Strikes</h1>
      </div>
  
      <div class="fhorizontal gap1 card">
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
  h1 {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }
  .scrollableMapRow {
    flex-wrap: nowrap;
    overflow-x: scroll;
    padding: 0.5rem;
  }
  .mapWidget {
      height: 10rem;
      width: auto;
  }
</style>