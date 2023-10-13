import { useRef } from "react";
import { login } from "../utils/auth";

import welcome from '../images/welcome.png';

function Login() {
    const email = useRef("");
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
                                login(email.current.value);
                            }}
                        >
                            <h2 className="mb-4">Login</h2>
                            <div className=''>
                                <label htmlFor='email' className='form-label'>
                                    Email
                                </label>
                                <input
                                    type='email'
                                    className='form-control'
                                    id='email'
                                    placeholder="Enter your email address"
                                    ref={email}
                                    required
                                />
                            </div>
                            <button type='submit' className='btn btn-primary btn-sm my-4 px-4'>
                                Login
                            </button>
                            <p className="mb-0">Not yet a member?</p>
                            <a href="/signup">Register Here</a>
                        </form>
                    </div>
                    <div className='col-6'>
                        <img src={welcome} alt="welcome img-fluid mx-auto" style={{height:'auto',width:'100%',marginTop:'20%',transform:'scale(1.5)'}} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
