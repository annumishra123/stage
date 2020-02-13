export function instagramFeeds(state = null, action) {
    switch (action.type) {
        case 'FETCH_INSTAGRAM_FEEDS':
            return action.payload;
            break;
    }
    return state;
}

export function allStores(state = null, action) {
    switch (action.type) {
        case 'FETCH_ALL_STORES':
            return action.payload;
            break;
    }
    return state;
}