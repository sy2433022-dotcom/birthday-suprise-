<script>
    const happyStr = "HAPPY", birthdayStr = "BIRTHDAY", dateStr = "10 Falgun 2066";
    let hIdx = 0, bIdx = 0, dIdx = 0;
    const music = document.getElementById('bg-music');

    // 1. Browser lai file load huna sath 45 ma jump garaune
    music.addEventListener('loadedmetadata', function() {
        music.currentTime = 45;
    });

    function startSurprise() {
        document.getElementById('interaction-overlay').style.display = 'none';
        
        // 2. Extra Force: Play garnu bhanda thakkai agi pheri 45 ma set garne
        music.pause(); 
        music.currentTime = 45; 
        
        // 3. Play garne logic
        let playPromise = music.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Yadi play huda jump bhayo bhane pheri 45 ma taanne (Double Check)
                if (Math.abs(music.currentTime - 45) > 2) {
                    music.currentTime = 45;
                }
            }).catch(e => console.log("Playback error:", e));
        }

        // 4. Stop logic: 78 seconds (1:18) ma thakkai stop
        music.ontimeupdate = function() {
            if (music.currentTime >= 78) {
                music.pause();
            }
        };

        typeHappy();
    }

    // --- Typing Animation & Other Effects (Fixed) ---
    function moveButton() {
        const btn = document.getElementById('no-btn');
        btn.style.position = 'fixed';
        btn.style.left = Math.random() * (window.innerWidth - 100) + 'px';
        btn.style.top = Math.random() * (window.innerHeight - 50) + 'px';
    }

    function typeWriter(text, elementId, callback) {
        let i = 0; const el = document.getElementById(elementId); el.innerHTML = "";
        function type() {
            if (i < text.length) { el.innerHTML += text.charAt(i); i++; setTimeout(type, 40); }
            else if (callback) setTimeout(callback, 800);
        }
        type();
    }

    window.onload = () => {
        let count = 3;
        const timer = setInterval(() => {
            count--;
            if (count > 0) document.getElementById('timer-text').innerText = count;
            else {
                clearInterval(timer);
                document.getElementById('countdown-overlay').style.display = 'none';
                document.getElementById('interaction-overlay').style.display = 'flex';
                
                typeWriter("It's your birthday yeyey! 🎂", "pink-msg", () => {
                    typeWriter("I wanted to make something special for you, as you are... ❤️", "pink-msg", () => {
                        typeWriter("Do you wanna see what I made?", "pink-msg", () => {
                            document.getElementById('btn-container').style.opacity = "1";
                        });
                    });
                });
            }
        }, 1000);
    };

    function typeHappy() {
        if (hIdx < happyStr.length) { document.getElementById('type-happy').innerHTML += happyStr.charAt(hIdx); hIdx++; setTimeout(typeHappy, 120); }
        else typeBirthday();
    }
    function typeBirthday() {
        if (bIdx < birthdayStr.length) { document.getElementById('type-birthday').innerHTML += birthdayStr.charAt(bIdx); bIdx++; setTimeout(typeBirthday, 120); }
        else { document.getElementById('date').style.display = "inline-block"; typeDate(); }
    }
    function typeDate() {
        if (dIdx < dateStr.length) { document.getElementById('date').innerHTML += dateStr.charAt(dIdx); dIdx++; setTimeout(typeDate, 120); }
        else { 
            document.getElementById('right-ui').style.opacity = "1"; document.getElementById('right-ui').style.transform = "translateY(0)";
            setTimeout(() => { document.getElementById('open-btn').style.opacity = "1"; }, 800);
            createBalloons();
        }
    }
    document.getElementById('open-btn').onclick = () => { document.getElementById('message-box').style.display = "block"; document.getElementById('overlay').style.display = "block"; };
    document.getElementById('close-btn').onclick = () => { document.getElementById('message-box').style.display = "none"; document.getElementById('overlay').style.display = "none"; };

    function createBalloons() {
        const container = document.getElementById('balloons-layer');
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const b = document.createElement('div'); b.className = 'balloon-fly';
                b.style.left = Math.random() * 100 + "vw";
                b.innerText = ['🎈', '💖', '✨'][Math.floor(Math.random() * 3)];
                container.appendChild(b);
            }, i * 200);
        }
    }
</script>