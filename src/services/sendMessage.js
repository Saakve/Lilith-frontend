const BASE_URL = "http://apililith-env.eba-inciyasf.us-east-1.elasticbeanstalk.com/?mensaje=";

function sendMessage(message) {
    let request = BASE_URL.concat(message)
    return fetch(request).then(data => data.json())
}

export default sendMessage
