export function shopCatalog(state = null, action) {
    switch (action.type) {
        case 'FETCH_SHOP_CATALOG':
            return action.payload;
    }
    return state;
}

export function rentCatalog(state = null, action) {
    switch (action.type) {
        case 'FETCH_RENT_CATALOG':
            return action.payload;
    }
    return state;
}

export function accessoryCatalog(state = null, action) {
    switch (action.type) {
        case 'FETCH_ACCESSORY_CATALOG':
            return action.payload;
    }
    return state;
}

export function shopStock(state = null, action) {
    switch (action.type) {
        case 'FETCH_SHOP_STOCK':
            return action.payload;
    }
    return state;
}