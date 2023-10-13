import axios from "axios";

let apiUrl = "http://localhost:5036/api/User/"

export async function login(email) {
    const url = `${apiUrl}?email=${email}`;
    try {
        const res = await axios(url);
        if (res.data.length > 0) {
            const email = res.data[0].email;
            localStorage.setItem('email', email);
            window.location.replace('/');
        }
        else {
            alert('Invalid Email');
        }
    } catch (e) {
        console.log(e);
    }
}

export async function signup(email, firstName, lastName) {
    try {
        const res = await axios({
            url: apiUrl,
            method: 'post',
            data: {
                email,
                firstName,
                lastName
            }
        });
        if (res.status === 200) {
            if (res.data.length === 0) {
                login(email);
            }
            else {
                alert('Email already used');
            }
        }
    } catch (e) {
        console.log(e);
    }
}

export function logout() {
    localStorage.removeItem('email');
    window.location.reload();
}

export async function isLoggedIn() {
    const email = localStorage.getItem('email');
    if (email) {
        const url = `${apiUrl}?email=${email}`;
        try {
            const res = await axios(url);
            if (res.data.length > 0) {
                return 1;
            }
        } catch (e) {
            console.log(e);
        }
    }
    return 0;
}