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
        const addedBlog = await addBlog(jsonReq);
        if (!addedBlog) return API_CONSTANTS.API_RESPONSE_FALSE;
        return { result: true, results: {addedBlog} };
    } catch (error) {
        console.error(error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}

// function which calls the simpleInsert function of db.js
// to perform the insert operation on database, promise is handled in db.js
const addBlog= async jsonReq => {
    const queryParams = {
    	"title" : jsonReq.title,
    	"content": jsonReq.content,
    	"likes" : 0
    };
    try {
        const data = await db.simpleInsert("blogs", queryParams);
        if(!data) return false;
        return data;
    } catch (error) {
        throw error;
    }
}

const validateRequest = jsonReq => (jsonReq);
