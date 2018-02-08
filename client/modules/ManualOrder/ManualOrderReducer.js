export function revShareOrderLine(state = null, action) {
    switch (action.type) {
        case 'FETCH_REVSHARE_ORDERLINE':
            return action.payload;
            break;
    }
    return state;
}