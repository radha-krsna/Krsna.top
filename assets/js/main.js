document.addEventListener('DOMContentLoaded', () => {
    // Theme switcher
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;

    themeSwitcher.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        // Save theme preference
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark-mode');
        } else {
            localStorage.removeItem('theme');
        }
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
    }

    // Auto-update footer year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.style.display = 'none';
    });

    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Blog posts
    const blogPostsContainer = document.getElementById('blog-posts');
    const paginationContainer = document.getElementById('pagination');
    let posts = [];
    let currentPage = 1;
    const postsPerPage = 5;

    if (blogPostsContainer) {
        fetch('assets/js/posts.json')
            .then(response => response.json())
            .then(data => {
                posts = data;
                displayPosts();
                setupPagination();
            });
    }

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

    // Chatbot
    const chatbotToggler = document.getElementById('chatbot-toggler');
    const chatbot = document.getElementById('chatbot');
    const chatbotForm = document.getElementById('chatbot-form');
    const chatbotMessages = document.getElementById('chatbot-messages');

    if (chatbotToggler) {
        chatbotToggler.addEventListener('click', () => {
            chatbot.classList.toggle('open');
        });
    }

    if (chatbotForm) {
        chatbotForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const userInput = document.getElementById('chatbot-input').value;
            addMessage(userInput, 'user');
            document.getElementById('chatbot-input').value = '';
            addMessage('...', 'bot'); // Loading indicator

            try {
                const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + API_KEYS.gemini, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "contents": [{
                            "parts": [{
                                "text": userInput
                            }]
                        }]
                    })
                });

                const data = await response.json();
                const botResponse = data.candidates[0].content.parts[0].text;
                updateLastMessage(botResponse);
            } catch (error) {
                updateLastMessage('Sorry, I am having trouble connecting to the AI. Please try again later.');
            }
        });
    }

    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);

        if (sender === 'bot' && message === '...') {
            messageElement.classList.add('typing-indicator');
            messageElement.innerHTML = '<span></span><span></span><span></span>';
        } else {
            messageElement.textContent = message;
        }

        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function updateLastMessage(message) {
        const lastMessage = chatbotMessages.querySelector('.bot-message:last-child');
        lastMessage.classList.remove('typing-indicator');
        lastMessage.innerHTML = '';
        lastMessage.textContent = message;
    }

    // News feed
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

    // Translator
    const translatorForm = document.getElementById('translator-form');
    const translatedText = document.getElementById('translated-text');

    if (translatorForm && API_KEYS.translator !== 'YOUR_TRANSLATOR_API_KEY') {
        translatorForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const textToTranslate = document.getElementById('text-to-translate').value;
            const targetLanguage = document.getElementById('target-language').value;

            // This is a placeholder for a real translation API
            // For a real implementation, you would use an API like Google Translate or DeepL
            const mockTranslatedText = `Translated: ${textToTranslate} (to ${targetLanguage})`;
            translatedText.textContent = mockTranslatedText;
        });
    } else if (translatorForm) {
        translatedText.innerHTML = `<p>Please add your Translator API key.</p>`;
    }

    // Weather widget
    const weatherWidget = document.getElementById('weather-widget');

    if (weatherWidget && API_KEYS.weather !== 'YOUR_OPENWEATHERMAP_API_KEY') {
        // Fetch weather data from OpenWeatherMap
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEYS.weather}&units=metric`)
            .then(response => response.json())
            .then(data => {
                const weatherHTML = `
                    <h3>Current Weather</h3>
                    <p><strong>Location:</strong> ${data.name}</p>
                    <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
                    <p><strong>Condition:</strong> ${data.weather[0].description}</p>
                `;
                weatherWidget.innerHTML = weatherHTML;
            })
            .catch(error => {
                weatherWidget.innerHTML = `<p>Could not fetch weather data.</p>`;
            });
    } else if (weatherWidget) {
        weatherWidget.innerHTML = `<p>Please add your OpenWeatherMap API key.</p>`;
    }

    // Scroll Progress Bar
    window.onscroll = () => {
        let scroll = document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let progress = (scroll / height) * 100;
        document.getElementById('progressBar').style.width = progress + '%';
    };

    // Typed.js effect (optional)
    if (document.querySelector('.typing')) {
        const typed = new Typed('.typing', {
            strings: ["Praveen", "a Business Developer", "a CRM Expert", "a Digital Marketer", "a Learner"],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true
        });
    }

    // Page Transitions
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');

            if (href && href.startsWith('#')) {
                return;
            }

            e.preventDefault();
            document.body.classList.add('fade-out');

            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });

    // Hero Scroll Animation
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            if (window.scrollY > 100) {
                hero.classList.add('scrolled');
            } else {
                hero.classList.remove('scrolled');
            }
        }
    });

    // Back to top button
    const backToTopButton = document.querySelector(".back-to-top");

    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }
    });

    backToTopButton.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    // AOS initialization
    AOS.init();

    // Menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    // Vanilla Tilt initialization
    if (document.querySelector(".project-card")) {
        VanillaTilt.init(document.querySelectorAll(".project-card"), {
            max: 25,
            speed: 400,
            glare: true,
            "max-glare": 1,
        });
    }
});
