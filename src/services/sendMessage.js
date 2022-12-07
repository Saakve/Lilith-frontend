const BASE_URL = "http://api.apililith.cloud/?mensaje=";

function sendMessage(message) {
    let request = BASE_URL.concat(message)
    return fetch(request).then(data => data.json())
}

export default sendMessage
