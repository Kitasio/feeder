<script>
    import Nav from '../components/nav.svelte'
</script>

<div class="">
    <Nav></Nav>
    <div class="grid lg:grid-cols-2 w-full h-full">
        <div class="hidden lg:inline-block"></div>
        <div class="space-y-2 my-40 lg:my-72 lg:ml-20">
            <h2 class="text-4xl lg:text-6xl text-orange anim-font">WALLET</h2>
            <h2 class="anim1 text-4xl lg:text-6xl text-orange">FOR COLLECTIVE</h2>
            <h2 class="text-4xl lg:text-6xl text-orange font-quick font-light hover:font-bold transition-all duration-300">PROJECTS</h2>
            <div class="pt-3 lg:text-lg font-quick anim1">
                <p>Platform for collective projects</p>
                <p>based on blockchain technology</p>
            </div>
        </div>
        <span>Hello world blyat</span>
    </div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Hepta+Slab:wght@1..900&display=swap');
  
    span {
    font-family: "Hepta Slab";
    font-size: 5em;
    animation: 1s infinite variation;
    }

    @keyframes variation {
    0% {
        font-weight: 1;
    }
    50% {
        font-weight: 900;
    }
    100% {
        font-weight: 1;
    }
    }
</style>