let searchData = document.getElementById("getSearchData");
let query1 = document.getElementById("query");
let query = '';
const ts = 1;
const PUBLIC_KEY = "a13557bf8c8b88acf8dd779725b7fb5c";
const hash = 'a841a14f4669dfc41905398edbde2e40';
let wholeData;

query1.addEventListener("keyup", (e) => {
    query = e.target.value;
    query ? debounceFn(query) : searchData.innerText = null
})

const getSearchDataFromApi = async (query) => {
    if (query.length > 2) {
        console.log('query:', query)
        let res = await fetch(
            `https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=${query}&ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`
        );
        let data = await res.json();
        // console.log();
        let resData = data.data.results;
        for (let i = 0; i < resData?.length && i <= 7; i++) {
            console.log(i);
            searchDataPut(resData[i].id, resData[i].title);
        }
    } 
}


function searchDataPut(id, title) {
    let p = document.createElement('p');
    p.innerHTML = title;
    searchData.appendChild(p);
    p.addEventListener('click', () => {
        localStorage.setItem('id', JSON.stringify(id))
        window.location.href = 'detail.html';
    })
}

let timerId;
function debounceFn(query) {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
        getSearchDataFromApi(query);
        timerId = undefined;
    }, 2000)
}



