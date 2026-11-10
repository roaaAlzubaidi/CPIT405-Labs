
let btnXHR = document.getElementById("xhrSearch");
let btnFetch = document.getElementById("fetchSearch");
let btnAsync = document.getElementById("asyncSearch");

let searchText = document.querySelector('header input[type="text"]');
let searchResults = document.getElementById("searchResults");

var url = "https://api.unsplash.com/search/photos";
const apiKey = "SyOQGnI6a2V_L_clwUr-xMzd_4wZ6D4EgwmyxEq5dyM";
btnXHR.addEventListener("click", function() {
    searchResults.innerHTML = "";
    fetchUnsplashAPI_UsingXHR(searchText.value);
});

function fetchUnsplashAPI_UsingXHR(keyword) {
    if (!keyword) {
        return;
    }

    var params = "query=" + encodeURIComponent(keyword) + "&per_page=5";

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            processResponse(JSON.parse(this.responseText));
        }
    });

    xhr.open("GET", url + "?" + params);
    xhr.setRequestHeader("Authorization", "Client-ID " + apiKey);
    xhr.send();
}

btnFetch.addEventListener("click", function() {
    searchResults.innerHTML = "";
    fetchUnsplashAPI_UsingFetch(searchText.value);
});

function fetchUnsplashAPI_UsingFetch(keyword) {
    if (!keyword) {
        return;
    }

    var params = "query=" + encodeURIComponent(keyword) + "&per_page=5";

    fetch(url + "?" + params, {
        headers: {
            "Authorization": "Client-ID " + apiKey
        }
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        processResponse(data);
    });
}

btnAsync.addEventListener("click", function() {
    searchResults.innerHTML = "";
    fetchUnsplashAPI_UsingAsync(searchText.value);
});

async function fetchUnsplashAPI_UsingAsync(keyword) {
    if (!keyword) {
        return;
    }

    var params = "query=" + encodeURIComponent(keyword) + "&per_page=5";

    let response = await fetch(url + "?" + params, {
        headers: {
            "Authorization": "Client-ID " + apiKey
        }
    });

    let data = await response.json();
    processResponse(data);
}

function processResponse(resp) {
    for (let item of resp.results) {
        let imgElement = document.createElement("img");
        imgElement.src = item.urls.small;
        imgElement.alt = item.alt_description || "Photo";
        searchResults.appendChild(imgElement);
    }
}
