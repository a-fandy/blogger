import { useState } from "react"
import Alert from "../../components/Alert";
import { Link } from "react-router-dom";
import { registerUser } from "../../controllers/UserController";

const Register = () => {

  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [formRegis, setFormRegis] = useState({
    'email': "",
    'password': "",
    'confirmPassword': "",
    'name': "",
  });

  const handleRegister = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
  
    try {
        const res = await registerUser(formRegis.name,formRegis.email, formRegis.password)
        if(res.code == 200) {
          setFormRegis({
            'email': "",
            'password': "",
            'confirmPassword': "",
            'name': "",
          })
          setSuccess("Registration successful! Please go to the login page to access your account")
        }
    } catch (error) {
        setError(error.message)
    }
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center lg:w-1/2">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Join us today! Please fill out the form below to create your account.
            By registering, you agree to our terms and conditions. Welcome aboard! If you have an account,
             you can <Link to="/login" className="text-sky-600">log in.</Link>
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleRegister}>
            {error && <Alert message={error} />}
            {success && <Alert message={success} type={"alert-success"} />}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="test"
                placeholder="name"
                className="input input-bordered"
                autoFocus
                value={formRegis.name}
                onChange={(e) => setFormRegis({ ...formRegis, name: e.target.value })}
                required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                autoFocus
                value={formRegis.email}
                onChange={(e) => setFormRegis({ ...formRegis, email: e.target.value })}
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
                value={formRegis.password}
                onChange={(e) => setFormRegis({ ...formRegis, password: e.target.value })}
                required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="confirm password"
                className="input input-bordered"
                value={formRegis.confirmPassword}
                onChange={(e) => setFormRegis({ ...formRegis, confirmPassword: e.target.value })}
                required />
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

export default Register