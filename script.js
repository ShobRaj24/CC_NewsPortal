
async function fetchNews(category) {
    const apiKey = "f8d65d750c4e4344afc87c5f39451837"; 
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "ok") {
            return data.articles;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
}


function displayNews(category) {
    const newsSection = document.getElementById("news-articles");
    newsSection.innerHTML = "";

    fetchNews(category)
        .then((articles) => {

            const filteredArticles = articles.filter((article) => !article.title.includes("Removed"));

            if (filteredArticles.length === 0) {
                newsSection.innerHTML = "<p>No news available for this category.</p>";
                return;
            }

            
            filteredArticles.forEach((article) => {
                
                if (article.urlToImage) {
                    const articleDiv = document.createElement("div");
                    articleDiv.classList.add("article");
            
                   
                    const thumbnailDiv = document.createElement("div");
                    thumbnailDiv.classList.add("thumbnail");
            
                    
                    const thumbnailImg = document.createElement("img");
                    thumbnailImg.src = article.urlToImage;
                    thumbnailImg.alt = 'Article Thumbnail';
            
                    
                    const contentDiv = document.createElement("div");
                    contentDiv.classList.add("article-content");
            
                    const title = document.createElement("h3");
                    const link = document.createElement("a");
                    link.href = article.url;
                    link.textContent = article.title;
                    title.appendChild(link);
            
                    const description = document.createElement("p");
                    description.textContent = article.description;
            
                    
                    thumbnailDiv.appendChild(thumbnailImg);
                    contentDiv.appendChild(title);
                    contentDiv.appendChild(description);
            
                    
                    articleDiv.appendChild(thumbnailDiv);
                    articleDiv.appendChild(contentDiv);
            
                    newsSection.appendChild(articleDiv);
                }
            });
            

        })
        .catch((error) => {
            console.error("Error displaying news:", error);
        });
}
document.getElementById("general").addEventListener("click", () => {
    document.getElementById("news-category").textContent = "General News";
    displayNews("general");
});

document.getElementById("business").addEventListener("click", () => {
    document.getElementById("news-category").textContent = "Business News";
    displayNews("business");
});

document.getElementById("sports").addEventListener("click", () => {
    document.getElementById("news-category").textContent = "Sports News";
    displayNews("sports");
});

document.getElementById("technology").addEventListener("click", () => {
    document.getElementById("news-category").textContent = "Technology News";
    displayNews("technology");
});

document.getElementById("entertainment").addEventListener("click", () => {
    document.getElementById("news-category").textContent = "Entertainment News";
    displayNews("entertainment");
});


displayNews("general");

