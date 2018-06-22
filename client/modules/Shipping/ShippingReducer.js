export function waybills(state = null, action) {
    switch (action.type) {
        case 'FETCH_WAYBILLS':
            return action.payload;
    }
    return state;
}