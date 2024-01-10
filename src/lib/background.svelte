<main>
  <div id="bg">
    <p class="shape1 border bg" />
    <i class="shape2 border bg" />
  </div>
</main>

<style>
  #bg {
    opacity: 1;
    z-index: -1;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0px;
    background-color: var(--body-color-light);
  }

  .border {
    border: solid 3px #242424;
  }

  .shape1 {
    position: fixed;
    width: 200px;
    height: 200px;
    background-color: #c2b7ff91;
    box-shadow: 10px 10px 10px #c2b7ff91;
    border-radius: 25%;
    rotate: 25deg;
    top: 250px;
    left: 270px;
  }

  .shape2 {
    position: fixed;
    right: 100px;
    top: 800px;
    height: 140px;
    width: 140px;
    background-color: #e97b7b79;
    box-shadow: 3px 6px 10px #e97b7b79;
    border-radius: 32% 68% 47% 53% / 35% 45% 55% 65%;
  }
</style>
