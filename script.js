const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const mainCard = document.getElementById('main-card');
const successScreen = document.getElementById('success-screen');

let yesScale = 1;
let noClickCount = 0;

const askingGif = document.getElementById('asking-gif');
const ngambekGif = document.getElementById('ngambek-gif');
const questionText = document.getElementById('question');

// Move No button to body so it's not clipped by any container
let movedToBody = false;

noBtn.addEventListener('mouseover', () => {
    if (!movedToBody) {
        document.body.appendChild(noBtn);
        movedToBody = true;
    }

    noClickCount++;

    // Calculate strict visible area
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    const padding = 50; // Extra safe margin

    // Phase 2 logic: Change content
    if (noClickCount === 5) {
        askingGif.style.display = 'none';
        ngambekGif.style.display = 'block';
        ngambekGif.classList.remove('hidden');
        questionText.innerText = "Why are you still trying the 'No' button? 🤨";
    }

    // Determine random position strictly within window bounds
    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;

    // Use at least 20px as min to avoid hitting extreme edges
    const targetX = Math.max(20, Math.random() * maxX);
    const targetY = Math.max(20, Math.random() * maxY);

    noBtn.style.position = 'fixed';
    noBtn.style.left = targetX + 'px';
    noBtn.style.top = targetY + 'px';
    noBtn.style.zIndex = '10000'; // Super high z-index

    if (noClickCount >= 5) {
        // Phase 2: Add rotation
        const randomRotate = (Math.random() - 0.5) * 360;
        noBtn.style.transform = `rotate(${randomRotate}deg)`;
        
        // Grow Yes button but keep it reasonable
        if (yesScale < 8) {
            yesScale += 0.4;
            yesBtn.style.transform = `scale(${yesScale})`;
        }
    } else {
        // Phase 1 growth
        yesScale += 0.15;
        yesBtn.style.transform = `scale(${yesScale})`;
    }

    // Guilt trip text changes
    const guiltTrips = [
        "No... 💔",
        "Are you sure? 🥺",
        "Really? 😿",
        "Think again! 💖",
        "Last chance! 😭",
        "Don't do this... 💔",
        "I'm gonna cry... 🥺"
    ];
    if (noClickCount < guiltTrips.length) {
        noBtn.innerText = guiltTrips[noClickCount];
    }
});

yesBtn.addEventListener('click', () => {
    mainCard.classList.add('hidden');
    successScreen.classList.remove('hidden');
    noBtn.style.display = 'none';
    startCelebration();
});

function startCelebration() {
    const interval = setInterval(() => {
        createHeart();
    }, 100);
    setTimeout(() => clearInterval(interval), 5000);
}

function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.className = 'heart-falling';
    heart.style.left = Math.random() * 100 + 'vw';
    
    // Randomize initial top position slightly so they don't all start at once
    heart.style.top = '-' + (Math.random() * 20 + 20) + 'px';
    
    const size = Math.random() * 20 + 20;
    heart.style.fontSize = size + 'px';
    
    const duration = Math.random() * 3 + 2;
    heart.style.animationDuration = duration + 's';
    
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), duration * 1000);
}
