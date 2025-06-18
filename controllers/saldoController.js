const { Saldo, SaldoLog } = require('../models');

module.exports = {
  async tambahSaldo(req, res) {
    try {
      const { jumlah, tanggal } = req.body;

      if (!jumlah || !tanggal) {
        return res.status(400).json({ error: 'Jumlah dan tanggal wajib diisi' });
      }

      // Ubah menjadi float yang aman (jaga-jaga input string koma)
      const jumlahParsed = parseFloat(String(jumlah).replace(',', '.'));
      if (isNaN(jumlahParsed) || jumlahParsed <= 0) {
        return res.status(400).json({ error: 'Jumlah tidak valid' });
      }

      // Simpan ke log
      await SaldoLog.create({
        tipe: 'tambah',
        jumlah: jumlahParsed,
        tanggal
      });

      // Ambil dan update saldo total
      let saldo = await Saldo.findByPk(1);
      if (saldo) {
        saldo.total = parseFloat(saldo.total) + jumlahParsed;
        await saldo.save();
      } else {
        await Saldo.create({ id: 1, total: jumlahParsed });
      }

      res.status(201).json({ message: 'Saldo berhasil ditambahkan' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async kurangSaldo(req, res) {
    try {
      const { jumlah, tanggal } = req.body;

      if (!jumlah || !tanggal) {
        return res.status(400).json({ error: 'Jumlah dan tanggal wajib diisi' });
      }

      const jumlahParsed = parseFloat(String(jumlah).replace(',', '.'));
      if (isNaN(jumlahParsed) || jumlahParsed <= 0) {
        return res.status(400).json({ error: 'Jumlah tidak valid' });
      }

      const saldo = await Saldo.findByPk(1);
      if (!saldo || parseFloat(saldo.total) < jumlahParsed) {
        return res.status(400).json({ error: 'Saldo tidak cukup' });
      }

      await SaldoLog.create({
        tipe: 'kurang',
        jumlah: jumlahParsed,
        tanggal
      });

      saldo.total = parseFloat(saldo.total) - jumlahParsed;
      await saldo.save();

      res.status(201).json({ message: 'Saldo berhasil dikurangi' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getSaldo(req, res) {
    try {
      const saldo = await Saldo.findByPk(1);
      res.status(200).json(saldo || { id: 1, total: 0 });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  // Tambahkan ke saldoController.js
async getLogs(req, res) {
  try {
    const logs = await SaldoLog.findAll({ order: [['tanggal', 'ASC']] });
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
};
