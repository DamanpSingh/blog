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
        const deletedBlog = await deleteBlog(jsonReq);
        if (!deletedBlog) return API_CONSTANTS.API_RESPONSE_FALSE;
        return { result: true, results: { deletedBlog } };
    } catch (error) {
        console.error(error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}

// function which calls the simpleDelete function of db.js
// to perform the delete operation on database, promise is handled in db.js
const deleteBlog= async jsonReq => {
    const query = 'DELETE FROM blogs WHERE id = ?';
    const queryParam=[jsonReq.id];    
    try{
        const data = await db.simpleDelete(query, queryParam);
        if(!data) return false;
        return data;
    } catch(error){
        throw error;
    }
}

const validateRequest = jsonReq => (jsonReq);
