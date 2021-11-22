const pContainer = document.getElementById("ContainerMain");
const displayScrollTopDiv = document.getElementById("displayScrollTop");
console.log("pContainer:", pContainer);
let mainCount = 1;


const addMasaiStudentFun = () => {
    for (let i = mainCount; i < mainCount+25; i++) {
        let pDiv = document.createElement("p");
        pDiv.classList.add("pContent");
        pDiv.innerHTML = `Masai Student ${i}`;
        pContainer.appendChild(pDiv);
    }
};

const Scroller = () => {
    const pScrolltop = document.createElement("p");
    const pClientHeight = document.createElement("p");
    const pScrollHeight = document.createElement("p");
    pContainer.addEventListener("scroll", (e) => {
        if (
            pContainer.scrollTop + pContainer.clientHeight ===
            pContainer.scrollHeight
        ) {
            mainCount += 25;
            addMasaiStudentFun();
        }
            pScrolltop.textContent = `scrollTop: ${pContainer.scrollTop}px`;
        pClientHeight.textContent = `clientHeight: ${pContainer.clientHeight}px`;
        pScrollHeight.textContent = `scrollHeight: ${pContainer.scrollHeight}px`;
        displayScrollTopDiv.appendChild(pScrolltop);
        displayScrollTopDiv.appendChild(pClientHeight);
        displayScrollTopDiv.appendChild(pScrollHeight);
    });
};


const getBoundingClientRectInfo = () => {
    let rect = pContainer.getBoundingClientRect();
    for (let key in rect) {
        if (typeof rect[key] !== "function") {
            let pInfo = document.createElement("p");
            pInfo.innerText = `${key} - ${rect[key]}`;
            displayScrollTopDiv.appendChild(pInfo);
        }
    }
};

Scroller();
addMasaiStudentFun();
getBoundingClientRectInfo();
