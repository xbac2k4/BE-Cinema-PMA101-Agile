const url = 'http://localhost:3000/api/v1/user'

let tbody = document.querySelector('tbody')
let page = document.getElementById('page')
let dialog = document.getElementById('bgr-dialog-chitiet')
let dialogbody = document.getElementById('dialog-chitiet')
let preloader = document.getElementById('preloader')
let pageNumber = document.getElementById('page-number')
let tang = document.getElementById('ic-tang')
let giam = document.getElementById('ic-giam')

let numberPage = 1;
let totalPages;

console.log(dialog);      // Should not be null
console.log(dialogbody);  // Should not be null

const fetchAPI_Page = (currentPage) => {
    fetch(`${url}/get-user-by-page?page=${currentPage}&limit=5`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Đọc nội dung của phản hồi
        })
        .then(data => {
            // console.log("data ok: " + data.data.users);
            let html = data.data.users.map(items => {
                return /*html*/` 
                <tr>
                    <td>
                        <p style="
                            width: 70px;
                            color: red;   
                            white-space: nowrap; 
                            overflow: hidden;
                            text-overflow: ellipsis;">${items._id}</p>
                    </td>
                    <td>
                        <img style="width:30px;height:30px,object-fit:cover" src="${items.avatar}"/>
                    </td>               
                    <td>${items.username}</td>
                    <td>${items.sex=0?'Nam': 'Nữ'}</td>
                    <td>${items.email}</td>
                    <td>${items.phoneNumber}</td>
                    <td style="gap: 20px; font-size: 20px" class="d-flex justify-content-end">
                        <i onclick="BtnChiTiet()" class="bi bi-eye"></i> 
                        <i class="bi bi-pen"></i> 
                        <i class="bi bi-trash3"></i>
                    </td>
                </tr>
            `;
            }).join('');
            // let htmlPage = data.data.totalPages;
            preloader.style.display = 'none';
            tbody.innerHTML = html;
            pageNumber.value = numberPage;
            totalPages = data.data.totalPages;
        })
        .catch(error => {
            console.error('There was a itemsblem with the fetch operation:', error);
        });
}

fetchAPI_Page(numberPage);

const BtnChiTiet = (items) => {
    // alert(`Chức năng đang được phát triển ${name}`);
    dialog.style.display = 'flex';
    console.log(items);
}

const closeDialogChiTiet = () => {
    dialog.style.display = 'none';
}

tang.addEventListener('click', event => {
    event.preventDefault();
    if (numberPage < totalPages) {
        numberPage++;
        fetchAPI_Page(numberPage);
    }
});
giam.addEventListener('click', event => {
    event.preventDefault();
    if (numberPage > 0) {
        numberPage--;
        fetchAPI_Page(numberPage);
    }
});