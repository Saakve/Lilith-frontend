const BASE_URL = "http://localhost:8080/?mensaje=";

function sendMessage(message) {
    let request = BASE_URL.concat(message)
    return fetch(request).then(data => data.json())
}

export default sendMessage