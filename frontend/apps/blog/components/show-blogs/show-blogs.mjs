/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import { router } from "/framework/js/router.mjs";
import { monkshu_component } from "/framework/js/monkshu_component.mjs";
import { apimanager as apiman } from "/framework/js/apimanager.mjs";

//This function calls the readBlogs api and render the data on browser
//It adds buttons with data like delete-blog and like-blog
//It also adds event-listners with the buttons which are responsible for
//calling the event-Handlers
const getBlogs = async () => {
    try{
        //fetching data from database using the backend api(readBlog)
        let resp = await apiman.rest(APP_CONSTANTS.API_READBLOGS, "POST", {}, false, true);
        if (!resp || !resp.results){
            console.log("resp error");
            return;
        }
        // blogs stores the data of all blogs given by backend api
        const blogs=resp.results.data;

        // blogList element is a wraper elemet for all blogs
        const blogList = show_blogs.shadowRoot.querySelector("#blogList");
        
        // looping through each blog for rendering them on browser
        for( let blog of blogs){
            
            // creating elements to hold blog data 
            let blogWraper = document.createElement("div");   
            let blogTitle = document.createElement("h3");
            let blogContent = document.createElement("p");
            let blogLikes = document.createElement("button");
            let blogDelete = document.createElement("button");

            // Inserting text to each element of a blog
            blogTitle.innerHTML = blog.title;
            blogContent.innerHTML = blog.content;
            blogLikes.innerHTML = `${blog.likes} Likes`;
            blogDelete.innerHTML = "Delete Blogs";

            // adding id to the blogLike element
            let likeId = document.createAttribute("id");
            likeId.value = blog.id;
            blogLikes.setAttributeNode(likeId);

            // adding id to the blogDelete element
            let deleteId = document.createAttribute("id");
            deleteId.value = blog.id;
            blogDelete.setAttributeNode(deleteId);

            //setting value of blogLike element 
            let likeValue = document.createAttribute("value");
            likeValue.value = blog.likes;
            blogLikes.setAttributeNode(likeValue);     

            // adding like handler
            blogLikes.addEventListener("click", likeBlogHandler);

            // adding delete handler
            blogDelete.addEventListener("click", deleteBlogHandler);
                   

            // appending the blog content into wraper element
            blogWraper.appendChild(blogTitle);
            blogWraper.appendChild(blogContent);
            blogWraper.appendChild(blogLikes);
            blogWraper.appendChild(blogDelete);

            //appending the blog wrapper to the blog list
            blogList.appendChild(blogWraper);

            // adding class to the wraper element
            let cssClass = document.createAttribute("class");
            cssClass.value = "wraper";
            blogWraper.setAttributeNode(cssClass);    
        }  
    } catch(error){
        throw error;
    }
}

// event handler which load the add-blog page
const addBlog = ()=>{
    router.loadPage(APP_CONSTANTS.ADDBLOG_HTML);    
}

// event handler for like-blog button
const likeBlogHandler = async ele =>{
    
    const apiParams={
        "id" : ele.target.id
    }   

    //Updating the likes in database
    try{
        const resp = await apiman.rest(APP_CONSTANTS.API_LIKEBLOG, "POST", apiParams, true);
        
        const currBlog=show_blogs.shadowRoot.querySelector(`#\\3${apiParams.id}`); 
        if(resp){
            //updating the likes on current window
            currBlog.value = parseInt(currBlog.value, 10) + 1;
            currBlog.innerHTML = `${currBlog.value} Likes`;
        }   
    }catch(error){
        console.log(error);
    }
}

// event handler for delete-blog button
const deleteBlogHandler = async ele =>{
    const apiParams={
        "id" : ele.target.id
    }   

    //delete blog from database
    let resp = await apiman.rest(APP_CONSTANTS.API_DELETEBLOG, "POST", apiParams, true);
    if(!resp){
        router.reload();
    }
    
}
function register() {
    // convert this all into a WebComponent so we can use it
    monkshu_component.register("show-blogs", `${APP_CONSTANTS.APP_PATH}/components/show-blogs/show-blogs.html`, show_blogs);
}

const trueWebComponentMode = true;	// making this false renders the component without using Shadow DOM

export const show_blogs = { trueWebComponentMode, register, getBlogs, addBlog, likeBlogHandler, deleteBlogHandler }