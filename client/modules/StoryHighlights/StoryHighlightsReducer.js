export function entireHighlights(state = null, action) {
    switch (action.type) {
        case 'FETCH_STORY_HIGHLIGHTS':
            return action.payload;
    }
    return state;
}

export function entireStoryContents(state = null, action) {
    switch (action.type) {
        case 'FETCH_STORY_CONTENTS':
            return action.payload;
            break;
    }
    return state;
}