export function rentDeliveryOrders(state = null, action) {
    switch (action.type) {
        case 'FETCH_RENT_DELIVERY_ORDERS':
            return action.payload;
            break;
    }
    return state;
}

export function shopDeliveryOrders(state = null, action) {
    switch (action.type) {
        case 'FETCH_SHOP_DELIVERY_ORDERS':
            return action.payload;
            break;
    }
    return state;
}