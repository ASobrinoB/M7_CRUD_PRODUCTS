const reducer = (globalState, action) => {
    switch (action.type) {
        case "OBTENER-PRODUCTOS":
            return {
                ...globalState,
                products: action.payload
            }
        default:
            return globalState
    }
}

export default reducer;