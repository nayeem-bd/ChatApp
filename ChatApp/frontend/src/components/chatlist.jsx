function ChatList({ user, selectedChat, setSelectedChat }) {
    return (
        <div
            className={`border-bottom border-secondary-subtle row me-0 ${
                user.email === selectedChat.email ? "active" : ""
            }`}
            style={{ height: "55px" }}
            onClick={() => {
                setSelectedChat(user);
            }}
        >
            <div
                className='rounded-circle col-2 mt-1 ms-1'
                style={{
                    backgroundColor: "#8d2ce5",
                    width: "45px",
                    height: "45px",
                }}
            >
                <p
                    className='fs-4 text-center mt-1 fw-bold'
                    style={{ color: "white" }}
                >
                    {user.firstName[0].toUpperCase()}
                </p>
            </div>
            <div className='col-10' style={{ display: "block" }}>
                <p className='m-0 p-0' style={{ fontSize: "20px" }}>
                    {user.firstName}
                </p>
                <p className='m-0 p-0 opacity-75'>hello world</p>
            </div>
        </div>
    );
}

export default ChatList;
