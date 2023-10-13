function AvailableUser({ user, selectedChat, setSelectedChat }) {
    return (
        <div
            className={`border-bottom border-secondary-subtle ${
                user.email === selectedChat.email ? "active" : ""
            }`}
            onClick={() => {
                setSelectedChat(user);
            }}
        >
            <p className='m-0 p-0 ps-2 ' style={{ fontSize: "18px" }}>
                {user.firstName}
            </p>
        </div>
    );
}

export default AvailableUser;
