<script>
    import { fade, fly } from 'svelte/transition'
    import { onMount } from 'svelte'
    let ready = false
    onMount(() => ready = true)
</script>

<nav class="grid grid-cols-2 lg:grid-cols-nav w-full font-chicago text-orange border-purple border-b-2">
    {#if ready}
    <div class="flex items-center justify-center py-5">
        <a in:fly="{{ y: -50, duration: 200 }}" href="/#" class="uppercase text-4xl lg:text-5xl xl:text-6xl font-chic-border lg:ml-10">Feeder</a>
    </div>
    <div class="hidden lg:flex w-full h-full items-center justify-center border-purple border-r-2 border-l-2">
        <a in:fly="{{ y: -50, duration: 250 }}" href="/#about" class="text-2xl">About</a>
    </div>
    <div class="hidden lg:flex w-full h-full items-center justify-center border-purple border-r-2">
        <a in:fly="{{ y: -50, duration: 300 }}" href="/#features" class="text-2xl">Features</a>
    </div>
    <div class="hidden lg:flex w-full h-full items-center justify-center border-purple border-r-2">
        <a in:fly="{{ y: -50, duration: 350 }}" href="/#roadmap" class="text-2xl">Roadmap</a>
    </div>
    <div class="hidden lg:flex w-full h-full items-center justify-center border-purple border-r-2">
        <a in:fly="{{ y: -50, duration: 400 }}" href="/#team" class="text-2xl">Team</a>
    </div>
    <div class="flex w-full h-full bg-orange items-center justify-center">
        <a in:fly="{{ y: -50, duration: 450 }}" href="/wallet" class="uppercase text-2xl text-deep-purple">go to wallet</a>
    </div>
    {/if}
</nav>