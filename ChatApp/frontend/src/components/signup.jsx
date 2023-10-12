import { useRef } from "react";
import { signup } from "../utils/auth";

function SignUp() {
    const email = useRef('');
    const firstName = useRef('');
    const lastName = useRef('');
    return (
        <form className='col-lg-4 col-md-6 col-sm-10 mx-auto p-2 mt-4' onSubmit={(e)=>{
            e.preventDefault();
            signup(email.current.value,firstName.current.value,lastName.current.value);
        }}>
            <div className='mb-3 col-lg-8 col-md-8 col-sm-8'>
                <label htmlFor='firstName' className='form-label'>
                    Frist Name:
                </label>
                <input
                    type='text'
                    className='form-control'
                    id='firstName'
                    ref={firstName}
                    required
                />
            </div>
            <div className='mb-3 col-lg-8 col-md-8 col-sm-8'>
                <label htmlFor='lastName' className='form-label'>
                    Last Name:
                </label>
                <input
                    type='text'
                    className='form-control'
                    id='lastName'
                    ref={lastName}
                    required
                />
            </div>
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
            <button type='submit' className='btn btn-primary col-lg-auto col-md-auto'>
                Create new Account
            </button>
            <button
                type='button'
                className='btn btn-primary ms-4 col-lg-2 col-md-2'
                onClick={() => {
                    window.location.replace("/login");
                }}
            >
                Login
            </button>
        </form>
    );
}

export default SignUp;
