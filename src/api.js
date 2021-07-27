const params = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

const URL = 'http://localhost:3005';

function getNews(subject) {
    return (
        fetch(`${URL}/${subject}`, params)
        .then((response) => response.json())
        .catch((err) => {
            console.log('One error is ocurred', err)
        })
    );
}

export default {
    getNews
}
