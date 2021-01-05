const REQUEST_HEADERS = {
    'Content-Type': 'application/json'
};

function getNames() {
    const namesField = document.getElementById('search');
    var namesArr = namesField.value
    var endpoint = "/names"

    if (namesArr.trim().length > 0) {
        endpoint = "/filter-names?initial=" + namesArr.trim()
    }

    axios.defaults.baseURL = 'http://127.0.0.1:3000'

    var getreturn = axios.get(endpoint, { headers: REQUEST_HEADERS })
    var thenreturn = getreturn.then(handleGetResponse)
    thenreturn.catch(showError)
}

function handleGetResponse(response) {
    const data = response.data;
    const resultElement = document.getElementById('result');
    resultElement.textContent = data
}

function addName() {
    axios.defaults.baseURL = 'http://127.0.0.1:3000'
    const namesField = document.getElementById('names');
    var namesArr = namesField.value.split(',')
    const body = {
        names: namesArr
    };
    axios.post('/save', JSON.stringify(body), { headers: REQUEST_HEADERS }).then(handlePostResponse()).catch(showError);
}

function handlePostResponse(response) {
    const data = response.data;
    const resultElement = document.getElementById('status_result');
    resultElement.textContent = data["status"]
}

function showError(errorMessage) {
    window.alert(errorMessage)
}