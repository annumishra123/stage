export function allRawMaterials(state = null, action) {
    switch (action.type) {
        case 'FETCH_ALL_MATERIALS':
            return action.payload;
            break;
    }
    return state;
}

export function allOutfits(state = null, action) {
    switch (action.type) {
        case 'FETCH_ALL_OUTFITS':
            return action.payload;
            break;
    }
    return state;
}
