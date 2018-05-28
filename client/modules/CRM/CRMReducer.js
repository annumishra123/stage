export function tasks(state = null, action) {
    switch (action.type) {
        case 'FETCH_TASKS':
            return action.payload;
    }
    return state;
}

export function contexts(state = null, action) {
    switch (action.type) {
        case 'FETCH_ALL_CONTEXTS':
            return action.payload;
    }
    return state;
}

export function dispositions(state = null, action) {
    switch (action.type) {
        case 'FETCH_ALL_DISPOSITIONS':
            return action.payload;
    }
    return state;
}

export function taskDetail(state = null, action) {
    switch (action.type) {
        case 'FETCH_TASK_DETAIL':
            return action.payload;
    }
    return state;
}