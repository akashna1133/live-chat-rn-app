import React, { useEffect, useState } from "react";
import ChatSideMenu from "../components/ChatSideMenu";
import ChatMessagePanel from "../components/ChatMessagePanel";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

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
  // const sendMessage = (text) => {
  //   if (selectedUser) {
  //     setMessages((prevMessages) => ({
  //       ...prevMessages,
  //       [selectedUser.id]: [
  //         ...(prevMessages[selectedUser.id] || []),
  //         { text, sender: "me" },
  //       ],
  //     }));
  //   }
  // };

  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Assuming user has logged in and has a valid token
    const token = localStorage.getItem("authToken");

    // if (!token) {
    //   // If no token is found, redirect to login page
    //   navigate("/login");
    //   return;
    // }

    // // Create socket connection and send token for authentication
    // const newSocket = io("http://localhost:3001", {
    //   query: { token },
    // });

    // setSocket(newSocket);

    // newSocket.on("connect", () => {
    //   console.log("Connected to server with socket ID:", newSocket.id);
    // });

    // newSocket.on("disconnect", () => {
    //   console.log("Disconnected from server");
    // });

    // return () => {
    //   newSocket.disconnect(); // Cleanup on component unmount
    // };
  }, [navigate]);

  useEffect(() => {
    // createConnection();
  }, [])

  const createConnection = async () => {
    try {
      const token = localStorage.getItem('authToken');
      console.log('Creating is token:: ',token )
      
      const response = await axios.post('http://localhost:3001/api/socket/createconnect', {}, {
        headers: {
          Authorization: `Bearer ${token}`,  // Send the auth token for validation
        }
      });
  
      console.log('Connection created:', response.data);
    } catch (err) {
      console.error('Error creating connection:', err);
    }
  };

  // Example sending message functionality
  const sendMessage = (message) => {
    socket.emit("sendMessage", message);
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
