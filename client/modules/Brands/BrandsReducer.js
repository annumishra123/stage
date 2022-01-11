export function brands(state = null, action) {
    switch (action.type) {
        case 'FETCH_BRANDS':
            return action.payload;
    }
    return state;
}

/*
export function entireSeller(state = null, action) {
    switch (action.type) {
        case 'FETCH_SELLERS':
            return action.payload;
            break;
    }
    return state;
}
*/