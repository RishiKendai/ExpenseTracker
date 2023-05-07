import axios from 'axios';

import { NODE_PATH } from './APIRoute';

// POST 
const post = async (postData: Object, apiPath: string, header: Object) => {
    try {
        const response = await axios.post(`${NODE_PATH}/${apiPath}`, postData, header);
        return response.data;
    } catch (err) {
        console.log(`ERR: ${err}`);
    }
};


export {
    post
};
// rn6IzoNG7q2TMEUsFoRrgI6n