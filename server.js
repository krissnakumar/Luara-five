import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/uploads', express.static('public/uploads'));

// Serve static files from the Vite build directory
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'public/uploads';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

const MESSAGES_FILE = 'messages.json';

// Get messages
app.get('/api/messages', (req, res) => {
  if (!fs.existsSync(MESSAGES_FILE)) {
    return res.json([]);
  }
  const data = fs.readFileSync(MESSAGES_FILE);
  res.json(JSON.parse(data));
});

// Post message
app.post('/api/messages', upload.single('photo'), (req, res) => {
  const { name, content } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  const newMessage = {
    id: Date.now(),
    name,
    content,
    photo,
    timestamp: new Date().toISOString(),
    likes: 0
  };

  let messages = [];
  if (fs.existsSync(MESSAGES_FILE)) {
    messages = JSON.parse(fs.readFileSync(MESSAGES_FILE));
  }
  messages.unshift(newMessage);
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));

  res.status(201).json(newMessage);
});

// Like message
app.post('/api/messages/:id/like', (req, res) => {
  const id = parseInt(req.params.id);
  if (fs.existsSync(MESSAGES_FILE)) {
    let messages = JSON.parse(fs.readFileSync(MESSAGES_FILE));
    const msg = messages.find(m => m.id === id);
    if (msg) {
      msg.likes++;
      fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
      return res.json(msg);
    }
  }
  res.status(404).send('Message not found');
});

// Catch-all to serve index.html for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
