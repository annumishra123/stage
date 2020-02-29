export function getOrderlinesForNCRDelivery(state = null, action) {
    switch (action.type) {
        case 'FETCH_ORDERLINES_FOR_NCR_DELIVERY':
            return action.payload;
            break;
    }
    return state;
}

export function getOrderlinesForOutstationDelivery(state = null, action) {
    switch (action.type) {
        case 'FETCH_ORDERLINES_FOR_OUTSTATION_DELIVERY':
            return action.payload;
            break;
    }
    return state;
}

export function getRefundConfirmedOrderlines(state = null, action) {
    switch (action.type) {
        case 'FETCH_REFUND_CONFIRMED_ORDERLINES':
            return action.payload;
            break;
    }
    return state;
}

export function getReceivedOrderlines(state = null, action) {
    switch (action.type) {
        case 'FETCH_RECEIVED_ORDERLINES':
            return action.payload;
            break;
    }
    return state;
}

export function getOrderLinesToBeReceived(state = null, action) {
    switch (action.type) {
        case 'FETCH_ORDERLINES_TO_BE_RECEIVED':
            return action.payload;
            break;
    }
    return state;
}

export function getQC3FailOrderlines(state = null, action) {
    switch (action.type) {
        case 'FETCH_QC3_FAIL_ORDERLINES':
            return action.payload;
            break;
    }
    return state;
}

export function getPickupOrderLines(state = null, action) {
    switch (action.type) {
        case 'FETCH_PICKEDUP_ORDERLINES':
            return action.payload;
            break;
    }
    return state;
}

export function getToBePickedOrderlines(state = null, action) {
    switch (action.type) {
        case 'FETCH_ORDERLINES_TO_BE_PICKED':
            return action.payload;
            break;
    }
    return state;
}

export function getOutForDeliveryOrderlines(state = null, action) {
    switch (action.type) {
        case 'FETCH_OUT_FOR_DELIVERY_ORDERLINES':
            return action.payload;
            break;
    }
    return state;
}