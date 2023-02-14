const API_ENDPOINT = 'https://sbc-sebatcabut.herokuapp.com';

const getData = () => {
    fetch(API_ENDPOINT + '/fosils')
        //buat response data menjadi json
        .then(response => response.json())
        //mengambil data
        .then(data => {
            displayData(data.data.data);
            //console.log memunculkan data untuk mengetahui apakah datanya sudah masuk atau belum
            console.log(data);
        })
        // membuat catch error, sehingga dapat langsung diketahui kesalahannya
        .catch(error => console.log(error));
}
// membuat methode get by id
const getDataById = (id) => {
    fetch(API_ENDPOINT + '/fosil/' + id)
        .then(response => response.json())
        .then(data => {
            displayDataById(data.data);
        })
        .catch(error => console.log(error));
}
const displayDataById = (data) => {
    document.getElementById("id").value = data.id;
    document.getElementById("no_register").value = data.no_register;
    document.getElementById("no_inventaris").value = data.no_inventaris;
    document.getElementById("nama_koleksi").value = data.nama_koleksi;
    document.getElementById("lokasi_temuan").value = data.lokasi_temuan;
    document.getElementById("tahun_perolehan").value = data.tahun_perolehan;
    document.getElementById("determinator").value = data.determinator;
    document.getElementById("keterangan").value = data.keterangan;
}
//membuat methode delete (hapus)
const deleteData = (id) => {
    fetch(API_ENDPOINT + '/fosil/' + id, {
        method: 'DELETE'
    })
}
// data diambil dan dimasukan pada id output
const displayData = (dataArray) => {
    // membuat variabel output
    let output = "";
    // forEach ini adalah looping yang dinamakan object
    dataArray.forEach(function(object, index) {
        //memanggil data atau atribut pada data fosil yang disimpan pada object
        output += `
        <tr>
        <td>${index+1}</td>
        <td>${object.no_register}</td>
        <td>${object.no_inventaris}</td>
        <td>${object.nama_koleksi}</td>
        <td>${object.lokasi_temuan}</td>
        <td>${object.tahun_perolehan}</td>
        <td>${object.determinator}</td>
        <td>${object.keterangan}</td>
        <td>
        <button class="update btn" data-id="${object.id}">Update</button>
        <button class="delete btn" data-id="${object.id}">Delete</button>
        </td>
        </tr>
        `;
    });
    // kita panggil id output dengan nama "result" agar bisa di tampilkan pada element lain
    document.getElementById("result").innerHTML = output;
    // Membuat Event listener untuk button update
    let updateButtons = document.querySelectorAll('.update');
    updateButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            let id = this.getAttribute('data-id');
            getDataById(id);
            //window.location.href digunakan untuk menetukan alamat atau halaman yang dituju sestslah buttom di klik
            window.location.href = 'update.html?id=' + id;
            let dataObject = dataArray.find(function (object) {
                return object.id === id;
            });
            document.getElementById("update-id").value = dataObject.id;
            document.getElementById("update-no_register").value = dataObject.no_register;
            document.getElementById("update-no_inventaris").value = dataObject.no_inventaris;
            document.getElementById("update-nama_koleksi").value = dataObject.nama_koleksi;
            document.getElementById("update-lokasi_temuan").value = dataObject.lokasi_temuan;
            document.getElementById("update-tahun_perolehan").value = dataObject.tahun_perolehan;
            document.getElementById("update-determinator").value = dataObject.determinator;
            document.getElementById("update-keterangan").value = dataObject.keterangan;
        });
    });
    // Membuat Event listener untuk button Delete
    let deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            let id = this.getAttribute('data-id');
            deleteData(id);
            let row = this.parentNode.parentNode;
            row.parentNode.removeChild(row);
        });
    });
}

//membuat methode POST
const postData = (data) => {
    fetch(API_ENDPOINT + '/fosil', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.log(error));
}
getData();
// Mengambil elemen form
const form = document.getElementById("form");
// Menambahkan event listener untuk form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Mengambil nilai dari input
    const no_register = document.getElementById("no_register").value;
    const no_inventaris = document.getElementById("no_inventaris").value;
    const nama_koleksi = document.getElementById("nama_koleksi").value;
    const lokasi_temuan = document.getElementById("lokasi_temuan").value;
    const tahun_perolehan = document.getElementById("tahun_perolehan").value;
    const determinator = document.getElementById("determinator").value;
    const keterangan = document.getElementById("keterangan").value;
    // Memanggil fungsi postData dengan nilai yang diambil dari form
    postData({ no_register: no_register, no_inventaris: no_inventaris, nama_koleksi: nama_koleksi, lokasi_temuan: lokasi_temuan, tahun_perolehan: tahun_perolehan, determinator: determinator, keterangan: keterangan });
});
