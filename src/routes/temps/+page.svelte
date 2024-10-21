<div class="root fhorizontal">
    <h2>EmiliaRomagnaMeteo temperature map, <a href="https://www.emiliaromagnameteo.com/rete-stazioni/mappa/temperature/">open<i class="fa-solid fa-up-right-from-square"></i></a></h2>
    <!-- svelte-ignore a11y-missing-attribute -->
    <iframe src="https://www.emiliaromagnameteo.com/rete/temp_attuale.php" frameborder="0"></iframe>
</div>

<style>
    .root {
        display: flex;
        align-items: center;
        justify-content: center;
        /* align-items: center; */
    }
    iframe {
        width: 100%;
        height: 100vh;
    }
</style>