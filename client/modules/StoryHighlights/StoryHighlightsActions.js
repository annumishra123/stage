import clientConfig from '../../config';
import axios from 'axios';

export function fetchHighlights() {
    return function (dispatch) {
        let url = clientConfig.contentServiceURL + '/contentv1/Highlights';
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then((response) => {
            dispatch({
                type: 'FETCH_STORY_HIGHLIGHTS',
                payload: response.data
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function createHighlights(param, id) {
    return function (dispatch) {
        let formData = new FormData(),
            data = {
                title: param.highlightName,
                creationtime: Date.now(),
                createdby: param.createdby
            };
        if (id)
            data.id = id;
        if (param.contentListDirty)
            data.contents = param.storyContentsList.map(content => content.id);
        formData.append('data', JSON.stringify(data));
        if (param.imageFiles.length)
            formData.append('image', param.imageFiles[0]);
        return axios({
            url: `${clientConfig.contentServiceURL}/contentv1/Highlights`,
            timeout: 20000,
            method: 'post',
            responseType: 'json',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response.data);
            dispatch(fetchHighlights());
        }).catch((error) => {
            console.log(error);
            alert('Highlights creation failed');
        });
    }
}

export function getContents(filter) {
    filter = filter || {};
    return new Promise((accept, reject) => {
        axios({
            url: `${clientConfig.contentServiceURL}/contentv1/Contents?filter=${encodeURIComponent(JSON.stringify(filter))}`,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then((response) => {
            let contents = response.data;
            axios({
                url: `${clientConfig.contentServiceURL}/contentv1/Interactions/countAllMulti`,
                timeout: 20000,
                method: 'get',
                data: {
                    contentids: contents.map((con) => con.id)
                },
                responseType: 'json'
            }).then((response) => {
                let map = {},
                dummyCounts = {
                    like: 0,
                    view: 0,
                    comment: 0
                };
                response.data.forEach(function(entry){
                    if (!map[entry.contentid])
                        map[entry.contentid] = {};
                    map[entry.contentid][entry.type] = entry.count;
                });
                contents.forEach(function(entry){
                    let counts = map[entry.id] || dummyCounts;
                    entry.like = counts.like || 0;
                    entry.view = counts.view || 0;
                    entry.comment = counts.comment || 0;
                });
                accept(contents);
            }).catch(reject);
        }).catch(reject);
    });
}

export function getAllStoryContents(filter) {
    return function (dispatch) {
        getContents(filter).then((contents) => {
            dispatch({
                type: 'FETCH_STORY_CONTENTS',
                payload: contents
            })
        });
    }
}

export function deactivateHighlights(id) {
    return function (dispatch) {
        let url = `${clientConfig.contentServiceURL}/contentv1/Highlights/${id}`;
        return axios({
            url: url,
            timeout: 20000,
            method: 'delete',
            responseType: 'json'
        }).then((response) => {
            console.log(response.data);
            dispatch(fetchHighlights());
        }).catch((error) => {
            console.log(error);
            alert('Highlights fails to delete');
        });
    }
}