<script>
  import { base } from "$app/paths";
</script>

<div id="root">
  <div class="row">
    <div>
      <h1>Meteosat - Italy | Europe | Pacific/East America</h1>
    </div>

    <div id="innerRow">
      <div class="rect border">
        <p>Sat24 infrared</p>
        <a
          href="javascript:window.open('http://www.persicetometeo.com/public/popup/eu_animazione_ir2013.htm','','scrollbars=no,width=1265,height=955');void('');"
        >
          <img
            class="coverImg"
            src="http://sat24.com/image2.ashx?region=eu&amp;ir=true"
            width="200"
            height="150"
            alt="ingrandisci"
          /></a
        >
      </div>

      <div class="rect border">
        <p>Sat24 precipitations</p>
        <a
          href="javascript:window.open('http://www.persicetometeo.com/public/eu_animazione_termica_HD.html','','scrollbars=no,width=1265,height=955');void('');"
        >
          <img
            class="coverImg"
            src="https://it.sat24.com/image?type=km&region=eu&type=km&region=eu"
            width="200"
            height="150"
            alt="ingrandisci"
          /></a
        >
      </div>

      <div class="rect border">
        <p>persicetometeo pacific precipitations</p>
        <a
          href="javascript:window.open('http://www.persicetometeo.com/public/popup/natl_precipitable_water.htm','','scrollbars=no,width=1004,height=472');void('');"
        >
          <img
            class="wide"
            src="http://tropic.ssec.wisc.edu/real-time/mtpw2/webAnims/tpw_nrl_colors/natl/mimictpw_natl_latest.gif"
            alt="ingrandisci"
            width="305"
            height="130"
          /></a
        >
      </div>
    </div>
  </div>
</div>
