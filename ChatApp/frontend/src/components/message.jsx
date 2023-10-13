function Message({ message }) {
    const sender = localStorage.getItem("email");

    const senderView = () => {
        return (
            <div className='text-end pb-1 me-2'>
                <p
                    className='border rounded p-2'
                    style={{ background: "#0d8b7a", display: "inline-block" }}
                >
                    {message.messageText}
                </p>
            </div>
        );
    };
    const receiverView = () => {
        return (
            <div className='text-start pb-1 ms-2'>
                <p
                    className='border rounded p-2'
                    style={{ background: "#4185b4", display: "inline-block" }}
                >
                    {message.messageText}
                </p>
            </div>
        );
    };

    return sender === message.sender ? senderView() : receiverView();
}

export default Message;
