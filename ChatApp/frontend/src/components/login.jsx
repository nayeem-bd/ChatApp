import { useRef } from "react";
import { login} from "../utils/auth";

function Login() {
    const email = useRef('');
    return (
        <form className='col-lg-4 col-md-6 col-sm-10  mx-auto p-2 mt-4' onSubmit={(e)=>{
            e.preventDefault();
            login(email.current.value);
        }}>
            <div className='mb-3 col-lg-8 col-md-8 col-sm-8'>
                <label htmlFor='email' className='form-label'>
                    Email address
                </label>
                <input
                    type='email'
                    className='form-control'
                    id='email'
                    ref={email}
                    required
                />
            </div>
            <button type='submit' className='btn btn-primary col-lg-2 col-md-2'>
                Login
            </button>
            <button
                type='button'
                className='btn btn-primary ms-4 col-lg-auto col-md-auto'
                onClick={() => {
                    window.location.replace("/signup");
                }}
            >
                Create New Account
            </button>
        </form>
    );
}

export default Login;
