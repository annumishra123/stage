export function influencers(state = null, action) {
    switch (action.type) {
        case 'FETCH_INFLUENCERS':
            return action.payload;
    }
    return state;
}