export function designerInventory(state = null, action) {
    switch (action.type) {
        case 'FETCH_DESIGNER_INVENTORY':
            return action.payload;
            break;
    }
    return state;
}