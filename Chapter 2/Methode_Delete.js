const API_ENDPOINT = '';

const deleteData = (id) => {
    fetch(API_ENDPOINT + id, {
        method: 'DELETE'
    })
}

