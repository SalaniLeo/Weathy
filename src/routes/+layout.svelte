<script>
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import { base } from "$app/paths";
</script>

<p id="mobiletopbar" />
<h1 class="title">SalaniLeo's Weather</h1>
<div class="darker outline1" id="navbar">
  <a class="shortcut" id="home" href={base + "/"}
    ><i class="fa-solid fa-house" /></a
  >
  <a class="shortcut" id="radar" href={base + "/globe"}
    ><i class="fa-solid fa-satellite-dish" /></a
  >
  <a class="shortcut" id="tempmap" href={base + "/temperatures"}
    ><i class="fa-solid fa-temperature-half" /></a
  >

  <p />

  <a class="shortcut bottom" id="github" href="https://www.github.com/salaniLeo"
    ><i class="fa-brands fa-github" /></a
  >
  <a class="shortcut bottom" id="info" href={base + "/about"}
    ><i class="fa-solid fa-circle-info" /></a
  >
</div>
<slot />
