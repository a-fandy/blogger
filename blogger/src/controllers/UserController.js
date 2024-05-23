const loginUser = async (email, password) => {
    const res = await fetch('/api/v1/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })

    const response = await res.json()

    if (!res.ok) {
        throw Error(response.error.message)
    }
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('email', response.data.user.email)
    return response
}

const registerUser = async (name, email, password, confirmPassword) => {
    const res = await fetch('/api/v1/user/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })

    if (password !== confirmPassword) {
        throw new Error("Password and confirm password do not match");
    }

    const response = await res.json()

    if (!res.ok) {
        throw Error(response.error.message)
    }
    return response
}


export { loginUser, registerUser }