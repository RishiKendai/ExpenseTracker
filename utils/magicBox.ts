import axios from 'axios';

import { NODE_PATH } from './APIRoute';

// POST 
const post = async (postData: Object, apiPath: string) => {
    try {
        const response = await axios.post(`${NODE_PATH}/${apiPath}`, postData);
        return response.data;
    } catch (err) {
        console.log(`ERR: ${err}`);
    }
};


export {
    post
};