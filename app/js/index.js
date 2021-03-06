

const API_URL = "http://localhost:3000/api/posts";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
    getPosts();

    $('.profile-image').on('click',(e) => {
        if (e.ctrlKey && e.shiftKey) {
            deleteAll();
            console.log('Should delete');
        } else if (e.ctrlKey) {
            populate();
            console.log('should populate');
        }
    });
}

getPosts = () => {
    fetch(API_URL, {
        method: 'GET'
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        buildPosts(data);
    })
}

deleteAll= () => {
    $.ajax({
        url: `${API_URL}/cleanslate?cleanall=1`,
        method: 'POST'
    }).then(() => {
        console.log('All deleted!!!');
    });
}

populate = () => {
    $.ajax({
        url: `${API_URL}/populate`,
        method: 'POST'
    }).then(() => {
        console.log('All created!!!');
    });
}

buildPosts = (blogPosts) => {
    let blogPostsContent = "";
    for(blogPost of blogPosts){
        const postImage = API_BASE_URL + blogPost.post_image;
        const postLink = `/app/post.html?id=${blogPost.id}`;
        const postDate = new Date(parseInt(blogPost.added_date)).toDateString();
        blogPostsContent += `
            <a class="post-link" href="${postLink}">
                <div class="post">
                    <div class="post-image" style="background-image: url(${postImage})"></div>
                    <div class="post-content">
                        <div class="post-date">${postDate}</div>
                        <div class="post-title">
                            <h4>${blogPost.title}</h4>
                        </div>
                        <div class="post-text">
                            <p>${blogPost.content}</p>
                        </div>
                    </div>
                </div>
            </a>
        `
    }
    $(".blog-posts").html(blogPostsContent);
}