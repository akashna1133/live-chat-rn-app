import React, { useState } from "react";
import ChatSideMenu from "../components/ChatSideMenu";
import ChatMessagePanel from "../components/ChatMessagePanel";

const ChatPage = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ]);

  const [selectedUser, setSelectedUser] = useState(null); // Stores the currently selected user
  const [messages, setMessages] = useState({
    1: [
      { text: "Hi Alice!", sender: "me" },
      { text: "Hello!", sender: "Alice" },
    ],
    2: [
      { text: "Hi Bob!", sender: "me" },
      { text: "Hey there!", sender: "Bob" },
    ],
  });

  // Add a new user
  const addUser = (name) => {
    const newUserId = users.length + 1;
    setUsers([...users, { id: newUserId, name }]);
    setMessages({ ...messages, [newUserId]: [] });
  };

  // Send a message to the selected user
  const sendMessage = (text) => {
    if (selectedUser) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedUser.id]: [
          ...(prevMessages[selectedUser.id] || []),
          { text, sender: "me" },
        ],
      }));
    }
  };

  return (
    <div className="d-flex vh-100">
      {/* Chat Side Menu */}
      <ChatSideMenu
        users={users}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        addUser={addUser}
        messages={messages}
      />

      {/* Chat Message Panel */}
      {selectedUser ? (
        <ChatMessagePanel
          selectedUser={selectedUser}
          messages={messages[selectedUser.id] || []}
          sendMessage={sendMessage}
        />
      ) : (
        <div className="flex-grow-1 d-flex align-items-center justify-content-center">
          <h5>Select a user to start chatting</h5>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
