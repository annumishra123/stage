export function spotlightInfluencers(state = null, action) {
    switch (action.type) {
        case 'FETCH_SPOTLIGHT_INFLUENCERS':
            return action.payload;
    }
    return state;
}