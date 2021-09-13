export function marketRentOrders(state = null, action) {
    switch (action.type) {
        case 'FETCH_MARKET_RENT_ORDERS':
            return action.payload;
            break;
    }
    return state;
}

export function marketDeliveryOrders(state = null, action) {
    switch (action.type) {
        case 'FETCH_DELIVERY_ORDERS':
            return action.payload;
            break;
    }
    return state;
}