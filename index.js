const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');

// DATA VERIFIKASI ANDA
const TOKEN = '8473522505:AAGxSA8rdpuygPOnSRsrAhVympkppo9HRH0'; 
const WEB_APP_URL = 'https://swiftbit-quest-game.netlify.app'; 

const bot = new TelegramBot(TOKEN, { polling: true });
const app = express();

app.use(cors());
app.use(express.json());

// Endpoint untuk memicu pesan undangan dari Web App
app.post('/api/invite', async (req, res) => {
    const { userId, name } = req.body;
    
    try {
        const text = `Halo ${name}! 🚀\n\nSiap jadi Sultan? Ajak temanmu bergabung di SwiftBit Quest dan dapatkan bonus instan +50.000 Koin! 💰`;
        
        // Link untuk membagikan bot ke chat lain
        const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(WEB_APP_URL)}&text=${encodeURIComponent('Main SwiftBit Quest yuk! Game penghasil saldo DANA tercepat 2025.')}`;
        
        const opts = {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '🎮 Main Sekarang', web_app: { url: WEB_APP_URL } }],
                    [{ text: '↗️ Bagikan ke Teman', url: shareUrl }]
                ]
            }
        };

        await bot.sendMessage(userId, text, opts);
        res.status(200).send({ success: true, message: 'Undangan terkirim!' });
    } catch (e) {
        console.error(e);
        res.status(500).send({ success: false, error: e.message });
    }
});

// Menangani perintah /start di Telegram
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Selamat datang di SwiftBit Quest! Tekan tombol di bawah untuk mulai menambang koin.", {
        reply_markup: {
            inline_keyboard: [[{ text: "Buka Game 🚀", web_app: { url: WEB_APP_URL } }]]
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server SwiftBit Quest aktif di port ${PORT}`);
});
