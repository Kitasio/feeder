<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
</svelte:head>
<script>
    import WalletNav from '../components/walletNav.svelte'
    let abi = [{"inputs":[{"internalType":"address[]","name":"_wallet","type":"address[]"},{"internalType":"uint256[]","name":"_allocation","type":"uint256[]"},{"internalType":"string","name":"_name","type":"string"}],"name":"createFeeder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"feeders","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]
    import { defaultChainStore, web3, selectedAccount, connected, chainData } from 'svelte-web3'

        
    $: checkAccount = $selectedAccount || '0x0000000000000000000000000000000000000000'
    $: balance = $connected ? $web3.eth.getBalance(checkAccount) : ''

    async function getFeeder(feederName) {
        if ($connected) {
            let feederFactory = new $web3.eth.Contract(abi, '0x30e0a7c5c238023BCDdbf3E2A86E4eD494C953EA');
            let feeder = await feederFactory.methods.feeders(feederName).call()
            console.log(feeder)
        }
    }
    async function createFeeder() {
        if ($connected) {
            let feederFactory = new $web3.eth.Contract(abi, '0x30e0a7c5c238023BCDdbf3E2A86E4eD494C953EA');
            let newFeeder = await feederFactory.methods.createFeeder(
                [
                    '0xf839B1cb80F509d98FFd7600a3aDB8e87083B41d',
                    '0xCA796DB21047eed4d87169Dbe2B4C783c5f830e4',
                ],
                [40,60],
                'Birds',
            ).send({"from": checkAccount})
            .then(contract => {
                console.log(contract)
            })
            console.log('loggin newFeeder', newFeeder)
        }
    }

    let feederName
</script>
<WalletNav data={balance}></WalletNav>

<button on:click={defaultChainStore.setBrowserProvider()}>Connect wallet</button>

{#if $connected}
    {checkAccount} Balance on {$chainData.name}:
    {#await balance}
        <span>waiting...</span>
    {:then value}
        <span>{(value / 10**18).toFixed(2)}</span>
        <button on:click={getFeeder(feederName)}>get feeder</button>
    {/await} {$chainData.nativeCurrency?.symbol} 
{/if}

<input type="text" bind:value={feederName}>
{#if feederName}
    {feederName}
{/if}
