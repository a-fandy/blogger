import Alert from "../../components/Alert"
import { useContext, useState } from "react"
import { loginUser } from "../../controllers/UserController"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../../contexts/UserContext"

const Login = () => {

    const {setUser} = useContext(UserContext)

    const [error, setError] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async(e) => {
        e.preventDefault()
        setError(null)
        try {
            await loginUser(email, password)
            setUser({
                email: email,
                product: []
            })
            navigate('/dashboard')
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center lg:w-1/2">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6 ">
                        Welcome! Please enter your username and password to log in. If you dont have an account, 
                        click on <Link to="/register" className="text-sky-600">Sign Up</Link> to create one. For any issues, contact support.
                    </p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleLogin}>
                        {error && <Alert message={error} />}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Login