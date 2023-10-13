import { useRef } from "react";
import { signup } from "../utils/auth";
import coverImage from "../images/signupPageImage.png";

function SignUp() {
    const email = useRef("");
    const firstName = useRef("");
    const lastName = useRef("");
    return (
        <div style={{ backgroundColor: "#ececec", height: "730px" }}>
            <div
                className=''
                style={{ backgroundColor: "#ececec", paddingTop: "10%" }}
            >
                <div className='rounded shadow mx-auto main-container row'>
                    <div className='col-6'>
                        <form
                            className='m-4'
                            onSubmit={(e) => {
                                e.preventDefault();
                                signup(
                                    email.current.value,
                                    firstName.current.value,
                                    lastName.current.value
                                );
                            }}
                        >
                            <h2 className='mb-4'>Register</h2>
                            <div className=''>
                                <label
                                    htmlFor='firstName'
                                    className='form-label'
                                >
                                    Frist Name
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='firstName'
                                    placeholder='Enter your frist name'
                                    ref={firstName}
                                    required
                                />
                            </div>
                            <div className=''>
                                <label
                                    htmlFor='lastName'
                                    className='form-label'
                                >
                                    Last Name
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='lastName'
                                    placeholder='Enter your last name'
                                    ref={lastName}
                                    required
                                />
                            </div>
                            <div className=''>
                                <label htmlFor='email' className='form-label'>
                                    Email
                                </label>
                                <input
                                    type='email'
                                    className='form-control'
                                    id='email'
                                    placeholder='Enter your email address'
                                    ref={email}
                                    required
                                />
                            </div>
                            <button
                                type='submit'
                                className='btn btn-primary btn-sm mt-4 px-4'
                            >
                                Sign Up
                            </button>
                            <p className='mt-2'>
                                Already a member?
                                <a href='/login'>Register Here</a>
                            </p>
                        </form>
                    </div>
                    <div className='col-6'>
                        <img
                            src={coverImage}
                            alt='welcome img-fluid mx-auto'
                            style={{
                                height: "auto",
                                width: "100%",
                                marginTop: "-10px",
                                transform: "scale(1.5)",
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
