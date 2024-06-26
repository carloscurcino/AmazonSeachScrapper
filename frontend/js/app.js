form = document.getElementById('form')
search_input = document.getElementById('search')
search_button = document.getElementById('button')


const ul = document.querySelector('.card-list');

// Create e new List Item
function createListItem(title, image, link, stars, reviews, price) {
    const li = document.createElement('li');
    li.innerHTML = `
        <a href="${link}" target="_blank" class="card">
            <img src="${image}" alt="${title}">
            <div class="card-content">
                <h3>${title}</h3>
                <span>${stars}</span>
                <span>${reviews} reviews</span>
                <p>Price: ${price}</p>
            </div>
        </a>
    `;
    return li;
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const searchTerm = search_input.value;

    try {
        // Doing the AJAX request
        const response = await fetch(`http://localhost:3000/scrape?keyword=${searchTerm}`);
        const data = await response.json();

        // Cleaning the list before adding more li's
        ul.innerHTML = '';

        // Adding the results to the list
        data.forEach(item => {
            const newListItem = createListItem(item.title, item.image, item.link, item.stars, item.reviews, item.price);
            ul.appendChild(newListItem);
        });
    } catch (error) {
        console.error('Ocorreu um erro ao realizar a requisição AJAX:', error);
    }
});