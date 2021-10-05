<script>
    import { tick } from 'svelte';
    import { defaultChainStore } from 'svelte-web3'
    import { fly } from 'svelte/transition'
    import { onMount } from 'svelte'
    let ready = false
    onMount(() => ready = true)

    export let data

    const connect = async () => {
        await tick()
        defaultChainStore.setBrowserProvider()
    }
</script>

<nav class="grid grid-cols-2 lg:grid-cols-wallet-nav w-full font-chicago text-orange border-purple border-b-2">
    {#if ready}
    <div class="flex items-center justify-center py-5">
        <a in:fly="{{ y: 50, duration: 350 }}" href="/#" class="uppercase text-4xl lg:text-5xl xl:text-6xl font-chic-border lg:ml-10">Feeder</a>
    </div>
    <div class="hidden lg:flex w-full h-full items-center justify-center border-purple border-r-2">
        <div in:fly="{{ y: 50, duration: 400 }}" class="text-2xl">{data.account}</div>
    </div>
    <div class="flex w-full h-full bg-orange items-center justify-center">
        <div in:fly="{{ y: 50, duration: 450 }}" class="uppercase text-2xl text-deep-purple">
            {#if data.balance}
                {#await data.balance}
                    <span>connecting...</span>
                {:then value} 
                    <span>{(value / 10**18).toFixed(2)} ETH</span>
                {/await}
            {:else}
                <span on:click={connect} class="cursor-pointer">connect</span>
            {/if}
        </div>
    </div>
    {/if}
</nav>