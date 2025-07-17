document.addEventListener('DOMContentLoaded', () => {
    const blogPostsContainer = document.getElementById('blog-posts');
    const paginationContainer = document.getElementById('pagination');
    let posts = [];
    let currentPage = 1;
    const postsPerPage = 5;

    fetch('js/posts.json')
        .then(response => response.json())
        .then(data => {
            posts = data;
            displayPosts();
            setupPagination();
        });

    function displayPosts() {
        blogPostsContainer.innerHTML = '';
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const paginatedPosts = posts.slice(startIndex, endIndex);

        paginatedPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('card');
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <small>By ${post.author} on ${post.date}</small>
            `;
            blogPostsContainer.appendChild(postElement);
        });
    }

    function setupPagination() {
        paginationContainer.innerHTML = '';
        const pageCount = Math.ceil(posts.length / postsPerPage);
        for (let i = 1; i <= pageCount; i++) {
            const button = document.createElement('button');
            button.innerText = i;
            button.addEventListener('click', () => {
                currentPage = i;
                displayPosts();
            });
            paginationContainer.appendChild(button);
        }
    }
});
