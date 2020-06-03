/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import { router } from "/framework/js/router.mjs";
import { monkshu_component } from "/framework/js/monkshu_component.mjs";
import { apimanager as apiman } from "/framework/js/apimanager.mjs";

const insertBlog = async () => {
// Geting the blog data
	const apiParams = {
		'title' : add_blog.shadowRoot.querySelector('#title').value,
		'content': add_blog.shadowRoot.querySelector('#content').value
	}
	let resp = await apiman.rest(APP_CONSTANTS.API_ADDBLOG, "POST", apiParams, true);
    if(!resp) console.log("error");
    console.log(resp);
}

function register() {
    // convert this all into a WebComponent so we can use it
    monkshu_component.register("add-blog", `${APP_CONSTANTS.APP_PATH}/components/add-blog/add-blog.html`, add_blog);
}

const trueWebComponentMode = true;	
// making this false renders the component without using Shadow DOM

export const add_blog = { trueWebComponentMode, register, insertBlog }