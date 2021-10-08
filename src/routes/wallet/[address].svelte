<script>
    import { web3, selectedAccount, connected } from 'svelte-web3'
    import {page} from "$app/stores"
    import { onMount } from 'svelte';
    let feederABI = [{"inputs":[{"internalType":"address[]","name":"_wallet","type":"address[]"},{"internalType":"uint256[]","name":"_allocation","type":"uint256[]"},{"internalType":"string","name":"_name","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"user","outputs":[{"internalType":"uint256","name":"allocation","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"enum Feeder.STATE","name":"state","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"users","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]

    $: balance = $connected ? $web3.eth.getBalance($page.params.address) : ''
    const getEtherscanHistory = async () => {
        const res = await fetch(`https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${$page.params.address}&startblock=0&endblock=9999999999&page=1&offset=10&sort=desc&apikey=W3AY7KRPVXM9S5PBZ5DWMIU8QAWFWV57GT`)
        return await res.json()
    }
    const retrieveOrSave = async () => {
        if ($connected) {
            const currentBalance = await $web3.eth.getBalance($page.params.address)
            const hist = await getEtherscanHistory()
            console.log("the balance: ", currentBalance)
            console.log("the hist: ", hist.result)
            // OR JUST USE LOCALSTORAGE
        }
    }
    onMount(() => {
        retrieveOrSave()
    })

</script>

<div>
    <div>
        <!-- {todos[0][1]} -->
        <!-- {#each todos as [key, todo]}
            {todo}
        {/each} -->
    </div>
    <div>feeder balance is 
        {#await balance then value}
            {value / 10**18}
        {/await}
    </div>
    <!-- <div class="p-10 mt-20">
        {#await txHistory()}
            waiting for etherscan        
        {:then tnxs} 
            {#each tnxs.result as tx (tx.blockHash)}
               <div>the value in WEI is {tx.value}</div>
            {/each}
        {/await}
    </div> -->
</div>