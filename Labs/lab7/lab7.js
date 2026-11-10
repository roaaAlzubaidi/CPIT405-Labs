
let btnXHR = document.getElementById("xhrSearch");
let btnFetch = document.getElementById("fetchSearch");
let btnAsync = document.getElementById("asyncSearch");

let searchText = document.querySelector('header input[type="text"]');
let searchResults = document.getElementById("searchResults");

var url = "https://api.unsplash.com/search/photos";

btnXHR.addEventListener("click", function() {
    fetchUnsplashAPI_UsingXHR(searchText.value);
});

btnFetch.addEventListener("click", function() {
    fetchUnsplashAPI_UsingFetch(searchText.value);
});

btnAsync.addEventListener("click", function() {
    fetchUnsplashAPI_UsingAsync(searchText.value);
});

function getAPIKey() {
    return prompt("Enter your Unsplash API Key:");
}

function fetchUnsplashAPI_UsingXHR(keyword) {
    if (!keyword) {
        return;
    }

    let apiKey = getAPIKey();

    if (!apiKey) {
        return;
    }

    searchResults.innerHTML = "";

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

function fetchUnsplashAPI_UsingFetch(keyword) {
    if (!keyword) {
        return;
    }

    let apiKey = getAPIKey();

    if (!apiKey) {
        return;
    }

    searchResults.innerHTML = "";

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

async function fetchUnsplashAPI_UsingAsync(keyword) {
    if (!keyword) {
        return;
    }

    let apiKey = getAPIKey();

    if (!apiKey) {
        return;
    }

    searchResults.innerHTML = "";

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
