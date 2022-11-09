class ConsumerErrors{
    static errAccountNotInitialized: Error = new Error(
        "Account was not initialized"
    )
    static errQueryServiceNotInitialized: Error = new Error(
        "Query service was not initialized"
    )
}

export default ConsumerErrors