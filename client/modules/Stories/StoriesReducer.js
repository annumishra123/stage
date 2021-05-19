export function stories(state = null, action) {
    switch (action.type) {
        case 'FETCH_STORIES':
            return action.payload;
    }
    return state;
}

export function entireStore(state = null, action) {
    switch (action.type) {
        case 'FETCH_STORES':
            return action.payload;
            break;
    }
    return state;
}

export function entireSeller(state = null, action) {
    switch (action.type) {
        case 'FETCH_SELLERS':
            return action.payload;
            break;
    }
    return state;
}