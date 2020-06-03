# CRUD Application built with Monkshu (Node Js)

Sytem Overview:
Frontend:
The Index page load show.html page
show.html page load a component show-blogs, show-blog component is responsible for:
  1. Calling backend api to get blogs data
  2. Rendering the blogs dynamically
  3. Adding event listners and event handlers to each blog element
 
 Event listners and handlers:
 show-blog component have dynamically rendered elements which represents blogs and each blog instance have Like and Delete button
 1. Like-Blog : This event handler calls a api which updates the like count for the respective blog instance in database.
 2. Delete-Blog : This event handler calls a api which deletes the respective blog instance from the database.
 
 addBlog.html
 This page is responsible for adding a new blog instance to the database, it allows the user to input the title and content
 of a blog post and insert the blog body into database.
 
 Backend:
 It consists of 4 apis:
  1. readBlog: It fetches the blog data from database and give response to the calling entity.
  2. likeBlog: It takes the id of existing blog as request data(body) and update the like count for particular blog instance.
  3. insertBlog: It take the blog body as a request data(body) and create a new blog instance and set its body with the requested data.
  4. deleteBlog: It takes the id of existing blog as request data(body) and delete the particular blog instance.
  
  
