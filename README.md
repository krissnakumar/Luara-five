# Luara's 5th Birthday Adventure! 🦄🌈✨

A magical, interactive, and multilingual birthday website built for Luara's 5th birthday celebration in Mairiporã, SP.

## 🌟 Key Features
- **Multilingual Support**: Fully localized in English, Portuguese (BR), and Tamil.
- **Interactive Games**: 
  - 🎈 **Balloon Pop**: Test your reflexes!
  - 🧠 **Memory Match**: Find the pairs!
  - 🎂 **Cake Decorator**: Design the perfect birthday cake!
- **Magical Hero Gallery**: A professional studio-style enhanced slideshow featuring Luara in various magical settings.
- **Interactive Message Wall**: Guests can leave messages, upload photos, and "Love" other birthday wishes.
- **Dynamic Countdown**: Real-time counting down to April 24th, 2026, at 2:00 PM.
- **Surprise Box**: A hidden magical surprise for guests!

## 🛠️ Tech Stack
- **Frontend**: HTML5, Vanilla CSS (Glassmorphism), JavaScript (ES6+), Vite.
- **Backend**: Node.js, Express.
- **Animations**: Canvas-Confetti, CSS Keyframes.

## 🚀 Deployment on Render

This project is configured to run on [Render](https://render.com) as a Web Service.

### Step-by-Step Instructions:
1. **Push to GitHub**: Make sure your latest code is on your repository: `https://github.com/krishzy77/Luara-website.git`.
2. **Create a New Web Service**:
   - Log in to Render and click **New > Web Service**.
   - Connect your GitHub account and select the `Luara-website` repository.
3. **Configure Settings**:
   - **Name**: `luara-birthday` (or any name you like).
   - **Runtime**: `Node`.
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. **Environment Variables**:
   - (Optional) Set `PORT` to `3001` if you want to override the default.
5. **Click "Deploy Web Service"**!

> [!IMPORTANT]
> **Persistence Note**: On Render's free tier, files like `messages.json` and uploaded photos are stored locally on the server. If the server restarts or redeploys, these messages will be cleared. For permanent storage, consider connecting a database (like MongoDB or Supabase) in the future!

## 👩‍💻 Local Development
1. Clone the repo.
2. Install dependencies: `npm install`.
3. Start the development environment (Frontend + Backend): `npm run dev`.
4. Open `http://localhost:5173`.

## 💖 Credits
Created with love for Luara. May her 5th year be as magical as this website! ✨
