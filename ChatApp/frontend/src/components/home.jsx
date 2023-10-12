/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";

import hubConnection, { startHubConnection } from "../services/signalrService";
import { logout } from "../utils/auth";
import ChatList from "./chatlist";
import Conversation from "./conversation";
import EmptySelect from "./emptySelect";

function Home() {
    const [email, setEmail] = useState();
    const [users, setUsers] = useState([]);
    const [selectedChat, setSelectedChat] = useState({ email: "" });
    const [currentUser, setCurrentUser] = useState({});

    const getUsers = async () => {
        try {
            const res = await axios(`http://localhost:5036/api/User/`);
            if (res.status === 200) {
                let allUser = Object.values(res.data);
                const currentEmail = localStorage.getItem("email");
                allUser.forEach((el) => {
                    if (el.email === currentEmail) setCurrentUser(el);
                    else {
                        return;
                    }
                });
                allUser = allUser.filter((el) => el.email !== currentEmail);
                setUsers(allUser);
            }
            //console.log(typeof Object.values(res.data));
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        setEmail(localStorage.getItem("email"));
        getUsers();
        startHubConnection();
        hubConnection.on("ReceiveNewUser", getUsers);
        return () => {
            hubConnection.off("ReceiveNewUser");
        };
    }, [email]);

    return (
        <div className='col-lg-6 col-md-8 col-sm-10 mx-auto mt-3'>
            <div className='container mb-3'>
                <div className='d-flex justify-content-end'>
                    <button
                        type='button'
                        className='btn btn-outline-primary rounded-pill'
                        disabled
                    >
                        {`${currentUser.firstName} ${currentUser.lastName}`}
                    </button>
                    <button
                        type='button'
                        className='btn btn-outline-danger ms-3'
                        onClick={() => logout()}
                    >
                        Logout
                    </button>
                </div>
            </div>
            <div
                className='border border-primary rounded row'
                style={{ height: "650px" }}
            >
                <div className='col-4 border border-primary rounded p-0'>
                    <h3 className='text-center'>Chats</h3>
                    <ul className='list-group'>
                        {users.map((user) => (
                            <ChatList
                                user={user}
                                key={user.email}
                                selectedChat={selectedChat}
                                setSelectedChat={setSelectedChat}
                            />
                        ))}
                    </ul>
                </div>
                {selectedChat.email === "" ? (
                    <EmptySelect />
                ) : (
                    <Conversation
                        selectedChat={selectedChat}
                        hubConnection={hubConnection}
                    />
                )}
            </div>
        </div>
    );
}

export default Home;
