import clientConfig from '../../config';
import axios from 'axios';

export function getDesignerInventory(owner) {
    return function(dispatch) {
        let loopbackFilter = {
            where: {
                designer: owner
            }
        };
        let url = clientConfig.targetURL + '/catalogv2/catalogv2/Looks?filter=' + JSON.stringify(loopbackFilter);
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then((response) => {
            dispatch({
                type: 'FETCH_DESIGNER_INVENTORY',
                payload: response.data
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}