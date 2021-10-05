<script>
    import { makeContractStore, web3, selectedAccount, connected } from 'svelte-web3'
    import {getBalance, getName} from '../functions/feederFuncs'
    import {redusedAddress, copy} from '../functions/helperFuncs'
    let feederABI = [{"inputs":[{"internalType":"address[]","name":"_wallet","type":"address[]"},{"internalType":"uint256[]","name":"_allocation","type":"uint256[]"},{"internalType":"string","name":"_name","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"user","outputs":[{"internalType":"uint256","name":"allocation","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"enum Feeder.STATE","name":"state","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"users","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]

    export let address

    $: checkAccount = $selectedAccount || '0x0000000000000000000000000000000000000000'
    $: feeder = $connected ? new $web3.eth.Contract(feederABI, address) : ''
</script>

<div class="bg-purple flex flex-col justify-between border border-light-purple w-80 h-64 p-5">
    <div>
        <p class="text-white text-lg cursor-pointer" on:click={e => navigator.clipboard.writeText(address)}>{redusedAddress(address)}</p>
        <div class="text-light-purple">
            {#await getName(feeder)}
                Waiting...
            {:then value} 
                <span>{value}</span>
            {/await}
        </div>
    </div>
    <div>
        <div class="text-2xl text-white font-bold">
            {#await getBalance(feeder)}
                Waiting...
            {:then value} 
                ETH {value/10**18}
            {/await}
        </div>
    </div>
</div>