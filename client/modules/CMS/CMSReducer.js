export function instagramFeeds(state = null, action) {
    switch (action.type) {
        case 'FETCH_INSTAGRAM_FEEDS':
            return action.payload;
            break;
    }
    return state;
}