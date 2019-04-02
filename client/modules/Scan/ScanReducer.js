export function scannedLook(state = null, action) {
    switch (action.type) {
        case 'FETCH_SCANNED_SKU':
            return action.payload;
    }
    return state;
}