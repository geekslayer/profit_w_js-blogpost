const API_URL = "http://localhost:3000/api/posts";

const submitNewPost = () => {
    let input = $('input[type="file"]');
    let title = $("#form-post-title").val();
    let content = $("#form-post-content").val();
    let data = new FormData();

    console.log(input);

    data.append('post-image', input[0].files[0]);
    data.append('title', title );
    data.append('content', content);

    fetch(API_URL, {
        method: 'POST',
        body: data
    }).then(() => {
        window.location.href = "index.html";
    });
}