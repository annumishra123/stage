export function allReturnOrderLineForApproval(state = null, action) {
    switch (action.type) {
        case 'FETCH_ALL_RETURN_ORDERLINE':
            return action.payload;
    }
    return state;
}