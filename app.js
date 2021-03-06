//Declaring variables
let searchBtn = document.querySelector('#search-btn');
let searchInput = document.querySelector('#search');
let resultOne = document.querySelector('.result1');
let resultTwo = document.querySelector('.result2');
let section = document.querySelector('section');

//Stating Functions
function handleSubmit(e) {
    e.preventDefault();
    let searchTerm = searchInput.value;

    let searchQuery = searchTerm.trim();

    fetchResults(searchQuery);
};

function fetchResults(searchQuery){
    let searchTerm = searchInput.value;
    let endpoint = 'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=30&srsearch=' + searchTerm;

    //Fetching data from the wikipedia API
    fetch(endpoint)
    .then(res => res.json())
    .then(data => {
        let results = data.query.search;
        displayResults(results);
     })
     .catch(err => console.log(err));
};

function displayResults(results){
    let searchResults = section;
    section.style.display = 'block';
    searchInput.value = '';

    section.innerHTML = '';

//Displaying the search results to the interface
    results.forEach(result => {
        let url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);

        searchResults.insertAdjacentHTML(
            'beforeend',

            `
            <div class="search-results">
                <h2 class="search-title">
                    <a href="${url}">${result.title}</a>
                </h2>
                <p class="result1">${result.snippet}</p>
                <a href="${url}" class="result-link">Read More</a>
        </div>
            `
        )
    });
};

//Adding Event Listener to the form
let form = document.querySelector('.input');
form.addEventListener('submit', handleSubmit);

//The toggler for the theme change
const checkbox = document.getElementById('checkbox');
const card  = document.querySelectorAll('.search-results');

checkbox.addEventListener('change', ()=> {
    //Change the theme of the function
    document.body.classList.toggle('white');
});