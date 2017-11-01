export default function customerDetail(state = {}, action) {
    switch (action.type) {
        case 'FETCH_CUSTOMER_DETAIL':
            return action.payload;
            break;
    }
    return state;
}