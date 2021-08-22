import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client";

let socket;
const Chat = () => {
	let { search } = useLocation();
	const history = useHistory();
	const { name, room } = queryString.parse(search);
	const [userId, setUserId] = useState(null);
	const [inputMsg, setInputMsg] = useState("");
	const [activeUsers, setActiveUsers] = useState([]);
	const [serverMsg, setServerMsg] = useState([]);

	const sendMessage = () => {
		if (inputMsg) {
			socket.emit("inputMsg", inputMsg);
			setInputMsg("");
		}
	};

	const removeUser = (id) => {
		socket.emit("removeUser", id);
		history.push("/");
		socket.disconnect();
		socket.close();
	};

	useEffect(() => {
		socket = io("https://chat-app-with-mahbub101.herokuapp.com/");
		socket.on("connect", () => {
			socket.emit("join", { name, room }, (error) => {
				if (error) {
					alert(error);
					history.push("/");
				}
			});
			socket.on("userList", ({ roomUsers }) => {
				setActiveUsers(roomUsers);
			});
			socket.on("welcomeMsg", (data) => {
				setServerMsg((existingMessage) => [...existingMessage, data]);
			});
			setUserId(socket.id);
		});
	}, []);

	return (
		<div className="chat_container">
			<div className="chat">
				<div className="chat_body">
					<div className="user-list">
						<div className="ac_user">Active Users</div>
						{activeUsers.map((user) => (
							<div key={user.id} className="ac_user_name">
								<span className="dot"></span>
								{user.name}
							</div>
						))}
					</div>

					<div className="chat-section">
						<div className="chat-head">
							<div className="room">Welcome to: {room}</div>
							<Link onClick={() => removeUser(userId)} to="#">
								X
							</Link>
						</div>
						<div className="chat-box">
							<ScrollToBottom className="messages">
								{serverMsg.map((msg, index) => (
									<div
										key={index}
										className={`message ${
											name.trim().toLowerCase() ===
											msg.user.trim().toLowerCase()
												? "self"
												: ""
										}`}
									>
										<span className="user">{msg.user}</span>
										<span className="message-text">{msg.text}</span>
										<span className='send_time'>{ new Date().toLocaleTimeString()}</span>
									</div>
								))}
							</ScrollToBottom>
							<div className="message_input">
								<div>
									<textarea
										type="textarea"
										placeholder="Type Your Message"
										onChange={(e) => setInputMsg(e.target.value)}
										value={inputMsg}
									/>
								</div>
								<div>
									<button onClick={sendMessage} type="submit">
										send
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="user-list for_mobile">
						<div className="ac_user_mobile">Active Users</div>
						{activeUsers.map((user) => (
							<div key={user.id} className="user_mobile">
								<span className="dot"></span>
								{user.name}
							</div>
						))}
					</div>
				</div>
				<a
					className="mahbub_com"
					href="https://mahbubhasanhira.com/"
					rel="noreferrer"
					target="_blank"
				>
					By- Mahbub Hasan Hira
				</a>
			</div>
		</div>
	);
};

export default Chat;
