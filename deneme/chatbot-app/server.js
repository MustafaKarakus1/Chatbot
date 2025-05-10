const app = require('./app'); // app.js dosyasını import et
const cors = require('cors');

app.use(cors());

// Sunucuyu başlat
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});