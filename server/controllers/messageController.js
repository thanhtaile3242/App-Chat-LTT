import Message from "../models/messageModel.js";
export const addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await Message.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        });
        if (data) {
            return res.json({
                status: true,
                message: "Message added successfully",
            });
        } else {
            return res.json({
                status: false,
                message: "Failed to add message to the database",
            });
        }
    } catch (error) {
        console.error(error);
        return res.json({
            status: false,
            message: "Internal Server Error",
        });
    }
};

export const getAllMessage = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        const message = await Message.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 });
        const projectMessages = message.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });
        return res.json(projectMessages);
    } catch (error) {
        return res.json({
            status: false,
            message: "Internal Server Error",
        });
    }
};
