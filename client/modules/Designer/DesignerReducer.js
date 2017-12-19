export function designerInventory(state = null, action) {
    switch (action.type) {
        case 'FETCH_DESIGNER_INVENTORY':
            return action.payload;
            break;
    }
    return state;
}

export function completedDesignerOrders(state = null, action) {
    switch (action.type) {
        case 'FETCH_COMPLETED_DESIGNER_ORDERS':
            return action.payload;
            break;
    }
    return state;
}

export function pendingDesignerOrders(state = null, action) {
    switch (action.type) {
        case 'FETCH_PENDING_DESIGNER_ORDERS':
            return action.payload;
            break;
    }
    return state;
}

export function cancelledDesignerOrders(state = null, action) {
    switch (action.type) {
        case 'FETCH_CANCELLED_DESIGNER_ORDERS':
            return action.payload;
            break;
    }
    return state;
}

export function revshares(state = null, action) {
    switch (action.type) {
        case 'FETCH_REVSHARES':
            return action.payload;
            break;
    }
    return state;
}

export function designerShare(state = null, action) {
    switch (action.type) {
        case 'FETCH_DESIGNER_SHARE':
            return action.payload;
            break;
    }
    return state;
}
