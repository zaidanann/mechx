const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();
const path = require('path');
const imagesPath = "/public/image/js"

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Menentukan folder views

// Routes halaman html start
app.get('/index', (req, res) => {
    res.render('index'); 
});

app.get('/register', (req, res) => {
    res.render('register'); 
});

app.get("/fixtol", (req, res) => {
    res.render("fixtol")
})

app.get("/comunity", (req, res) => {
    res.render("comunity")
})

app.get("/store", (req, res) => {
    res.render("store")
})

app.get("/contribute", (req, res) => {
    res.render("contribute")
})

app.get("/participate", (req, res) => {
    res.render("participate")
})

app.get("/fixtolmotor", (req, res) => {
    res.render("fixtolmotor")
})


app.get("/fixtolmobil", (req, res) => {
    res.render("fixtolmobil")
})

app.get("/store1", (req, res) => {
    res.render("store1")
})

app.get("/store2", (req, res) => {
    res.render("store2")
})

app.get("/store3", (req, res) => {
    res.render("store3")
})

app.get("/fixtolmesin", (req, res) => {
    res.render("fixtolmesin")
})

app.get("/keranjang", (req, res) => {
    res.render("keranjang")
})

app.get("/chekout", (req, res) => {
    res.render("chekout")
})

app.get("/alamat", (req, res) => {
    res.render("alamat")
})

app.get("/update", (req, res) => {
    res.render("update")
})

// Routes halaman html end

app.post('/register', async (req, res) => {
    console.log('Request Body:', req.body); // Log semua data POST
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        console.error('Missing required fields:', { username, email, password });
        return res.status(400).send('All fields are required');
    }

    try {
        const salt = await bcrypt.genSalt(10);
        console.log('Generated Salt:', salt);

        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('Hashed Password:', hashedPassword);

        await prisma.user.create({
            data: { username, email, password: hashedPassword },
        });

        res.redirect('/login');
    } catch (err) {
        console.error('Error in registration process:', err.message);
        res.status(400).send('Error registering user');
    }
});


app.get('/login', (req, res) => {
    res.render('login', {path: imagesPath}); // Menggunakan EJS
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.redirect('/index');
        } else {
            res.status(400).send('Invalid email or password');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error logging in');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 

app.use(express.static(path.join(__dirname, 'public')));



