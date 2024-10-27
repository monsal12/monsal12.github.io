const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Koneksi ke MongoDB
const uri = 'mongodb+srv://Monsa:terdes1234@cluster0.zaqhu.mongodb.net/MembuatWebsite';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Koneksi ke MongoDB berhasil!'))
    .catch(err => console.log('Koneksi ke MongoDB gagal:', err));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Model Journal
const Journal = require('./models/Journal');

// Rute untuk halaman utama
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Rute untuk menyimpan entri harian
app.post('/api/journal', async (req, res) => {
    const { entry, mood } = req.body;
    const journalEntry = new Journal({ entry, mood });
    try {
        await journalEntry.save();
        res.status(201).json({ message: 'Entri berhasil disimpan!' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menyimpan entri.' });
    }
});

// Mulai server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});