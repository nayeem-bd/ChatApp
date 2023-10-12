import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Message from "./message";

function Conversation({ selectedChat, hubConnection }) {
    const [messages, setMessages] = useState([]);
    const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
    const messageText = useRef("");
    const messageContainer = useRef(null);
    const sender = localStorage.getItem("email");

    const getMessages = async () => {
        const receiver = selectedChat.email;
        const api = `http://localhost:5036/api/message?sender=${sender}&receiver=${receiver}`;
        try {
            const res = await axios(api);
            if (res.status === 200) {
                const allMessages = Object.values(res.data);
                setMessages(allMessages);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        //const sender = localStorage.getItem("email");
        const receiver = selectedChat.email;
        const api = "http://localhost:5036/api/message";
        try {
            const res = await axios({
                url: api,
                method: "post",
                data: {
                    sender,
                    receiver,
                    messageText: messageText.current.value,
                },
            });
            if (res.status === 200) {
                messageText.current.value = "";
                getMessages();
                await hubConnection.invoke("SendMessage", receiver, "");
                setShouldScrollToBottom(true);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const deleteMessage = async (e)=>{
        e.preventDefault();
        const receiver = selectedChat.email;
        const api = `http://localhost:5036/api/message?sender=${sender}&receiver=${receiver}`;
        try {
            const res = await axios.delete(api);
            if (res.status === 200) {
                getMessages();
                await hubConnection.invoke("SendMessage", receiver, "");
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getMessages();
        hubConnection.on("ReceiveMessage", async (user, message) => {
            getMessages();
            setShouldScrollToBottom(true);
        });
    }, [selectedChat]);

    useEffect(() => {
        const container = messageContainer.current;

        const hasScrolledUpManually = () => {
            if (container) {
                return (
                    container.scrollTop + container.clientHeight <
                    container.scrollHeight
                );
            }
            return false;
        };
        const scrollToBottom = () => {
            if (container && shouldScrollToBottom) {
                container.scrollTop = container.scrollHeight;
            }
        };
        scrollToBottom();
        if (shouldScrollToBottom) {
            scrollToBottom();
        }
        const handleScroll = () => {
            if (hasScrolledUpManually()) {
                setShouldScrollToBottom(false);
            } else {
                setShouldScrollToBottom(true);
            }
        };

        container.addEventListener("scroll", handleScroll);
        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    }, [messages, shouldScrollToBottom]);

    return (
        <div className='col-8 border border-primary rounded p-2'>
            <div className='border align-middle p-2' style={{ height: "10%" }}>
                <p className='mb-0 d-inline-flex fs-4'>{`${selectedChat.firstName} ${selectedChat.lastName}`}</p>
                <i className='fa fa-trash float-end text-center p-2 fs-4' onClick={deleteMessage} style={{cursor:'pointer'}}></i>
            </div>
            <div
                className='border'
                style={{ height: "500px", overflowY: "auto" }}
                ref={messageContainer}
            >
                {messages.map((message) => (
                    <Message message={message} key={message.messageID} />
                ))}
            </div>
            <div className='row g-2 pt-2' style={{ height: "10%" }}>
                <div className='col-10'>
                    <div className='input-group'>
                        <input
                            type='text'
                            className='form-control'
                            id='messageInput'
                            placeholder='Enter message'
                            ref={messageText}
                        />
                    </div>
                </div>
                <div className='col-2'>
                    <button
                        type='button'
                        className='btn btn-primary'
                        onClick={sendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Conversation;
