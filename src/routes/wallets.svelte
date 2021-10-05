<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
</svelte:head>

<script>
    import { defaultChainStore, web3, selectedAccount, connected } from 'svelte-web3'
    import WalletNav from "../components/walletNav.svelte";
    import {getAddresses} from '../functions/feederFuncs'
    import WalletCard from '../components/walletCard.svelte'
    import { onMount } from 'svelte';
    
    let abi = [{"inputs":[{"internalType":"address[]","name":"_wallet","type":"address[]"},{"internalType":"uint256[]","name":"_allocation","type":"uint256[]"},{"internalType":"string","name":"_name","type":"string"}],"name":"createFeeder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"feeders","outputs":[{"internalType":"uint256","name":"len","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"getFeeders","outputs":[{"components":[{"internalType":"address[]","name":"addresses","type":"address[]"},{"internalType":"uint256","name":"len","type":"uint256"}],"internalType":"struct FeederFactory.Birds","name":"","type":"tuple"}],"stateMutability":"view","type":"function"}]
    let factoryContract = '0xD55d157FFc003847Aa23E278BB9DB52A22092d2D'
    let feederFactory

    $: checkAccount = $selectedAccount || '0x0000000000000000000000000000000000000000'
    $: balance = $connected ? $web3.eth.getBalance(checkAccount) : ''
    $: feederFactory = $connected ? new $web3.eth.Contract(abi, factoryContract) : ''
    $: data = {
        balance: balance,
        account: checkAccount,
    }

    onMount(() => {
        defaultChainStore.setBrowserProvider()
    })
</script>

<div>
    <WalletNav data={data}></WalletNav>
    <button on:click={() => defaultChainStore.close()}>close connection</button>
    {#if $connected}
        {#await getAddresses(feederFactory, checkAccount)}
            waiting    
        {:then addresses} 
            <div class="px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {#each addresses as addr}
                    <WalletCard address={addr}></WalletCard>
                {/each}
            </div>
        {/await}
    {:else}
        connect to wallet pls :)
    {/if}
</div>
