import clientConfig from '../../config';
import axios from 'axios';

export function fetchHighlights() {
    return function (dispatch) {
        let url = clientConfig.contentServiceURL + '/contentv1/StoryHighlights';
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

export function createHighlights(param) {
    return function (dispatch) {
        let cloudinaryUrl = `${clientConfig.contentServiceURL}/contentv1/StoryHighlights/upload/cloudinary`,
            formData = new FormData();
        formData.append('image', param.imageFiles[0]);
        return axios({
            url: cloudinaryUrl,
            timeout: 20000,
            method: 'post',
            responseType: 'json',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response);
            let imageUrl = response.data.length != 0 && response.data.map(i => Object.values(i)).toString() || "";
            let url = `${clientConfig.contentServiceURL}/contentv1/StoryHighlights`,
                highlightsRawData = {
                    title: param.highlightName,
                    image: imageUrl,
                    contentlinks: param.storyContentsList,
                    creationtime: Date.now(),
                    createdby: param.createdby
                }
            return axios({
                url: url,
                timeout: 20000,
                method: 'post',
                responseType: 'json',
                data: highlightsRawData,
            }).then((response) => {
                console.log(response.data);
                dispatch(fetchHighlights());
            }).catch((error) => {
                console.log(error);
                alert('Highlights creation failed');
            });
        }).catch((error) => {
            console.log(error);
            alert('Image Upload Failed');
        });
    }
}

export function getAllStoryContents() {
    return function (dispatch) {
        let url = `${clientConfig.contentServiceURL}/contentv1/StoryContents`;
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then(function (response) {
            dispatch({
                type: 'FETCH_STORY_CONTENTS',
                payload: response.data
            })
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export function deactivateHighlights(id) {
    return function (dispatch) {
        let url = `${clientConfig.contentServiceURL}/contentv1/StoryContents/${id}/replace`,
            highlightsRawData = {
                status: false
            }
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            responseType: 'json',
            data: highlightsRawData,
        }).then((response) => {
            console.log(response.data);
            dispatch(fetchHighlights());
        }).catch((error) => {
            console.log(error);
            alert('Highlights fails to disable');
        });
    }
}