const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // ✅ Tambahkan ini
const saldoRoutes = require('./routes/saldoRoutes');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // ✅ Aktifkan CORS
app.use(bodyParser.json());

// Routes
app.use('/api', saldoRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('API Saldo berjalan...');
});

// Sync DB & Start Server
sequelize.sync()
  .then(() => {
    console.log('Database berhasil tersambung.');
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Gagal menyambungkan ke database:', err);
  });
