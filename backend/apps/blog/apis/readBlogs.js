/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed LICENSE file.
 */

// Custom modules
const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/blog/apis/lib/constants`);
const utils = require(`${API_CONSTANTS.LIB_PATH}/utils`);
const db = require(`${API_CONSTANTS.LIB_PATH}/db`);

exports.doService = async jsonReq => {
    // Validate API request and check mandatory payload required
    if (!validateRequest(jsonReq)) return API_CONSTANTS.API_INSUFFICIENT_PARAMS;

    try {
        const data = await readBlogs(jsonReq);
        if (!data) return API_CONSTANTS.API_RESPONSE_FALSE;
        return { result: true, results: { data } };
    } catch (error) {
        console.error(error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}

// function which calls the simpleSelect function of db.js
// to perform the select operation on database, promise is handled in db.js
const readBlogs= async jsonReq => {
    try{
        const query = 'select * from blogs';
        const data = await db.simpleSelect(query);
        if(!data) return false;
        return data;
    } catch(error){
        throw error;
    }
}

const validateRequest = jsonReq => (jsonReq);