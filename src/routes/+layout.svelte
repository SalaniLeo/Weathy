<script>
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import { base } from "$app/paths";
</script>

<h1 id="title">SalaniLeo's Weather</h1>
<div id="navbar">
  <a id="home" href={base + "/"}><i class="fa-solid fa-house" /></a>
  <a id="radar" href={base + "/globe"}
    ><i class="fa-solid fa-satellite-dish" /></a
  >
  <a id="tempmap" href={base + "/temperatures"}
    ><i class="fa-solid fa-temperature-half" /></a
  >

  <a id="github" href="https://www.github.com/salaniLeo"
    ><i class="fa-brands fa-github" /></a
  >
  <a id="info" href={base + "/about"}><i class="fa-solid fa-circle-info" /></a>
</div>
<slot />

<style>
  #title {
    text-align: center;
    border-bottom: 2px solid wheat;
    padding: 10px;
    top: 0px;
    width: 93vw;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
  #navbar {
    z-index: 10;
    color: white;
    background-color: rgb(22, 22, 22);
    position: fixed;
    right: -1px;
    top: 50%;
    transform: translateY(-50%);
    height: 500px;
    width: 35px;
    display: grid;
    grid-template-columns: 0fr;
    grid-template-rows: 0fr 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    justify-content: center;
    padding: 10px;
    border: solid 1px wheat;
  }

  a {
    width: 25px;
    height: 25px;
    position: relative;
    text-align: center;
    transition-duration: 0.2s;
    cursor: pointer;
    color: white;
    text-decoration: none;
    font-size: 25px;
    height: 50px;
  }
  a:hover {
    scale: 110%;
    color: rgb(216, 216, 216);
  }
  #info,
  #github {
    position: relative;
    bottom: -20px;
  }
  #tempmap {
    position: relative;
    top: -245px;
  }
</style>
