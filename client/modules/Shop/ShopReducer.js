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

export function productDetail(state = null, action) {
    switch (action.type) {
        case 'FETCH_PRODUCT':
            return action.payload;
            break;
    }
    return state;
}

export function shoppingCart(state = null, action) {
    switch (action.type) {
        case 'FETCH_SHOPPING_CART':
            return action.payload;
            break;
    }
    return state;
}

export function shopPricing(state = null, action) {
    switch (action.type) {
        case 'FETCH_SHOP_PRICING':
            return action.payload;
            break;
    }
    return state;
}