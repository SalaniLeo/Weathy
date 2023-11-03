<script>
  import "@fortawesome/fontawesome-free/css/all.min.css";
</script>

<div id="navbar">
  <a id="home" href="/"><i class="fa-solid fa-house" /></a>
  <a id="radar" href="/globe"><i class="fa-solid fa-satellite-dish" /></a>
  <a id="github" href="https://www.github.com/salaniLeo"
    ><i class="fa-brands fa-github" /></a
  >
  <a id="info" href="/about"><i class="fa-solid fa-circle-info" /></a>
</div>
<slot />

<style>
  #navbar {
    z-index: 10;
    color: white;
    background-color: rgb(7, 13, 30);
    position: fixed;
    right: 0px;
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
</style>
