// Detect language from HTML tag
const lang = document.documentElement.lang || 'en';

const langStrings = {
  en: { mute: "🔇 Mute", unmute: "🔊 Unmute", rsvp_success: "Yay! See you there! 🎈", hb_titles: ["Happy Birthday!", "Feliz Aniversário!", "பிறந்தநாள் வாழ்த்துக்கள்!"] },
  pt: { mute: "🔇 Silenciar", unmute: "🔊 Ativar Som", rsvp_success: "Oba! Vejo você lá! 🎈", hb_titles: ["Feliz Aniversário!", "Happy Birthday!", "பிறந்தநாள் வாழ்த்துக்கள்!"] },
  ta: { mute: "🔇 அமைதி", unmute: "🔊 ஒலி", rsvp_success: "நிச்சயமாக வருகிறேன்! 🎈", hb_titles: ["பிறந்தநாள் வாழ்த்துக்கள்!", "Happy Birthday!", "Feliz Aniversário!"] }
};

const strings = langStrings[lang] || langStrings['en'];

// Sound Effects Synthesizer
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let isMuted = true;

function playNote(freq, start, duration) {
  if (isMuted) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(0.1, start);
  gain.gain.exponentialRampToValueAtTime(0.01, start + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(start);
  osc.stop(start + duration);
}

const birthdayMelody = [
  {f: 261.63, d: 0.4}, {f: 261.63, d: 0.2}, {f: 293.66, d: 0.6}, {f: 261.63, d: 0.6}, {f: 349.23, d: 0.6}, {f: 329.63, d: 1.2},
  {f: 261.63, d: 0.4}, {f: 261.63, d: 0.2}, {f: 293.66, d: 0.6}, {f: 261.63, d: 0.6}, {f: 392.00, d: 0.6}, {f: 349.23, d: 1.2},
  {f: 261.63, d: 0.4}, {f: 261.63, d: 0.2}, {f: 523.25, d: 0.6}, {f: 440.00, d: 0.6}, {f: 349.23, d: 0.6}, {f: 329.63, d: 0.6}, {f: 293.66, d: 0.6},
  {f: 466.16, d: 0.4}, {f: 466.16, d: 0.2}, {f: 440.00, d: 0.6}, {f: 349.23, d: 0.6}, {f: 392.00, d: 0.6}, {f: 349.23, d: 1.2}
];

function playBirthdaySong() {
  if (isMuted) return;
  let time = audioCtx.currentTime;
  birthdayMelody.forEach(note => {
    playNote(note.f, time, note.d);
    time += note.d + 0.05;
  });
  setTimeout(playBirthdaySong, time * 1000 - audioCtx.currentTime * 1000 + 1000);
}

const muteBtn = document.getElementById('mute-btn');
if (muteBtn) {
  muteBtn.onclick = () => {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    isMuted = !isMuted;
    muteBtn.innerText = isMuted ? strings.unmute : strings.mute;
    if (!isMuted) playBirthdaySong();
  };
}

window.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.1) return;
  const s = document.createElement('div');
  s.className = 'sparkle-trail';
  s.innerText = '✨';
  s.style.left = e.clientX + 'px';
  s.style.top = e.clientY + 'px';
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 1000);
});

function playPop() {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 0.1);
  gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.1);
}

function playSparkle() {
  const now = audioCtx.currentTime;
  for (let i = 0; i < 5; i++) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800 + Math.random() * 1000, now + i * 0.05);
    gain.gain.setValueAtTime(0.1, now + i * 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.05 + 0.1);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now + i * 0.05);
    osc.stop(now + i * 0.05 + 0.1);
  }
}

function playFunny() {
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  osc.type = 'square';
  osc.frequency.setValueAtTime(100, now);
  osc.frequency.exponentialRampToValueAtTime(1000, now + 0.2);
  osc.frequency.exponentialRampToValueAtTime(100, now + 0.4);
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(now + 0.4);
}

// Floating Emojis Logic
const emojis = ['🎉', '✨', '🎂', '🎈', '💖', '⭐', '🦄', '🌈'];
function createFloatingEmoji() {
  const emoji = document.createElement('div');
  emoji.className = 'floating-emoji';
  emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.style.left = Math.random() * 100 + 'vw';
  emoji.style.top = '100vh';
  emoji.style.opacity = Math.random();
  emoji.style.fontSize = (Math.random() * 2 + 1) + 'rem';
  document.body.appendChild(emoji);

  const duration = Math.random() * 5 + 5;
  const anim = emoji.animate([
    { transform: `translateY(0) rotate(0deg)`, opacity: 0 },
    { transform: `translateY(-50vh) rotate(180deg)`, opacity: 1, offset: 0.2 },
    { transform: `translateY(-110vh) rotate(360deg)`, opacity: 0 }
  ], {
    duration: duration * 1000,
    easing: 'linear'
  });

  anim.onfinish = () => emoji.remove();
}
setInterval(createFloatingEmoji, 2000);

// Countdown Logic
const partyDate = new Date('April 24, 2026 14:00:00').getTime();
function updateCountdown() {
  const now = new Date().getTime();
  const diff = partyDate - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (document.getElementById('days')) {
    document.getElementById('days').innerText = days.toString().padStart(2, '0');
    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
  }
}
setInterval(updateCountdown, 1000);

// Gallery Logic
const gallery = document.getElementById('photo-gallery');
if (gallery) {
  const photos = [
    'assets/luara_umbrella.png',
    'assets/luara_grass.png',
    'assets/luara_road.png',
    'assets/luara_christmas.png',
    'assets/luara_flower.png',
    'assets/luara_avatar.png'
  ];

  photos.forEach((src, index) => {
    const pol = document.createElement('div');
    pol.className = 'polaroid';
    pol.style.setProperty('--rotation', (Math.random() * 20 - 10) + 'deg');
    pol.innerHTML = `<img src="${src}" alt="Memory ${index + 1}">`;
    pol.onclick = () => {
      playSparkle();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ff7eb9', '#9d50bb', '#00d2ff']
      });
    };
    gallery.appendChild(pol);
  });
}

// Funny Button Logic
const funnyBtn = document.getElementById('funny-btn');
if (funnyBtn) {
  funnyBtn.onclick = () => {
    playFunny();
    confetti({
      particleCount: 150,
      spread: 180,
      origin: { y: 0.9 },
      colors: ['#f9d423', '#ff7eb9', '#00d2ff']
    });
    
    document.body.animate([
      { transform: 'rotate(0deg)' },
      { transform: 'rotate(5deg)' },
      { transform: 'rotate(-5deg)' },
      { transform: 'rotate(0deg)' }
    ], { duration: 500, iterations: 1 });

    const originalText = funnyBtn.innerText;
    funnyBtn.innerText = lang === 'pt' ? "EU DISSE NÃO! 😂" : (lang === 'ta' ? "நான் வேண்டாம் என்று சொன்னேன்! 😂" : "I TOLD YOU NOT TO! 😂");
    setTimeout(() => funnyBtn.innerText = originalText, 3000);
  };
}

// Say Happy Birthday Button
const sayHbBtn = document.getElementById('say-hb-btn');
if (sayHbBtn) {
  sayHbBtn.onclick = () => {
    playSparkle();
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff7eb9', '#9d50bb', '#f9d423']
    });
    const titles = strings.hb_titles;
    const heroTitle = document.getElementById('hero-title');
    const originalText = heroTitle.innerText;
    let i = 0;
    const interval = setInterval(() => {
      heroTitle.innerText = titles[i % 3];
      i++;
      if (i > 9) {
        clearInterval(interval);
        heroTitle.innerText = originalText;
      }
    }, 300);
  };
}

// Message Wall Logic
const messageForm = document.getElementById('message-form');
const messageList = document.getElementById('message-list');
const photoInput = document.getElementById('msg-photo');
const fileNameSpan = document.getElementById('file-name');

if (photoInput && fileNameSpan) {
  photoInput.onchange = (e) => {
    if (e.target.files.length > 0) {
      fileNameSpan.innerText = e.target.files[0].name;
    }
  };
}

if (messageForm && messageList) {
  async function fetchMessages() {
    try {
      const res = await fetch('/api/messages');
      const messages = await res.json();
      renderMessages(messages);
    } catch (e) {
      console.error('Failed to fetch messages', e);
    }
  }

  function renderMessages(messages) {
    messageList.innerHTML = '';
    messages.forEach(m => {
      const div = document.createElement('div');
      div.className = 'glass-card message-card animate-pop';
      div.style.padding = '20px';
      div.style.textAlign = 'left';
      div.style.display = 'flex';
      div.style.flexDirection = 'column';
      div.style.gap = '10px';
      
      let photoHtml = m.photo ? `<img src="${m.photo}" class="message-photo" style="width: 100%; border-radius: 15px; margin: 10px 0;" />` : '';
      
      div.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong>${m.name}</strong>
          <span style="font-size: 0.8rem; opacity: 0.7;">${new Date(m.timestamp).toLocaleDateString()}</span>
        </div>
        <p>${m.content}</p>
        ${photoHtml}
        <div style="display: flex; gap: 10px; align-items: center; margin-top: 5px;">
          <button class="like-btn btn-small" style="padding: 5px 15px;" onclick="window.likeMessage(${m.id})">💖 ${m.likes || 0}</button>
        </div>
      `;
      messageList.appendChild(div);
    });
  }

  window.likeMessage = async (id) => {
    try {
      const res = await fetch(`/api/messages/${id}/like`, { method: 'POST' });
      if (res.ok) {
        fetchMessages();
        playSparkle();
      }
    } catch (e) {
      console.error('Failed to like message', e);
    }
  };

  messageForm.onsubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('msg-name').value;
    const content = document.getElementById('msg-content').value;
    const photo = photoInput.files[0];

    const formData = new FormData();
    formData.append('name', name);
    formData.append('content', content);
    if (photo) formData.append('photo', photo);

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        messageForm.reset();
        fileNameSpan.innerText = '';
        fetchMessages();
        playSparkle();
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        // Floating emojis for feedback
        for(let i=0; i<10; i++) setTimeout(createFloatingEmoji, i*100);
      }
    } catch (e) {
      console.error('Failed to send message', e);
    }
  };

  fetchMessages();
}

// Surprise Logic
const surpriseBox = document.getElementById('surprise-box');
if (surpriseBox) {
  surpriseBox.onclick = () => {
    playSparkle();
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#ff7eb9', '#9d50bb', '#00d2ff', '#f9d423']
    });
    
    const heroTitle = document.getElementById('hero-title');
    const originalText = heroTitle.innerText;
    heroTitle.innerText = "SURPRISE! 💖";
    setTimeout(() => {
      heroTitle.innerText = originalText;
    }, 3000);
  };
}

// RSVP Logic
const rsvpBtn = document.getElementById('rsvp-btn');
if (rsvpBtn) {
  rsvpBtn.onclick = (e) => {
    e.target.innerText = strings.rsvp_success;
    e.target.style.background = "var(--accent)";
    playSparkle();
    confetti({
      particleCount: 100,
      scalar: 1.2,
      shapes: ['star']
    });
  };
}

// Games Logic
const modal = document.getElementById('game-modal');
const gameContainer = document.getElementById('game-container');
const closeModal = document.querySelector('.close-modal');

if (closeModal) {
  closeModal.onclick = () => {
    modal.style.display = 'none';
    gameContainer.innerHTML = '';
  };
}

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
    gameContainer.innerHTML = '';
  }
};

// Game: Pop the Balloons
function startPopGame() {
  const popTitle = lang === 'pt' ? "Estoure 10 Balões!" : (lang === 'ta' ? "10 பலூன்களை உடைக்கவும்!" : "Pop 10 Balloons!");
  const popScore = lang === 'pt' ? "Pontuação" : (lang === 'ta' ? "மதிப்பெண்" : "Score");
  const popWin = lang === 'pt' ? "Você Venceu! 🏆" : (lang === 'ta' ? "நீங்கள் வென்றுவிட்டீர்கள்! 🏆" : "You Won! 🏆");
  const popButton = lang === 'pt' ? "Incrível!" : (lang === 'ta' ? "அற்புதம்!" : "Awesome!");

  gameContainer.innerHTML = `
    <h2 style="margin-bottom: 20px;">${popTitle} 🎈</h2>
    <div id="pop-area" style="width: 100%; height: 400px; background: #e0f7fa; position: relative; overflow: hidden; border-radius: 20px;">
    </div>
    <p id="pop-score" style="font-size: 1.5rem; margin-top: 20px;">${popScore}: 0</p>
  `;
  
  let score = 0;
  const popArea = document.getElementById('pop-area');
  const scoreEl = document.getElementById('pop-score');

  function createBalloon() {
    if (score >= 10) {
      gameContainer.innerHTML = `
        <h2 style="color: var(--primary);">${popWin}</h2>
        <button class="btn-primary" onclick="window.closePopGame()">${popButton}</button>
      `;
      confetti();
      return;
    }

    const b = document.createElement('div');
    b.innerText = '🎈';
    b.style.position = 'absolute';
    b.style.fontSize = '3rem';
    b.style.left = Math.random() * 80 + 10 + '%';
    b.style.top = '100%';
    b.style.cursor = 'pointer';
    b.style.transition = 'top 4s linear';
    popArea.appendChild(b);

    setTimeout(() => b.style.top = '-10%', 10);

    b.onclick = () => {
      playPop();
      score++;
      scoreEl.innerText = `${popScore}: ${score}`;
      b.innerText = '💥';
      setTimeout(() => b.remove(), 100);
    };

    setTimeout(() => {
      if (b.parentNode) b.remove();
      if (score < 10) createBalloon();
    }, 4000);
  }

  createBalloon();
  createBalloon();
}

window.closePopGame = () => {
  modal.style.display = 'none';
  gameContainer.innerHTML = '';
};

const popGameBtn = document.getElementById('game-pop');
if (popGameBtn) {
  popGameBtn.onclick = () => {
    modal.style.display = 'flex';
    startPopGame();
  };
}

// Game: Memory Match
function startMemoryGame() {
  const memTitle = lang === 'pt' ? "Encontre os Pares! 🧠" : (lang === 'ta' ? "ஜோடிகளைக் கண்டுபிடி! 🧠" : "Find the Pairs! 🧠");
  const memWin = lang === 'pt' ? "Memória Mágica! 🏆" : (lang === 'ta' ? "மாயாஜால நினைவாற்றல்! 🏆" : "Magical Memory! 🏆");

  const symbols = ['🎂', '🎈', '💖', '⭐', '🦄', '🌈', '🍕', '🍦'];
  let cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
  let flipped = [];
  let matched = 0;

  gameContainer.innerHTML = `
    <h2 style="margin-bottom: 20px;">${memTitle}</h2>
    <div id="memory-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; max-width: 400px;">
    </div>
  `;

  const grid = document.getElementById('memory-grid');
  cards.forEach((symbol, i) => {
    const card = document.createElement('div');
    card.style.width = '70px';
    card.style.height = '70px';
    card.style.background = 'var(--primary)';
    card.style.borderRadius = '10px';
    card.style.display = 'flex';
    card.style.alignItems = 'center';
    card.style.justifyContent = 'center';
    card.style.fontSize = '2rem';
    card.style.cursor = 'pointer';
    card.style.color = 'transparent';
    card.innerText = symbol;
    
    card.onclick = () => {
      if (flipped.length < 2 && !flipped.includes(card) && card.style.color === 'transparent') {
        card.style.color = 'white';
        card.style.background = 'white';
        card.style.border = '2px solid var(--primary)';
        flipped.push(card);

        if (flipped.length === 2) {
          if (flipped[0].innerText === flipped[1].innerText) {
            matched++;
            playSparkle();
            flipped = [];
            if (matched === symbols.length) {
              setTimeout(() => {
                gameContainer.innerHTML = `<h2 style="color: var(--primary);">${memWin}</h2><button class="btn-primary" onclick="window.closePopGame()">Yay!</button>`;
                confetti();
              }, 500);
            }
          } else {
            setTimeout(() => {
              flipped.forEach(c => {
                c.style.color = 'transparent';
                c.style.background = 'var(--primary)';
                c.style.border = 'none';
              });
              flipped = [];
            }, 1000);
          }
        }
      }
    };
    grid.appendChild(card);
  });
}

const memoryGameBtn = document.getElementById('game-memory');
if (memoryGameBtn) {
  memoryGameBtn.onclick = () => {
    modal.style.display = 'flex';
    startMemoryGame();
  };
}

// Game: Cake Decorate
function startCakeGame() {
  const cakeTitle = lang === 'pt' ? "Decore o Bolo! 🎂" : (lang === 'ta' ? "கேக்கை அலங்கரிக்கவும்! 🎂" : "Decorate the Cake! 🎂");
  const cakeFinish = lang === 'pt' ? "Está Perfeito!" : (lang === 'ta' ? "அற்புதம்!" : "It's Perfect!");
  const cakeWin = lang === 'pt' ? "Delicioso! Lindo! 🎂" : (lang === 'ta' ? "மிகவும் அழகு! 🎂" : "Yum! Beautiful! 🎂");

  gameContainer.innerHTML = `
    <h2 style="margin-bottom: 20px;">${cakeTitle}</h2>
    <div id="cake-area" style="position: relative; width: 300px; height: 300px; margin: 0 auto;">
      <img src="assets/birthday_cake.png" style="width: 100%;" />
      <div id="decorations" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></div>
    </div>
    <div style="margin-top: 20px; display: flex; gap: 10px; justify-content: center;">
      <button class="btn-small" onclick="window.addDecor('🍓')">🍓</button>
      <button class="btn-small" onclick="window.addDecor('🍒')">🍒</button>
      <button class="btn-small" onclick="window.addDecor('✨')">✨</button>
      <button class="btn-small" onclick="window.addDecor('🍬')">🍬</button>
      <button class="btn-small" onclick="window.addDecor('🍫')">🍫</button>
    </div>
    <button class="btn-primary" style="margin-top: 20px;" onclick="window.finishCake()">${cakeFinish}</button>
  `;

  window.addDecor = (emoji) => {
    const d = document.createElement('div');
    d.innerText = emoji;
    d.style.position = 'absolute';
    d.style.fontSize = '2rem';
    d.style.left = Math.random() * 80 + 10 + '%';
    d.style.top = Math.random() * 60 + 20 + '%';
    d.style.cursor = 'move';
    document.getElementById('decorations').appendChild(d);
    playPop();
  };

  window.finishCake = () => {
    playSparkle();
    confetti();
    gameContainer.innerHTML = `<h2 style="color: var(--primary);">${cakeWin}</h2><button class="btn-primary" onclick="window.closePopGame()">Done!</button>`;
  };
}

const cakeGameBtn = document.getElementById('game-cake');
if (cakeGameBtn) {
  cakeGameBtn.onclick = () => {
    modal.style.display = 'flex';
    startCakeGame();
  };
}
// Hero Slideshow Logic
function startHeroSlideshow() {
  const container = document.querySelector('.hero-image-container');
  if (!container) return;
  
  const images = container.querySelectorAll('.luara-avatar');
  if (images.length < 2) return;

  let currentIndex = 0;
  setInterval(() => {
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add('active');
  }, 4000);
}
startHeroSlideshow();
