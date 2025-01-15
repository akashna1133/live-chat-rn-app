import React, { useState, useEffect } from "react";
import { socket } from "../socket";

const ChatMessagePanel = ({ selectedUser, chatId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    // Function to handle sending messages
    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const message = {
                fromUserId: socket.id, // Sender ID
                toUserId: chatId, // Recipient ID
                content: newMessage,
                timestamp: new Date(),
            };

            // Emit message to the server
            socket.emit("sendMessage", message);

            // Add the message to the local state
            setMessages((prevMessages) => [...prevMessages, message]);
            setNewMessage("");
        }
    };

    useEffect(() => {
        // Listen for incoming messages
        socket.on("receiveMessage", (message) => {
            if (message.toUserId === chatId || message.fromUserId === chatId) {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        });

        // Cleanup the listener when the component unmounts or `chatId` changes
        return () => {
            socket.off("receiveMessage");
        };
    }, [chatId]);

    if (!selectedUser) {
        return (
            <div className="d-flex justify-content-center align-items-center h-100">
                <h5>Select a user to start chatting</h5>
            </div>
        );
    }

    return (
        <div className="flex-grow-1 d-flex flex-column">
            {/* Chat Header */}
            <div className="border-bottom p-3">
                <h5>Chat with {selectedUser.name}</h5>
            </div>

            {/* Chat History */}
            <div className="flex-grow-1 p-3 overflow-auto" style={{ backgroundColor: "#f8f9fa" }}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`d-flex ${message.fromUserId === socket.id ? "justify-content-end" : ""}`}
                    >
                        <div
                            className={`p-2 m-1 rounded ${message.fromUserId === socket.id ? "bg-primary text-white" : "bg-light"
                                }`}
                        >
                            {message.content}
                        </div>
                    </div>
                ))}
            </div>

            {/* Message Input */}
            <div className="border-top p-3">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={handleSendMessage}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatMessagePanel;