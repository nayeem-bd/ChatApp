function ChatList({ user, selectedChat, setSelectedChat }) {
    return (
        <li
            className={`list-group-item border-secondary rounded-0 ${
                user.email === selectedChat.email ? "active" : ""
            }`}
            onClick={()=>{
                setSelectedChat(user);
            }}
        >
            {`${user.firstName} ${user.lastName}`}
        </li>
    );
}

export default ChatList;
