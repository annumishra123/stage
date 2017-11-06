export function customerDetail(state = null, action) {
    switch (action.type) {
        case 'FETCH_CUSTOMER_DETAIL':
            return action.payload;
            break;
    }
    return state;
}

export function selectedAddress(state = null, action) {
    switch (action.type) {
        case 'SELECT_ADDRESS':
            return action.payload;
            break;
    }
    return state;
}