const setupSocket = (server) => {
    const socketIO = require("socket.io");
    const io = socketIO(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
  
    io.on("connection", (socket) => {
      console.log(`Socket connected: ${socket.id}`);
  
      // Listen for private messages
      socket.on("privateMessage", (data) => {
        const { to, message } = data;
        io.to(to).emit("receiveMessage", { from: socket.id, message });
      });
  
      // Listen for group messages
      socket.on("groupMessage", (data) => {
        const { groupId, message } = data;
        io.to(groupId).emit("receiveMessage", { from: socket.id, message });
      });
  
      // Handle disconnection
      socket.on("disconnect", () => {
        console.log(`Socket disconnected: ${socket.id}`);
      });
    });
  
    return io;
  };
  
  module.exports = setupSocket;
  