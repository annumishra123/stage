export function orders(state = null, action) {
    switch (action.type) {
        case 'FETCH_SHOP_ORDERS':
            return action.payload;
            break;
    }
    return state;
}

export function orderDetail(state = null, action) {
    switch (action.type) {
        case 'FETCH_SHOP_ORDER_DETAIL':
            return action.payload;
            break;
    }
    return state;
}