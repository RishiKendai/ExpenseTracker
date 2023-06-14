import axios from 'axios';
import React, { useContext } from 'react';
import { NODE_PATH } from './APIRoute';
import { AuthContextType } from '../store/authContext';


// POST 
const post = async (postData: Object, apiPath: string, header: Object) => {
    try {
        console.log(`${NODE_PATH}/${apiPath}`)
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