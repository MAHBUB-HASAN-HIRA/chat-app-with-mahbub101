const express = require("express");
const app = express();
const expressServer = require("http").createServer(app);
const io = require("socket.io")(expressServer, {
	cors: {
		origin: "https://chat-app-with-mahbub101.netlify.app",
		methods: ["GET", "POST"],
	},
});
const port = 5050;
const { addUser, removeUser, getUserById, getRoomUsers } = require("./users");

io.on("connection", (socket) => {
	socket.on("join", ({ name, room }, callback) => {
		if (name !== "" && name !== undefined) {
			if (room !== "" && room !== undefined) {
				const { error, user } = addUser({ id: socket.id, name, room });
				if (error) {
					callback(error);
				}
				socket.join(room);
				socket.emit("welcomeMsg", {
					user: "System",
					text: `Welcome  ${name} to ${room}`,
				});

				socket.broadcast.to(room).emit("welcomeMsg", {
					user: "System",
					text: `${name} just join ${room}`,
				});

				const roomUsers = getRoomUsers(room);
				io.to(room).emit("userList", { roomUsers: roomUsers });
			} else {
				callback("Please provide Room");
			}
		} else {
			callback("Please provide Your Name");
		}
	});

	socket.on("inputMsg", (payload) => {
		const user = getUserById(socket.id);
		io.to(user.room).emit("welcomeMsg", {
			user: user.name,
			text: payload,
		});
	});

	//remove a user when click the close button
	function removeFunc(id) {
		const user = removeUser(id);
		if (user) {
			io.to(user.room).emit("welcomeMsg", {
				user: "System",
				text: `${user.name} just disconnected`,
			});
			const roomUsers = getRoomUsers(user.room);
			io.to(user.room).emit("userList", { roomUsers: roomUsers });
		}
	}

	socket.on("removeUser", (socketId) => removeFunc(socketId));
	socket.on("disconnect", () => removeFunc(socket.id));
});

app.get("/", (req, res) => {
	res.send("Hello World!");
});

expressServer.listen( process.env.PORT || port);
