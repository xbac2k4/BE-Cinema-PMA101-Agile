const url = 'http://localhost:3000/api/v1/category'
let dialog = document.getElementById('bgr-dialog')
let dialogbody = document.getElementById('dialog-content')
let tbody = document.querySelector('tbody')
let page = document.getElementById('page')
let preloader = document.getElementById('preloader')
let pageNumber = document.getElementById('page-number')
let tang = document.getElementById('ic-tang')
let giam = document.getElementById('ic-giam')

let numberPage = 1;
let totalPages;
//
// const fetchAPI = () => {
//     fetch(`${url}/get-category`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json(); // Đọc nội dung của phản hồi
//         })
//         .then(data => {
//             let html = data.data.map(items => {
//                 return /*html*/` 
//                 <tr height="80px">
//                     <td>${items._id}</td>
//                     <td>
//                         <img width="70px" height="100%" src="${items.image}"></img>
//                     </td>
//                     <td>${items.name}</td>
//                     <td style="gap: 10px;" class="d-flex justify-content-end"><button class="btn btn-outline-info" onclick="BtnSua('${items._id}','${items.image}','${items.name}')">Sửa</button> <button onclick="BtnXoa('${items._id}')" class="btn btn-outline-danger">Xóa</button></td>
//                 </tr>
//             `;
//             }).join('');
//             // preloader.style.display = 'none';
//             tbody.innerHTML = html;
//         })
//         .catch(error => {
//             console.error('There was a itemsblem with the fetch operation:', error);
//         });
// }
// fetchAPI();

const fetchAPI_Page = (currentPage) => {
    fetch(`${url}/get-category-by-page?page=${currentPage}&limit=5`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Đọc nội dung của phản hồi
        })
        .then(data => {
            console.log(data.data);
            console.log(data.data.categories);
            console.log(data.data.totalPages);
            let html = data.data.categories.map(items => {
                return /*html*/` 
                <tr>
                    <td style="color: red;">${items._id}</td>
                    <td>${items.name}</td>
                    <td style="gap: 20px; font-size: 20px" class="d-flex justify-content-end">
                    <i onclick="BtnUp('${items.id}','${items.name}')" class="bi bi-pen"></i> 
                    <i class="bi bi-trash3"></i></td>
                </tr>
            `;
            }).join('');
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
//
const BtnSua = (id, image, name) => {
    localStorage.setItem('type', JSON.stringify({ type: 1 }));
    const data = {
        id: id,
        image: image,
        name: name
    };
    localStorage.setItem('categoryData', JSON.stringify(data));
    window.location.href = '/add-category';
}

const BtnXoa = async (id) => {
    if (confirm('Bạn có muốn xóa')) {
        const response = await fetch(`${url}/delete-category/${id}`, { method: 'DELETE' })
        const result = await response.json();
        if (result.status === 200) {
            alert(result.message);
            fetchAPI_Page(numberPage)
            // form.reset()
        } else {
            alert('Xóa thất bại thất bại error:' + result.status + result.message);
        }
    }
}

const BtnThem = () => {
    localStorage.setItem('type', JSON.stringify({ type: 0 }));
    window.location.href = '/add-category'
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
const BtnAdd = () => {
    dialog.style.display = 'flex';

    let html = /*html*/`
                <div class="dialog-add w-100 h-100">
                    <h2 class="title-dialog text-center">THÊM THỂ LOẠI</h2>
                    <form id="form-movie" method="post" enctype="multipart/form-data">
                        <div class="form-group">
                            <span class="title" id="inputGroup-sizing-default">Tên phim:</span>
                            <input id="name-movie" type="text" class="form-control" name="name"
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                        </div>
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-primary mx-5 w-25" type="submit">Lưu</button>
                            <button class="btn btn-outline-primary mx-5 w-25" type="button" onclick="closeDialog()">Hủy</button>
                        </div>
                    </form>
                </div>
            `;
    dialogbody.innerHTML = html;
    const form = document.getElementById('form-movie');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        BtnLuu(formData)
        console.log("ddd" + formData);
    });
}
const closeDialog = () => {
    dialog.style.display = 'none';
}
const BtnLuu = async (formData) => {
    try {
        const response = await fetch(`${url}/add-category`, {
            method: "POST",
            body: formData
        });
        const result = await response.json();
        console.log(result);
        if (response.status === 200) {
            alert('Thêm thành công');
            document.getElementById('form-movie').reset();
            dialog.style.display = 'none';
        } else {
            alert('Thêm thất bại');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi');
    }
}
const BtnUp = (id, formData) => {
    dialog.style.display = 'flex';

    let html = /*html*/`
    <div class="dialog-add w-100 h-100">
        <h2 class="title-dialog text-center">SỬA THỂ LOẠI</h2>
        <form id="form-movie" method="post" enctype="multipart/form-data">
            <div class="form-group">
                <span class="title" id="inputGroup-sizing-default">Tên phim:</span>
                <input id="name-movie" type="text" class="form-control" name="name"
                    aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
            </div>
            <div class="d-flex justify-content-center">
                <button class="btn btn-primary mx-5 w-25" type="submit">Lưu</button>
                <button class="btn btn-outline-primary mx-5 w-25" type="button" onclick="closeDialog()">Hủy</button>
            </div>
        </form>
    </div>
`;
    dialogbody.innerHTML = html;
    const form = document.getElementById('form-movie');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        formatAndSubmitUpdateForm(itemId, formData);
    });
}