export function scannedLook(state = null, action) {
    switch (action.type) {
        case 'FETCH_SCANNED_SKU':
            return action.payload;
    }
    return state;
}

export function scanLogs(state = null, action) {
    switch (action.type) {
        case 'FETCH_SCAN_LOGS':
            return action.payload;
            break;
    }
    return state;
}

export function locationLogs(state = null, action) {
    switch (action.type) {
        case 'FETCH_LOCATION_LOGS':
            return action.payload;
            break;
    }
    return state;
}