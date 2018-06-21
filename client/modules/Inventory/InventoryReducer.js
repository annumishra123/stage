export function shopCatalog(state = null, action) {
    switch (action.type) {
        case 'FETCH_SHOP_CATALOG':
            return action.payload;
    }
    return state;
}

export function shopProduct(state = null, action) {
    switch (action.type) {
        case 'FETCH_SHOP_PRODUCT':
            return action.payload;
    }
    return state;
}

export function updateProduct(state = null, action) {
    switch (action.type) {
        case 'FETCH_SHOP_PRODUCT':
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

export function rentProduct(state = null, action) {
    switch (action.type) {
        case 'FETCH_RENT_PRODUCT':
            return action.payload;
    }
    return state;
}

export function updateRentProduct(state = null, action) {
    switch (action.type) {
        case 'FETCH_RENT_PRODUCT':
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

export function accessory(state = null, action) {
    switch (action.type) {
        case 'FETCH_ACCESSORY':
            return action.payload;
    }
    return state;
}

export function updateAccessory(state = null, action) {
    switch (action.type) {
        case 'FETCH_ACCESSORY':
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

export function uploadLogs(state = null, action) {
    switch (action.type) {
        case 'FETCH_UPLOAD_LOGS':
            return action.payload;
    }
    return state;
}