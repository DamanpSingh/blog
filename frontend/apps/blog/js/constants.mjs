/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
const FRONTEND = "http://localhost:8080";
const BACKEND = "http://localhost:9090";
const APP_NAME = "blog";
const APP_PATH = `${FRONTEND}/apps/${APP_NAME}`;

export const APP_CONSTANTS = {
    FRONTEND, BACKEND, APP_PATH, APP_NAME,
    SHOW_HTML: APP_PATH + "/show.html",
    ADDBLOG_HTML: APP_PATH + "/addBlog.html",
    
    SESSION_NOTE_ID: "com_monkshu_ts",

    API_READBLOGS: `${BACKEND}/apis/read-blogs`,
    API_ADDBLOG: `${BACKEND}/apis/insert-blog`,
    API_LIKEBLOG: `${BACKEND}/apis/like-blog`,
    API_DELETEBLOG: `${BACKEND}/apis/delete-blog`,
    
    USERID: "id",
    USER_ROLE: "user",
    GUEST_ROLE: "guest",
    PERMISSIONS_MAP: {
        user: [APP_PATH + "/show.html", $$.MONKSHU_CONSTANTS.ERROR_THTML],
        guest: [APP_PATH + "/addBlog.html", APP_PATH + "/show.html", $$.MONKSHU_CONSTANTS.ERROR_THTML]
   },
    API_KEYS: { "*": "uiTmv5YBOZMqdTb0gekD40PnoxtB9Q0k" },
    KEY_HEADER: "X-API-Key"
}