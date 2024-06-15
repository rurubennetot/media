async function fetchArticles() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/favstats/AllSideR/master/data/allsides_data.csv');
        const data = await response.text();
        const articles = parseCSV(data);
        return articles;
    } catch (error) {
        console.error('Error fetching articles:', error);
    }
}

function parseCSV(data) {
    const rows = data.split('\n').slice(1);
    return rows.map(row => {
        const columns = row.split(',');
        return {
            title: columns[0],
            content: columns[2] // Assuming the third column contains the content
        };
    });
}

async function loadArticles() {
    const articles = await fetchArticles();
    const articlesDiv = document.getElementById('articles');
    articles.slice(0, 3).forEach((article, index) => {
        const articleLink = document.createElement('a');
        articleLink.href = `article${index + 1}.html`;
        articleLink.textContent = article.title;
        articlesDiv.appendChild(articleLink);
    });
}

async function loadArticle(index) {
    const articles = await fetchArticles();
    const article = articles[index];
    document.getElementById('title').textContent = article.title;
    document.getElementById('content').textContent = article.content;
}

if (document.getElementById('articles')) {
    loadArticles();
}
