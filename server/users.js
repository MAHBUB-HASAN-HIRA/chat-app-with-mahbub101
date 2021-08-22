let users = [];

const addUser = ({ id, name, room }) => {
	name = name;
	room = room;

	const existingUser = users.find(
		(user) => user.name.trim().toLowerCase() === name.trim().toLowerCase() && user.room.trim().toLowerCase() === room.trim().toLowerCase()
	);

	if (existingUser) {
		return { error: "User already exists!" };
	} else {
		const user = {
			id,
			name,
			room,
		};

		users.push(user);

		return user;
	}
};

const removeUser = (id) => {
	const index = users.findIndex((user) => user.id === id);

	if (index !== -1) {
		return users.splice(index, 1)[0];
	}
};

const getUserById = (id) => {
	const user = users.find((user) => user.id === id);
	return user;
};

const getRoomUsers = (room) => {
	const roomUsers = users.filter((user) => user.room === room);
	return roomUsers;
};

module.exports = {
	addUser,
	removeUser,
	getUserById,
	getRoomUsers,
};
