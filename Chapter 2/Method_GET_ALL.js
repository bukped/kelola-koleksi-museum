// Method GET ALL

const API_ENDPOINT = URL;

const getData = () => {
    fetch(API_ENDPOINT )
        .then(response => response.json())
        .then(data => {
        // Manipulasi data yang diterima dari server
            displayData(data);
        })
         // Tindakan jika terjadi Error
        .catch(error => console.log(error));
}
