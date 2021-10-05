<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
</svelte:head>
<script>
    import WalletNav from '../components/walletNav.svelte'
    let abi = [{"inputs":[{"internalType":"address[]","name":"_wallet","type":"address[]"},{"internalType":"uint256[]","name":"_allocation","type":"uint256[]"},{"internalType":"string","name":"_name","type":"string"}],"name":"createFeeder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"feeders","outputs":[{"internalType":"uint256","name":"len","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"getFeeders","outputs":[{"components":[{"internalType":"address[]","name":"addresses","type":"address[]"},{"internalType":"uint256","name":"len","type":"uint256"}],"internalType":"struct FeederFactory.Birds","name":"","type":"tuple"}],"stateMutability":"view","type":"function"}]
    let feederABI = [{"inputs":[{"internalType":"address[]","name":"_wallet","type":"address[]"},{"internalType":"uint256[]","name":"_allocation","type":"uint256[]"},{"internalType":"string","name":"_name","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"user","outputs":[{"internalType":"uint256","name":"allocation","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"enum Feeder.STATE","name":"state","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"users","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]
    let factoryContract = '0xD55d157FFc003847Aa23E278BB9DB52A22092d2D'
    import { defaultChainStore, web3, selectedAccount, connected, chainData } from 'svelte-web3'
        
    $: checkAccount = $selectedAccount || '0x0000000000000000000000000000000000000000'
    $: balance = $connected ? $web3.eth.getBalance(checkAccount) : ''

    let feeder
    let feederName

    let userAllocation
    let userWithdrawn
    let walletBalance

    let fundsToWithdraw
    let withdrawing

    async function getFeeder() {
        if ($connected) {
            let feederFactory = new $web3.eth.Contract(abi, factoryContract);
            feeder = await feederFactory.methods.getFeeders(checkAccount).call()
            console.log(feeder[0])
            // let initFeeder = new $web3.eth.Contract(feederABI, feeder);
            // let fetchFeederUser = await initFeeder.methods.user(checkAccount).call()
            // userAllocation = fetchFeederUser.allocation
            // userWithdrawn = fetchFeederUser.withdrawn

            // walletBalance = initFeeder.methods.getBalance().call()
        }
    }
    async function withdrawFunds() {
        if ($connected && feeder) {
            withdrawing = 'Transaction in progress...'
            let fundsInWei = parseFloat(fundsToWithdraw) * 10**18
            let initFeeder = new $web3.eth.Contract(feederABI, feeder);
            console.log(fundsInWei)
            let fetchFeederWithdraw = await initFeeder.methods.withdraw(fundsInWei.toString()).send({"from": checkAccount})
            .then(res => {
                withdrawing = 'Success'
                console.log(res)
            })
        }
    }
    async function createFeeder() {
        if ($connected) {
            contractCreationProgress = 'Creating wallet...'
            let feederFactory = new $web3.eth.Contract(abi, factoryContract);
            let newFeeder = await feederFactory.methods.createFeeder(
                contract.addresses,
                contract.allocations,
                contract.name,
            ).send({"from": checkAccount})
            .then(res => {
                contractCreationProgress = `Created wallet with the name ${contract.name}`
                console.log(res)
            })
        }
    }

    $: data = {
        balance: balance,
        account: checkAccount,
    }

    let address
    let allocation
    let contract = {
        addresses: [],
        allocations: [],
        name: '',
    }
    const pushAddress = () => {
        contract.addresses = [...contract.addresses, address]
        address = ''
    }
    const pushAllocation = () => {
        let num = parseInt(allocation)
        contract.allocations = [...contract.allocations, num]
        allocation = ''
    }

    let contractCreationProgress = ''
</script>
<WalletNav data={data}></WalletNav>

<button on:click={defaultChainStore.setBrowserProvider()}>Connect wallet</button>

<div>
    <h1 class="text-center text-6xl mt-10">Create wallet</h1>
    <div>
        <input bind:value={contract.name} type="text" class="w-96 bg-deep-purple border-2 border-green">
        <span>Name</span>
    </div>
    <div>
        <input bind:value={address} type="text" class="w-96 bg-deep-purple border-2 border-green">
        <button on:click={pushAddress}>add address</button>
    </div>
    <div>
        <input bind:value={allocation} type="text" class="w-96 bg-deep-purple border-2 border-green">
        <button on:click={pushAllocation}>add allocation</button>
    </div>
    <div>
        addresses: {contract.addresses}
    </div>
    <div>
        allocations {contract.allocations}
    </div>
    <div>
        Name {contract.name}
    </div>

    <button on:click={createFeeder} class="px-5 py-3 border-2 border-green mt-5">Create Feeder</button>

    {#if contractCreationProgress}
        <div class="text-xl mt-10">{contractCreationProgress}</div>
    {/if}
</div>

<div class="mt-10">
    <h1 class="text-center text-6xl mt-10">Manage wallet</h1>

    <div>
        <input bind:value={feederName} type="text" class="w-96 bg-deep-purple border-2 border-green">
        <button on:click={getFeeder}>Find Feeder</button>
    </div>

    <div class="mt-5">
        {#if feeder}
            Wallet address: {feeder}
        {/if}
    </div>

    <div>Total wallet balance: 
        {#if walletBalance}
            {#await walletBalance}
               waiting for balance... 
            {:then value} 
                {value / 10**18}
            {/await}
        {/if}
    </div>
    <div>Your allocation is 
        {#if userAllocation}
            {#await userAllocation}
               <span>waiting for allocation</span>
            {:then value} 
                <span>{value}%</span>
            {/await}
        {/if}
    </div>
    <div>You already withdrawn: 
        {#if userWithdrawn}
            {#await userWithdrawn}
               <span>waiting for withdrawn data</span>
            {:then value} 
                <span>{value / 10**18}</span>
            {/await}
        {/if}
    </div>

    <button on:click={withdrawFunds} class="px-5 py-3 border-2 border-green mt-5">Withdraw</button>
    <input bind:value={fundsToWithdraw} type="text" class="w-20 bg-deep-purple border-2 border-green">
    <span>ETH</span>

    {#if withdrawing}
        <div>{withdrawing}</div>
    {/if}
</div>




