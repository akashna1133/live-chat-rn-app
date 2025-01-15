import React, {useEffect, useState} from "react";
import { socket } from "../socket";

const ChatSideMenu = ({ users, selectedUser, setSelectedUser, messages, addUser }) => {
  const [newUserName, setNewUserName] = React.useState("");

  const handleAddUser = () => {
    if (newUserName.trim()) {
      addUser(newUserName);
      setNewUserName("");
    }
  };

  const getLastMessage = (userId) => {
    const userMessages = messages[userId] || [];
    if (userMessages.length === 0) return "No messages";
    return userMessages[userMessages.length - 1].text;
  };

  const countUnreadMessages = (userId) => {
    const userMessages = messages[userId] || [];
    return userMessages.filter((message) => message.sender !== "me").length;
  };

  return (
    <div className="border-end p-3" style={{ width: "300px", height: "100vh", overflowY: "auto" }}>
      <h5>Users</h5>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${selectedUser?.id === user.id ? "active" : ""
              }`}
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedUser(user)}
          >
            <div>
              <div>{user.name}</div>
              <small className="text-muted">{getLastMessage(user.id)}</small>
            </div>
            {countUnreadMessages(user.id) > 0 && (
              <span className="badge bg-danger rounded-pill">
                {countUnreadMessages(user.id)}
              </span>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add new user"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <button className="btn btn-primary mt-2 w-100" onClick={handleAddUser}>
          Add User
        </button>
      </div>
    </div>
  );
};

export default ChatSideMenu;

