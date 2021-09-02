export function marketRentOrders(state = null, action) {
    switch (action.type) {
        case 'FETCH_MARKET_RENT_ORDERS':
            return action.payload;
            break;
    }
    return state;
}