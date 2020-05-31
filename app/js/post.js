const API_URL = "http://localhost:3000/api/posts/";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
    getPost();
}

const getPostIdParam = () => {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}

getPost = () => {
    let url = `${API_URL}${getPostIdParam()}`
    fetch(url, {
        method: 'GET'
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        buildPost(data);
    })
}

const buildPost = (data) => {
    let postDate = new Date(parseInt(data.added_date)).toDateString();
    let postImage = API_BASE_URL + data.post_image;
    $("header").css('backgroundImage',`url(${postImage})`);
    $("#individual-post-title").text(data.title);
    $("#individual-post-date").text(`Published on ${postDate}`);
    $("#individual-post-content").text(data.content);
}

