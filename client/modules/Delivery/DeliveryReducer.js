export function deliveryOrders(state = null, action) {
    switch (action.type) {
        case 'FETCH_DELIVERY_ORDERS':
            return action.payload;
            break;
    }
    return state;
}