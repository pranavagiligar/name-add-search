const REQUEST_HEADERS = {
    'Content-Type': 'application/json'
};

function getNames() {
    const namesField = document.getElementById('search');
    var namesArr = namesField.value
    var endpoint = "/names"
    console.log("==" + namesArr + "==")
    if (namesArr.trim().length > 0) {
        endpoint = "/filter-names?initial=" + namesArr
    }
    console.log("endpoint==" + endpoint + "==")

    axios.defaults.baseURL = 'http://127.0.0.1:3000'
    axios.get(endpoint, { headers: REQUEST_HEADERS })
    .then(response => {
        console.log(response.data)
        const data = response.data;
        const resultBlockElement = document.getElementById('main-result-block');
        resultBlockElement.classList.remove('invisible');
        const resultElement = document.getElementById('result');
        resultElement.textContent = data
    })
    .catch(error => console.error(error))
}

function addName() {
    axios.defaults.baseURL = 'http://127.0.0.1:3000'
    const namesField = document.getElementById('names');
    var namesArr = namesField.value.split(',')
    const body = {
        names: namesArr
      };
    axios.post('/save', JSON.stringify(body), { headers: REQUEST_HEADERS })
    .then(response => {
        const data = response.data;
        console.log('data', data);
        const resultBlockElement = document.getElementById('status-block');
        resultBlockElement.classList.remove('invisible');
        const resultElement = document.getElementById('status_result');
        resultElement.textContent = JSON.stringify(data)
    })
    .catch(error => console.error('failed to save names', error));
}