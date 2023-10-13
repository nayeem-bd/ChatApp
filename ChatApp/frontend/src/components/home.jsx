/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";

import hubConnection, { startHubConnection } from "../services/signalrService";
import { logout } from "../utils/auth";
import ChatList from "./chatlist";
import Conversation from "./conversation";
import EmptySelect from "./emptySelect";
import AvailableUser from "./availableUser";

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
        <div style={{ backgroundColor: "#f8f8f8", height: "730px" }}>
            <div className='p-3 pt-2' style={{ backgroundColor: "#f8f8f8" }}>
                <div
                    className='shadow-sm rounded mx-auto row'
                    style={{
                        width: "95%",
                        height: "700px",
                        backgroundColor: "#ececec",
                    }}
                >
                    <div className='col-3 pe-1'>
                        <div className='border border-top-0 border-start-0 border-secondary-subtle'>
                            <div className='mb-2'>
                                <p className='mb-0 d-inline-flex fs-4'>{`${currentUser.firstName} ${currentUser.lastName}`}</p>
                                <i
                                    className='fa fa-sign-out float-end text-center p-2 fs-4 pe-2'
                                    style={{ cursor: "pointer" }}
                                    onClick={() => logout()}
                                ></i>
                            </div>
                            <p className='mb-1'>Conversations</p>
                        </div>
                        <div
                            className='border-end border-secondary-subtle'
                            style={{ height: "auto" }}
                        >
                            {users.map((user) => (
                                <ChatList
                                    user={user}
                                    key={user.email}
                                    selectedChat={selectedChat}
                                    setSelectedChat={setSelectedChat}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='border border-secondary-subtle col-6 px-0'>
                        {selectedChat.email === "" ? (
                            <EmptySelect />
                        ) : (
                            <Conversation
                                selectedChat={selectedChat}
                                hubConnection={hubConnection}
                            />
                        )}
                    </div>
                    <div className='col-3 px-0'>
                        <div
                            className='border-bottom mx-0 border-secondary-subtle'
                            style={{ marginTop: "13px" }}
                        >
                            <p className='text-center fs-5'>Available Users</p>
                        </div>
                        <div>
                            {users.map((user) => (
                                <AvailableUser
                                    user={user}
                                    key={user.email}
                                    selectedChat={selectedChat}
                                    setSelectedChat={setSelectedChat}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
