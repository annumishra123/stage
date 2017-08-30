export default function(state = null, action) {
    switch (action.type) {
        case 'FETCH_SHOP_ORDERS':
            return action.payload;
            break;
    }
    return state;
}