const loginForm = document.getElementById('loginForm');
const email = document.getElementById('email');
const password = document.getElementById('password');
// require('dotenv').config();
const url = `http://localhost:3000/api/v1/user`


const loginUser = async () => {
    const formData = new FormData(loginForm);
    // formData.append("email", email.value);
    // formData.append("password", password.value);
    const data = new URLSearchParams(formData);
    console.log([...data]);
    try {
        const response = await fetch(`${url}/login`, {
            method: "POST",
            body: data
        })
            // .then(res => {
            //     console.log(res.status);
            //     if (res.status === 200) {
            //         alert('Đăng nhập thành công')
            //         window.location.href = '/category';
            //         form.reset()
            //     } else {
            //         alert('Đăng nhập không thành công')
            //     }
            // })
            // .then(data => console.log(data))
            // .catch(err => console.log(err))
        const result = await response.json();
        console.log(result);
        if (result.status === 200) {
            alert('Đăng nhập thành công')
            window.location.href = '/category';
            form.reset()
        } else {
            alert('Đăng nhập không thành công')
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi');
    }
};


loginForm.addEventListener('submit', async event => {
    event.preventDefault();
    loginUser();
});
