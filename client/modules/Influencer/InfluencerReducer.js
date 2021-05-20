export function spotlightInfluencers(state = null, action) {
    switch (action.type) {
        case 'FETCH_SPOTLIGHT_INFLUENCERS':
            return action.payload;
    }
    return state;
}

export function allInfluencers(state = null, action) {
    switch (action.type) {
        case 'FETCH_ALL_INFLUENCERS':
            return action.payload;
    }
    return state;
}

export function influencersCarousel(state = null, action) {
    switch (action.type) {
        case 'FETCH_INFLUENCERS_CAROUSEL':
            return action.payload;
    }
    return state;
}