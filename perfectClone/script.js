console.log("connected");
const content_image = document.getElementById("content_image");
const main = document.getElementById("main");
const input = document.getElementById("search");
const searchResult = document.getElementById("searchResult");

let timeId;
input.addEventListener("input", function (e) {
    if (e.target.value.length > 0) {
        searchResult.setAttribute("style", "display: block");
        throttleFunction(e.target.value);
    } else {
        searchResult.setAttribute("style", "display: none");
        searchResult.innerHTML = null;
    }
});

const getSearchResult = async (inputQuery) => {
    const res = await fetch(
        `https://api.pexels.com/v1/search?query=${inputQuery}&limit=10`,
        {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "563492ad6f91700001000001b1d075f3896946c48ee931b23139511b",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer",
        }
    );
    const data = await res.json();
    console.log(data);
    data.photos.forEach((ele) => {
        const tempDiv = document.createElement("div");
        tempDiv.classList.add("search-result-data");
        tempDiv.innerHTML = `<img src="${ele.src.tiny}" alt="img" /> <span> by ${ele.photographer} </span>`;

        searchResult.appendChild(tempDiv);
    });
};

function throttleFunction(inputQuery) {
    if (timeId) {
        return false;
    }
    timeId = setTimeout(() => {
        getSearchResult(inputQuery);
        timeId = null;
    }, 500);
}

let n = 1;

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function dynamicCard(url) {
    return `<div class="main_container_images_insideDiv">
                            <img src=${url} alt="" />
                            <div class="main_container_images_name">
                                <div>
                                    <img src="upload.svg" alt="" />
                                    <span>${randomNumber(100, 999)}</span>
                                </div>
                                <div>
                                    <img src="message.svg" alt="" />
                                    <span>${randomNumber(39, 120)}</span>
                                </div>
                                <div>
                                    <img src="eye_icon.svg" alt="" />
                                    <span>${randomNumber(1, 9)}k</span>
                                </div>
                            </div>
                        </div>
                       `;
}

const getData = async (pageNo) => {
    const res = await fetch(
        `https://picsum.photos/v2/list?page=${pageNo}&limit=30`
    );
    const data = await res.json();
    data.forEach((element) => {
        const card = document.createElement("div");

        const url = element.download_url;
        card.classList.add("main_container_images");
        card.innerHTML = dynamicCard(url);
        content_image.appendChild(card);
    });
};

window.onscroll = function (ev) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        n++;
        const contentAbove = document.createElement("div");
        const getDataAgain = (async (pageNo) => {
            const res = await fetch(
                `https://picsum.photos/v2/list?page=${pageNo}&limit=30`
            );
            const data = await res.json();
            data.forEach((element) => {
                const url = element.download_url;
                const contentIn = document.createElement("div");

                contentAbove.classList.add("content_image");
                contentIn.classList.add("main_container_images");
                contentIn.innerHTML = dynamicCard(url);
                contentAbove.appendChild(contentIn);
            });
        })(n);
        main.appendChild(contentAbove);
    }
};

getData(n);
