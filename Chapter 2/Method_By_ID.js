// Method GET By ID
const API_ENDPOINT = 'URL';

const getDataById = (id) => {
// Memanggil data berdasarkan ID
    fetch(API_ENDPOINT + id)
        .then(response => response.json())
        .then(data => {
            displayDataById(data);
        })
        .catch(error => console.log(error));
}

