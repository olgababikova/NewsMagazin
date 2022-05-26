const API_KEY = '2df0c547991842dbb095ce5072964801';
const choicesElem = document.querySelector('.js-choice');
const newslist = document.querySelector('.news-list');

const choices = new Choices(choicesElem, {
    searchEnabled: false,
    itemSelectText: '',
});
const getdata = async (url) => {
    const response = await fetch(url, {
        'X-Api-Key': API_KEY,
    });
const data = await response.json();

return data
};

const renderCard = (data) => {
    newslist.textContent = '';
    data.forEach(news => {
        const card = document.createElement('li');
        card.className = 'news-item';

        card.innerHTML = `
        <img src="${news.urlToImage}" alt="${news.title}" class="news-image" width="270" height="200">
        <h3 class="news-title">
            <a href="${news.url}" class="news-link" target="_blank">${news.title}</a>
        </h3>

        <p class="news-description">${news.description}</p>
        <div class="news-footer">
            <time class="news-datetime" datetime="${news.publishedAt}">
                <span class="news-date">${news.publishedAt}</span> 11:06
            </time>
            <div class="news-autor">${news.author}</div>
        </div>
        `;

        newslist.append(card);
    });
};


const loadNews = async () => {
    const data = await getdata('https://newsapi.org/v2/top-headlines?country=ru');
    renderCard(data);
};

loadNews();