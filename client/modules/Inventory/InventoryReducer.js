export function shopCatalog(state = null, action) {
    switch (action.type) {
        case 'FETCH_SHOP_CATALOG':
            return action.payload;
            break;
    }
    return state;
}

export function rentCatalog(state = null, action) {
    switch (action.type) {
        case 'FETCH_RENT_CATALOG':
            return action.payload;
            break;
    }
    return state;
}

export function accessoryCatalog(state = null, action) {
    switch (action.type) {
        case 'FETCH_ACCESSORY_CATALOG':
            return action.payload;
            break;
    }
    return state;
}