import express from "express";
import cors from "cors";

const users = [
	{ id: 1, name: "John Doe", email: "john.doe@example.com" },
	{ id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
	{ id: 3, name: "Alice Johnson", email: "alice.johnson@example.com" },
	{ id: 4, name: "Bob Brown", email: "bob.brown@example.com" },
	{ id: 5, name: "Charlie Davis", email: "charlie.davis@example.com" },
	{ id: 6, name: "Diana Evans", email: "diana.evans@example.com" },
	{ id: 7, name: "Ethan Foster", email: "ethan.foster@example.com" },
];

const app = express();
const PORT = 5050;
app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
	res.json(users);
});

app.get("/users/random", (req, res) => {
	const randomIndex = Math.floor(Math.random() * users.length);
	const randomUser = users[randomIndex];
	res.json(randomUser);
});

app.get("/users/:id", (req, res) => {
	const userId = parseInt(req.params.id);
	const user = users.find((u) => u.id === userId);
	if (user) {
		res.json(user);
	} else {
		res.status(404).json({ error: "User not found" });
	}
});

app.post("/users", express.json(), (req, res) => {
	const newUser = {
		id: users[users.length - 1].id + 1,
		name: req.body.name,
		email: req.body.email,
	};
	users.push(newUser);
	res.status(201).json(newUser);
});

app.put("/users/:id", express.json(), (req, res) => {
	const userId = parseInt(req.params.id);
	const userIndex = users.findIndex((u) => u.id === userId);
	if (userIndex !== -1) {
		const updatedUser = {
			id: userId,
			name: req.body.name,
			email: req.body.email,
		};
		users[userIndex] = updatedUser;
		res.json(updatedUser);
	} else {
		res.status(404).json({ error: "User not found" });
	}
});

app.delete("/users/:id", (req, res) => {
	const userId = parseInt(req.params.id);
	const userIndex = users.findIndex((u) => u.id === userId);
	if (userIndex !== -1) {
		const deletedUser = users.splice(userIndex, 1)[0];
		res.status(204).json({ message: "User deleted successfully" });
	} else {
		res.status(404).json({ error: "User not found" });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
