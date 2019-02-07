export function rentOrders(state = null, action) {
    switch (action.type) {
        case 'FETCH_RENT_ORDERS':
            return action.payload;
            break;
    }
    return state;
}

export function rentOrderDetail(state = null, action) {
    switch (action.type) {
        case 'FETCH_RENT_ORDER_DETAIL':
            return action.payload;
            break;
    }
    return state;
}

export function rentProductDetail(state = null, action) {
    switch (action.type) {
        case 'FETCH_RENTAL_PRODUCT':
            return action.payload;
            break;
    }
    return state;
}

export function rentalPricing(state = null, action) {
    switch (action.type) {
        case 'FETCH_RENT_PRICING':
            return action.payload;
            break;
    }
    return state;
}

export function bookableStatus(state = null, action) {
    switch (action.type) {
        case 'FETCH_BOOKABLE_STATUS':
            return action.payload;
            break;
    }
    return state;
}

export function deliveryDates(state = null, action) {
    switch (action.type) {
        case 'FETCH_DELIVERY_DATES':
            return action.payload;
            break;
    }
    return state;
}

export function measurementStatus(state = null, action) {
    switch (action.type) {
        case 'FETCH_MEASUREMENT_STATUS':
            return action.payload;
            break;
    }
    return state;
}

export function allCoupons(state = null, action) {
    switch (action.type) {
        case 'FETCH_ALL_COUPONS':
            return action.payload;
            break;
    }
    return state;
}

export function refundLogs(state = null, action) {
    switch (action.type) {
        case 'FETCH_REFUND_LOGS':
            return action.payload;
            break;
    }
    return state;
}