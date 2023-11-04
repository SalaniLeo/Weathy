<script>
  import { base } from "$app/paths";
</script>

<div id="root">
  <h1>Page Not Found</h1>
  <h3>This page does not exist. Go back to <a href={base + "/"}>home</a>?</h3>
</div>

<style>
  #root {
    position: relative;
    top: 60px;
    text-align: center;
    height: 100ch;
  }

  h1,
  h3 {
    position: relative;
    top: 100px;
  }
</style>
