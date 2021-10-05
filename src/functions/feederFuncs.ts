export const getAddresses = async (contract, account) => {
    let feeder = await contract.methods.getFeeders(account).call()
    return feeder = feeder[0]
}

export const getUser = async (feeder, addr) => {
    return await feeder.methods.user(addr).call()
}

export const getName = async (feeder) => {
    return await feeder.methods.name().call()
}

export const getBalance = async (feeder) => {
    return await feeder.methods.getBalance().call()
}