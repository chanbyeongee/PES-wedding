const fs = require('fs');
const path = require('path');

const b64Dir = path.join(__dirname, 'b64');
const outFile = path.join(__dirname, 'wedding_announcement.html');

// Helper to safely read b64
const readB64 = (filename) => {
    try {
        const data = fs.readFileSync(path.join(b64Dir, filename), 'utf8').trim();
        // Check if there's already a data: prefix, though instructions say there isn't.
        if (data.startsWith('data:')) return data;
        return `data:image/jpeg;base64,${data}`;
    } catch (e) {
        console.warn(`Failed to read ${filename}: ${e.message}`);
        return ''; // fallback
    }
};

const images = {
    hero: readB64('hero.b64.txt'),
    dog: readB64('with_dog.b64.txt'),
    staircase: readB64('staircase.b64.txt'),
    veil: readB64('under_veil.b64.txt'),
    formal: readB64('formal.b64.txt'),
    garden: readB64('garden.b64.txt')
};

const htmlContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>박은상 & 김하나 결혼합니다</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Noto+Serif+KR:wght@300;400;500;700&display=swap');

        :root {
            --gold: #C9A96E;
            --ivory: #FFFFF0;
            --charcoal: #2C2C2C;
            --rose: #E8B4B8;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background-color: var(--ivory);
            color: var(--charcoal);
            font-family: 'Noto Sans KR', sans-serif;
            overflow-x: hidden;
            scroll-behavior: smooth;
        }

        .serif { font-family: 'Noto Serif KR', serif; }

        /* HERO SECTION */
        .hero {
            position: relative;
            height: 100vh;
            min-height: 800px;
            width: 100vw;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            background-color: #000;
        }

        .hero-bg {
            position: absolute;
            top: -10%; left: -10%;
            width: 120%; height: 120%;
            background-image: url('${images.hero}');
            background-size: cover;
            background-position: center 20%;
            animation: kenBurns 25s ease-out infinite alternate;
            z-index: 1;
            opacity: 0.85;
        }

        .hero-overlay {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: linear-gradient(to bottom, rgba(44,44,44,0.1) 0%, rgba(44,44,44,0.7) 100%);
            z-index: 2;
        }

        .hero-content {
            position: relative;
            z-index: 10;
            color: white;
            padding: 20px;
            text-shadow: 0 4px 15px rgba(0,0,0,0.4);
        }

        .notice-header {
            font-size: 0.9rem;
            letter-spacing: 5px;
            margin-bottom: 2rem;
            opacity: 0;
            animation: fadeIn 2s forwards 0.5s;
            color: var(--gold);
        }

        .hero-names {
            font-size: 4.5rem;
            margin-bottom: 1.5rem;
            font-weight: 400;
            background: linear-gradient(to right, #FFF 20%, var(--gold) 50%, #FFF 80%);
            background-size: 200% auto;
            color: transparent;
            -webkit-background-clip: text;
            background-clip: text;
            animation: shimmer 4s linear infinite, slideUp 2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards 1s;
            opacity: 0;
            transform: translateY(30px);
        }

        .hero-date {
            font-size: 1.2rem;
            letter-spacing: 2px;
            opacity: 0;
            animation: fadeIn 2s forwards 1.8s;
            font-weight: 300;
        }

        .scroll-down {
            position: absolute;
            bottom: 40px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10;
            color: var(--gold);
            font-size: 2rem;
            animation: bounce 2s infinite, fadeIn 2s forwards 2.5s;
            opacity: 0;
            cursor: pointer;
        }

        /* PARTICLES */
        #particles {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            z-index: 5;
            pointer-events: none;
        }

        .particle {
            position: absolute;
            background-color: var(--gold);
            border-radius: 50%;
            opacity: 0;
            animation: float 10s linear infinite;
            filter: blur(1px);
            box-shadow: 0 0 10px 2px rgba(201,169,110,0.5);
        }

        /* GREETING & INFO SECTION */
        .section-wrapper {
            background-color: var(--ivory);
            position: relative;
            z-index: 20;
            padding: 100px 20px;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }

        .quote {
            font-size: 1.6rem;
            color: var(--gold);
            margin-bottom: 50px;
            line-height: 1.8;
            font-style: italic;
        }

        .greeting-text {
            font-size: 1.1rem;
            line-height: 2.2;
            font-weight: 300;
            margin-bottom: 60px;
            color: var(--charcoal);
        }

        .divider {
            width: 1px;
            height: 60px;
            background-color: var(--gold);
            margin: 0 auto 60px auto;
        }

        .family-info {
            display: flex;
            flex-direction: column;
            gap: 30px;
            margin-bottom: 60px;
            font-size: 1.2rem;
        }

        .family-row {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 15px;
        }

        .family-role {
            color: #777;
            font-size: 0.95rem;
            width: 60px;
            text-align: right;
        }

        .family-names {
            font-weight: 500;
            width: 150px;
            text-align: left;
        }

        .family-names span {
            font-size: 0.9rem;
            font-weight: 300;
            color: #555;
            margin-right: 10px;
        }

        .venue-info {
            background: rgba(255,255,255,0.6);
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.03);
            border: 1px solid rgba(201,169,110,0.3);
            backdrop-filter: blur(10px);
        }

        .venue-info h3 {
            font-size: 1.4rem;
            color: var(--charcoal);
            margin-bottom: 20px;
            font-weight: 500;
        }

        .venue-info p {
            line-height: 1.8;
            color: #555;
        }

        .company-badge {
            display: inline-block;
            background-color: var(--charcoal);
            color: var(--ivory);
            padding: 8px 20px;
            border-radius: 20px;
            font-size: 0.85rem;
            letter-spacing: 1px;
            margin-top: 40px;
        }

        /* GALLERY SECTION */
        .gallery {
            padding: 50px 20px 100px;
            background-color: #FAFAFA;
        }

        .gallery-title {
            text-align: center;
            font-size: 2rem;
            color: var(--charcoal);
            margin-bottom: 60px;
            letter-spacing: 3px;
        }

        .gallery-grid {
            max-width: 1100px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 20px;
            grid-auto-flow: dense;
        }

        .gallery-item {
            position: relative;
            overflow: hidden;
            border-radius: 8px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.1);
            transform: translateZ(0); /* Hardware accel */
        }

        .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.8s ease;
            display: block;
        }

        .gallery-item:hover img {
            transform: scale(1.05);
            filter: brightness(0.9);
        }

        /* Creative layout spanning */
        .item-staircase { grid-column: span 7; grid-row: span 2; height: 600px; }
        .item-veil { grid-column: span 5; height: 290px; }
        .item-formal { grid-column: span 5; height: 290px; }
        .item-dog { grid-column: span 6; height: 400px; }
        .item-garden { grid-column: span 6; height: 400px; }

        @media (max-width: 768px) {
            .hero-names { font-size: 3rem; }
            .gallery-grid { display: flex; flex-direction: column; }
            .item-staircase, .item-veil, .item-formal, .item-dog, .item-garden { height: 400px; }
            .family-row { flex-direction: column; gap: 5px; }
            .family-role { text-align: center; width: auto; }
            .family-names { text-align: center; width: auto; }
        }

        /* FOOTER & COUNTDOWN */
        .footer {
            background-color: var(--charcoal);
            color: var(--ivory);
            padding: 100px 20px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .footer::before {
            content: '';
            position: absolute;
            top: 10px; left: 10px; right: 10px; bottom: 10px;
            border: 1px solid rgba(201,169,110,0.3);
            pointer-events: none;
        }

        .countdown {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin: 40px 0;
            font-family: 'Noto Serif KR', serif;
        }

        .cd-item {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .cd-num {
            font-size: 3rem;
            color: var(--gold);
            line-height: 1;
            margin-bottom: 10px;
        }

        .cd-label {
            font-size: 0.8rem;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #AAA;
        }

        .closing-msg {
            font-size: 1.2rem;
            font-weight: 300;
            color: #DDD;
            margin-top: 30px;
            letter-spacing: 1px;
        }

        /* SCROLL ANIMATION CLASSES */
        .reveal-up { opacity: 0; transform: translateY(50px); transition: all 1.2s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .reveal-up.active { opacity: 1; transform: translateY(0); }

        .reveal-clip { clip-path: circle(10% at 50% 50%); opacity: 0; transition: all 1.5s cubic-bezier(0.8, 0, 0.2, 1); }
        .reveal-clip.active { clip-path: circle(150% at 50% 50%); opacity: 1; }

        .reveal-scale { opacity: 0; transform: scale(0.9); filter: blur(10px); transition: all 1.2s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .reveal-scale.active { opacity: 1; transform: scale(1); filter: blur(0); }

        .reveal-left { opacity: 0; transform: translateX(-50px); transition: all 1.2s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .reveal-left.active { opacity: 1; transform: translateX(0); }

        .reveal-right { opacity: 0; transform: translateX(50px); transition: all 1.2s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .reveal-right.active { opacity: 1; transform: translateX(0); }

        /* KEYFRAMES */
        @keyframes kenBurns {
            0% { transform: scale(1); background-position: center 20%; }
            100% { transform: scale(1.15); background-position: center 30%; }
        }

        @keyframes shimmer {
            0% { background-position: 200% center; }
            100% { background-position: -200% center; }
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
            40% { transform: translateY(-20px) translateX(-50%); }
            60% { transform: translateY(-10px) translateX(-50%); }
        }

        @keyframes float {
            0% { transform: translateY(100vh) translateX(0) rotate(0deg); opacity: 0; }
            20% { opacity: 0.8; }
            80% { opacity: 0.8; }
            100% { transform: translateY(-100px) translateX(100px) rotate(360deg); opacity: 0; }
        }
    </style>
</head>
<body>

    <!-- HERO -->
    <section class="hero">
        <div class="hero-bg"></div>
        <div class="hero-overlay"></div>
        <div id="particles"></div>
        
        <div class="hero-content">
            <div class="notice-header serif">경조사 안내 | KEFICO</div>
            <h1 class="hero-names serif">은상 ♥ 하나</h1>
            <div class="hero-date">2026년 3월 29일 일요일 오후 12시<br>한국프레스센터 20층 국제회의장</div>
        </div>

        <div class="scroll-down" onclick="window.scrollBy(0, window.innerHeight)">↓</div>
    </section>

    <!-- GREETING & INFO -->
    <div class="section-wrapper">
        <div class="container">
            <div class="quote reveal-up">"내가 그의 이름을 불러주었을 때,<br>그는 나에게로 와서 꽃이 되었다"</div>
            <div class="divider reveal-up" style="transition-delay: 0.2s;"></div>
            
            <p class="greeting-text reveal-up" style="transition-delay: 0.3s;">
                수줍게 고백한 시로 인연을 맺었고,<br>
                인연의 깊이가 주는 아름다움에 반해 부부가 되려 합니다.<br>
                저희의 첫 걸음이 시작되는 봄날,<br>
                귀한 걸음하시어 축복해 주시면 감사하겠습니다.
            </p>

            <div class="family-info reveal-up">
                <div class="family-row">
                    <div class="family-role">신랑</div>
                    <div class="family-names"><span>이하영 의 아들</span> 박은상</div>
                </div>
                <div class="family-row">
                    <div class="family-role">신부</div>
                    <div class="family-names"><span>김희권 · 윤정희 의 딸</span> 김하나</div>
                </div>
            </div>

            <div class="venue-info reveal-up">
                <h3 class="serif">오시는 길</h3>
                <p><strong>일시:</strong> 2026년 3월 29일 일요일 오후 12시</p>
                <p><strong>장소:</strong> 한국프레스센터 20층 국제회의장 (프레스센터플라자웨딩)</p>
                <p><strong>주소:</strong> 서울 중구 세종대로 124</p>
            </div>

            <div class="company-badge reveal-up">EV차량제어개발팀 박은상</div>
        </div>
    </div>

    <!-- GALLERY -->
    <section class="gallery">
        <h2 class="gallery-title serif reveal-up">Our Memories</h2>
        <div class="gallery-grid">
            <div class="gallery-item item-staircase reveal-clip">
                <img src="${images.staircase}" alt="Staircase Portrait" loading="lazy">
            </div>
            <div class="gallery-item item-veil reveal-scale">
                <img src="${images.veil}" alt="Under the Veil" loading="lazy">
            </div>
            <div class="gallery-item item-formal reveal-right">
                <img src="${images.formal}" alt="Formal Portrait" loading="lazy">
            </div>
            <div class="gallery-item item-dog reveal-left">
                <img src="${images.dog}" alt="With our Dog" loading="lazy">
            </div>
            <div class="gallery-item item-garden reveal-up">
                <img src="${images.garden}" alt="Garden View" loading="lazy">
            </div>
        </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
        <h2 class="serif" style="font-size: 2rem; margin-bottom: 20px; color: var(--gold);">2026. 03. 29</h2>
        
        <div class="countdown reveal-up">
            <div class="cd-item">
                <span class="cd-num" id="cd-days">00</span>
                <span class="cd-label">Days</span>
            </div>
            <div class="cd-item">
                <span class="cd-num" id="cd-hours">00</span>
                <span class="cd-label">Hours</span>
            </div>
            <div class="cd-item">
                <span class="cd-num" id="cd-mins">00</span>
                <span class="cd-label">Mins</span>
            </div>
        </div>

        <p class="closing-msg serif reveal-up">새로운 시작을 축복해 주세요</p>
    </footer>

    <!-- SCRIPTS -->
    <script>
        // Scroll Reveal Animation via IntersectionObserver
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal-up, .reveal-clip, .reveal-scale, .reveal-left, .reveal-right').forEach(el => {
            observer.observe(el);
        });

        // Particle Effect Engine
        const createParticles = () => {
            const container = document.getElementById('particles');
            const particleCount = 20;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random properties
                const size = Math.random() * 5 + 3; // 3px to 8px
                const left = Math.random() * 100; // 0% to 100%
                const animDuration = Math.random() * 10 + 8; // 8s to 18s
                const animDelay = Math.random() * 10; // 0s to 10s

                particle.style.width = \`\${size}px\`;
                particle.style.height = \`\${size}px\`;
                particle.style.left = \`\${left}vw\`;
                particle.style.animationDuration = \`\${animDuration}s\`;
                particle.style.animationDelay = \`\${animDelay}s\`;

                container.appendChild(particle);
            }
        };

        createParticles();

        // Countdown Timer
        const targetDate = new Date("2026-03-29T12:00:00").getTime();
        
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                document.getElementById("cd-days").innerText = "00";
                document.getElementById("cd-hours").innerText = "00";
                document.getElementById("cd-mins").innerText = "00";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            document.getElementById("cd-days").innerText = days.toString().padStart(2, '0');
            document.getElementById("cd-hours").innerText = hours.toString().padStart(2, '0');
            document.getElementById("cd-mins").innerText = minutes.toString().padStart(2, '0');
        };

        setInterval(updateCountdown, 1000);
        updateCountdown();
    </script>
</body>
</html>
`;

fs.writeFileSync(outFile, htmlContent, 'utf8');
console.log('HTML file created successfully at ' + outFile);
