export function allOrderLine(state = null, action) {
    switch (action.type) {
        case 'FETCH_ALL_ORDERLINE':
            return action.payload;
    }
    return state;
}

export function allReturnOrderLine(state = null, action) {
    switch (action.type) {
        case 'FETCH_ALL_RETURN_ORDERLINE':
            return action.payload;
    }
    return state;
}