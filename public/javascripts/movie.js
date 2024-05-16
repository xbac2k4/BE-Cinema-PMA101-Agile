const url = 'http://localhost:3000/api/v1/movie'

let tbody = document.querySelector('tbody')
let page = document.getElementById('page')
let preloader = document.getElementById('preloader')
let dialog = document.getElementById('bgr-dialog-chitiet')
let dialogbody = document.getElementById('dialog-chitiet')
let pageNumber = document.getElementById('page-number')
let tang = document.getElementById('ic-tang')
let giam = document.getElementById('ic-giam')

let numberPage = 1;
let totalPages;

const fetchAPI_Page = (currentPage) => {
    fetch(`${url}/get-movie-by-page?page=${currentPage}&limit=5`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Đọc nội dung của phản hồi
        })
        .then(data => {
            // console.log("data ok: " + data.data.movies);
            let html = data.data.movies.map(items => {
                return /*html*/` 
                <tr>
                    <td><p style="
                    width: 50px;
                    color: red;   
                    white-space: nowrap; 
                    overflow: hidden;
                    text-overflow: ellipsis;">${items._id}</p></td>
                    <td>${items.start_date}</td>
                    <td>${items.end_date}</td>
                    <td><p style="
                            width: 70px;
                            color: red;   
                            white-space: nowrap; 
                            overflow: hidden;
                            text-overflow: ellipsis;">${items.name}</p>
                    </td>
                    <td>${items.id_category.name}</td>
                    <td>${items.duration}</td>
                    <td><p style="
                            width: 70px;
                            color: red;   
                            white-space: nowrap; 
                            overflow: hidden;
                            text-overflow: ellipsis;">${items.directors}</p>
                    </td>
                    <td style="gap: 20px; font-size: 20px" class="d-flex justify-content-end">
                        <i onclick="BtnChiTiet('${items.id_category._id}', '${items._id}', '${items.image}', '${items.id_category.name}', '${items.name}', '${items.start_date}', '${items.end_date}', '${items.duration}', '${items.directors}', '${items.description}')" class="bi bi-eye"></i> 
                        <i class="bi bi-pen"></i> 
                        <i class="bi bi-trash3"></i>
                    </td>
                </tr>
            `;
            }).join('');
            // let htmlPage = data.data.totalPages;
            // let htmlPage = [...Array(data.data.totalPages).keys()].map(page => {
            //     return /*html*/` 
            //     <button type="button" class="btn btn-outline-secondary ${page + 1 === currentPage ? 'active' : ''}" onclick="BtnPage(${page + 1})">${page + 1}</button>
            // `;
            // })
            preloader.style.display = 'none';
            tbody.innerHTML = html;
            pageNumber.value = numberPage;
            totalPages = data.data.totalPages;
            // page.innerHTML = htmlPage;
        })
        .catch(error => {
            console.error('There was a itemsblem with the fetch operation:', error);
        });
}
{/* <button onclick="BtnXoa('${items._id}')" class="btn btn-outline-danger">Chi tiết</button> <button class="btn btn-outline-info" onclick="BtnSua('${items._id}','${items.image}','${items.name}')">Sửa</button> <button onclick="BtnXoa('${items._id}')" class="btn btn-outline-danger">Xóa</button> */ }
fetchAPI_Page(numberPage);

const BtnChiTiet = (id_category, id_movie, image, name_category, name_movie, start_date, end_date, duration, directors, description) => {
    // alert(`Chức năng đang được phát triển ${name}`);
    dialog.style.display = 'flex';
    let html = /*html*/` 
        <div class="bgr-dialog-chitiet-content" style="
            width:100%;
            height:100%;
        ">
            <div class="bgr-dialog-chitiet-content-title text-center">
                <h2>THÔNG TIN PHIM</h2>
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
                        " src="${image}" alt="">
                </div>
                <div class="bgr-dialog-chitiet-content-body-category">
                    <p  style="
                        background-color: white;
                        margin: 0;
                        padding: 0 20px;
                        font-weight: bold;
                        " >ID thể loại: ${id_category}
                    </p>
                    <p  style="
                        background-color: white;
                        margin: 0;
                        padding: 0px 40px;
                        " >Tên thể loại: ${name_category}
                    </p>
                </div>
                <div class="bgr-dialog-chitiet-content-body-movie">
                    <p  style="
                        background-color: white;
                        margin: 0;
                        padding: 0 20px;
                        font-weight: bold;
                        " >ID phim: ${id_movie}
                    </p>
                    <p  style="
                        background-color: white;
                        margin: 0;
                        padding: 0px 40px;
                        " >Tên phim: ${name_movie}
                    </p>
                    <div style="padding: 0 40px" class="d-flex justify-content-between">
                        <p style="
                            background-color: white;
                            margin: 0;
                            " >Ngày khởi chiếu: ${start_date}
                        </p>
                        <p  style="
                            background-color: white;
                            margin: 0;
                            " >Ngày kết thúc: ${end_date}
                        </p>
                    </div>
                    <p  style="
                        background-color: white;
                        margin: 0;
                        padding: 0px 40px;
                        " >Thời lượng: ${duration}
                    </p>
                    <p  style="
                        background-color: white;
                        margin: 0;
                        padding: 0px 40px;
                        " >Đạo diễn: ${directors}
                    </p>
                    <p  style="
                        background-color: white;
                        margin: 0;
                        padding: 0px 40px;
                        " >Mô tả: ${description}
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