const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db.js");
const session = require("express-session");
const bcryptjs = require("bcryptjs");
const pgSession = require('connect-pg-simple')(session);
const bodyParser = require("body-parser");

const port = 5000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000', // React app origin
    credentials: true // Enable sending cookies with requests
}));
app.use(express.json());

app.use(session({
    store: new pgSession({
        pool: pool,                // Connection pool
        tableName: 'session'       // Use another table-name than the default "session" one
    }),
    secret: 'AdamHermes@#J#LKJLfkjdsfo',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, sameSite: 'lax' }
}));

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    if (req.session.user_id) {
        return next();
    } else {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

// Routes
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (result.rows.length === 0) {
            return res.status(400).json({ message: "Invalid username" });
        }
        const user = result.rows[0];
        const match = await bcryptjs.compare(password, user.upassword);
        if (!match) {
            return res.status(400).json({ message: "Invalid password" });
        }
        console.log("Username: ",user.username);
        console.log("User id: ", user.user_id);
        req.session.user_id = user.user_id;
        res.json({ id: user.user_id, message: "Login Successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/todos", isAuthenticated, async (req, res) => {
    try {
        const { description } = req.body;
        const userId = req.session.user_id;
        const newTodo = await pool.query(
            "INSERT INTO todos (user_id, description) VALUES($1,$2) RETURNING *",
            [userId, description]
        );
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

app.get("/todos", isAuthenticated, async (req, res) => {
    try {
        const userId = req.session.user_id;
        const allTodos = await pool.query(
            "SELECT * FROM todos WHERE user_id = ($1)",
            [userId]
        );
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/todos/:todo_id', isAuthenticated, async (req, res) => {
    try {
        const userId = req.session.user_id;
        const todoId = parseInt(req.params.todo_id);
        const aTodo = await pool.query(
            "SELECT * FROM todos WHERE user_id = ($1) AND todo_id = ($2)",
            [userId, todoId]
        );
        res.json(aTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/todos/:todo_id", isAuthenticated, async (req, res) => {
    try {
        const userId = req.session.user_id;
        const todoId = parseInt(req.params.todo_id);
        const { description } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todos SET description = $1 WHERE user_id = $2 AND todo_id = $3",
            [description, userId, todoId]
        );
        res.json("Todo was updated.");
    } catch (err) {
        console.error(err.message);
    }
});

app.delete('/todos/:todo_id', isAuthenticated, async (req, res) => {
    try {
        const userId = req.session.user_id;
        const todoId = parseInt(req.params.todo_id);
        await pool.query(
            "DELETE FROM todos WHERE user_id = $1 AND todo_id = $2",
            [userId, todoId]
        );
        res.json("Todo was deleted");
    } catch (err) {
        console.error(err.message);
    }
});

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const checkExist = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );
        if (checkExist.rows.length > 0) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const register = await pool.query(
            "INSERT INTO users (username, upassword) VALUES($1, $2) RETURNING *",
            [username, hashedPassword]
        );
        res.json("Register Successfully.");
    } catch (err) {
        console.error(err.message);
    }
});
// Logout route
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Error destroying session:", err);
            res.status(500).json({ message: "Server error" });
        } else {
            res.clearCookie('connect.sid'); // Clear session cookie
            res.json({ message: "Logout successful" });
        }
    });
});

app.listen(port, () => {
    console.log("Server has started on port", port);
});
