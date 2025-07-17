document.addEventListener('DOMContentLoaded', () => {
    const newsFeed = document.getElementById('news-feed');

    if (newsFeed && API_KEYS.news !== 'YOUR_NEWSAPI_KEY') {
        // Fetch news from NewsAPI
        fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEYS.news}`)
            .then(response => response.json())
            .then(data => {
                const articles = data.articles.slice(0, 5); // Display top 5 articles
                let newsHTML = '<h3>Latest News</h3>';
                articles.forEach(article => {
                    newsHTML += `
                        <div class="news-article">
                            <h4><a href="${article.url}" target="_blank">${article.title}</a></h4>
                            <p>${article.description}</p>
                        </div>
                    `;
                });
                newsFeed.innerHTML = newsHTML;
            })
            .catch(error => {
                newsFeed.innerHTML = `<p>Could not fetch news.</p>`;
            });
    } else if (newsFeed) {
        newsFeed.innerHTML = `<p>Please add your NewsAPI key.</p>`;
    }
});
