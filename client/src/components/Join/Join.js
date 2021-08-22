import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Join = () => {
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");
	const history = useHistory();

	const submitForm = (e) => {
		e.preventDefault();
		if (name === "") {
			alert("Please Enter Your Name");
		} else {
			if (room === "") {
				alert("Please Enter Room Name");
			} else {
				history.push(`/chat?name=${name}&room=${room}`);
			}
		}
	};

	return (
		<div className="join_container">
			<div className="join">
				<h1>Joining...</h1>
				<form className="join-form" onSubmit={(e) => submitForm(e)}>
					<input
						type="text"
						name="name"
						onChange={(e) => setName(e.target.value)}
						id="name"
						placeholder="Enter Your Name"
					/>
					<input
						type="text"
						name="chat"
						onChange={(e) => setRoom(e.target.value)}
						id="chat"
						placeholder="Enter Room Name"
					/>
					<button type="submit">join</button>
				</form>
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

export default Join;
