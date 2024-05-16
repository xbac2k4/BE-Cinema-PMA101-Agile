const url = 'http://localhost:3000/api/v1/category'

let tbody = document.querySelector('tbody')
let page = document.getElementById('page')
let preloader = document.getElementById('preloader')
let numberPage = 1;
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
                <tr height="80px">
                    <td style="color: red;">${items._id}</td>
                   
                    <td>${items.name}</td>
                    <td style="gap: 20px; font-size: 20px" class="d-flex justify-content-end"><i onclick="BtnChiTiet()" class="bi bi-eye"></i> <i class="bi bi-pen"></i> <i class="bi bi-trash3"></i></td>
                </tr>
            `;
            }).join('');
            // let htmlPage = data.data.totalPages;
            let htmlPage = [...Array(data.data.totalPages).keys()].map(page => {
                return /*html*/`<button type="button" class="btn btn-outline-secondary ${page + 1 === currentPage ? 'active' : ''}" onclick="BtnPage(${page + 1})">${page + 1}</button>
                `;
            })
            preloader.style.display = 'none';
            tbody.innerHTML = html;
            page.innerHTML = htmlPage;
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

const BtnPage = (page) => {
    fetchAPI_Page(page);
}