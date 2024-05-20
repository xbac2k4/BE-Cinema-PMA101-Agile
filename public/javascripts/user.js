const url = 'http://localhost:3000/api/v1/user'

let tbody = document.querySelector('tbody')
let page = document.getElementById('page')
let dialog = document.getElementById('bgr-dialog')
let dialogbody = document.getElementById('dialog-content')
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
                    <td>${items.sex = 0 ? 'Nam' : 'Nữ'}</td>
                    <td>${items.email}</td>
                    <td>${items.phoneNumber}</td>
                    <td style="gap: 20px; font-size: 20px" class="d-flex justify-content-end">
                        <i onclick="BtnChiTiet('${items._id}','${items.avatar}','${items.username}','${items.sex = 0 ? 'Nam' : 'Nữ'}','${items.email}','${items.phoneNumber}')" class="bi bi-eye"></i> 
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

const BtnChiTiet = (_id,avatar,username,sex,email,phoneNumber) => {
    // alert(`Chức năng đang được phát triển ${name}`);
    dialog.style.display = 'flex';
    let html = /*html*/` 
        <div class="bgr-dialog-chitiet-content" style="
            width:100%;
            height:100%;
        ">
            <div class="bgr-dialog-chitiet-content-title text-center">
                <h2>THÔNG TIN NGƯỜI DÙNG</h2>
            </div>
            <div class="bgr-dialog-chitiet-content-body">
                <div class="bgr-dialog-chitiet-content-body-image d-flex flex-row justify-content-center" style="
                    width:100%;
                    margin: 20px;
                ">
                    <img width="150px" height="200px" 
                        style="
                            object-fit: cover;
                            align-self: center;
                            border-radius: 10px;
                        " src="${avatar}" alt="">
                </div>
                <div class="bgr-dialog-chitiet-content-body-category">
                    <p  style="
                        background-color: white;
                        margin: 0;
                        padding: 0 20px;
                        font-weight: bold;
                        " >ID người dùng: ${_id}
                    </p>
                    <div class="d-flex justify-content-between">
                    <p  style="
                        background-color: white;
                        margin: 0;
                        padding: 0px 40px;
                        " >Tên người dùng: ${username}
                    </p>
                        <p  style="
                            background-color: white;
                            margin: 0;
                            padding-right:100px;
                            " >Giới tính: ${sex }
                        </p>
                        
                    </div>
                    <p  style="
                        background-color: white;
                        margin: 0;
                        padding: 0px 40px;
                        " >Email: ${email}
                    </p>
                    <p  style="
                        background-color: white;
                        margin: 0;
                        padding: 0px 40px;
                        " >Số điện thoại: ${phoneNumber}
                    </p>
                    
                </div>
                
            </div>
            
            <div class="bgr-dialog-chitiet-content-button text-center">
                <button style="
                    width: 30%;
                    height: 55px;
                    background-color: #404E67;
                    color: white;
                    outline: none;
                    border: none;
                    border-radius: 5px;
                    margin-top: 20px;
                " type="button" onclick="closeDialogChiTiet()">OK</button>
            </div>
        </div>
    `
    dialogbody.innerHTML = html;
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