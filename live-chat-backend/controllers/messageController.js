const messages = []; // Temporary in-memory storage

exports.sendMessage = (req, res) => {
  const { fromUserId, toUserId, content } = req.body;
  const message = { id: uuidv4(), fromUserId, toUserId, content, timestamp: new Date() };
  messages.push(message);
  res.status(201).json({ message: "Message sent successfully", data: message });
};

exports.getMessages = (req, res) => {
  res.status(200).json(messages);
};
