// lunarx-injection.js - Automatische IP-Anzeige & 10 Tabs
(function() {
    // Erstelle das Interface
    const overlay = document.createElement('div');
    overlay.id = 'lunarx-interface';
    overlay.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;900&family=Source+Code+Pro:wght@300&display=swap');
            
            .lunarx-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle at center, #050a05 0%, #000 100%);
                z-index: 999999;
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: 'Source Code Pro', monospace;
            }
            
            .lunarx-frame {
                background: rgba(0, 20, 0, 0.95);
                backdrop-filter: blur(15px);
                border: 2px solid #00ff41;
                border-radius: 15px;
                padding: 40px;
                width: 700px;
                box-shadow: 0 0 100px rgba(0, 255, 65, 0.3);
                text-align: center;
                animation: slideUp 0.8s cubic-bezier(0.19, 1, 0.22, 1);
            }
            
            @keyframes slideUp {
                from { transform: translateY(100%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            .lunarx-title {
                font-family: 'Orbitron', sans-serif;
                font-size: 2.2rem;
                color: #00ff41;
                text-transform: uppercase;
                letter-spacing: 4px;
                margin-bottom: 25px;
                text-shadow: 0 0 15px #00ff41;
            }
            
            .lunarx-info-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
                text-align: left;
                margin: 20px 0;
                border-top: 1px solid rgba(0, 255, 65, 0.2);
                border-bottom: 1px solid rgba(0, 255, 65, 0.2);
                padding: 20px 0;
            }
            
            .lunarx-info-item {
                font-size: 0.9rem;
                color: #ccc;
            }
            
            .lunarx-label {
                color: #00ff41;
                font-weight: bold;
                margin-right: 5px;
            }
            
            .lunarx-value {
                color: #fff;
                font-weight: 300;
            }
            
            .lunarx-discord {
                display: block;
                font-family: 'Orbitron', sans-serif;
                font-size: 2.5rem;
                font-weight: 900;
                color: #fff;
                background: #5865F2;
                margin: 30px 0;
                padding: 15px;
                border-radius: 10px;
                text-decoration: none;
                box-shadow: 0 0 40px rgba(88, 101, 242, 0.5);
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); box-shadow: 0 0 30px rgba(88, 101, 242, 0.4); }
                50% { transform: scale(1.02); box-shadow: 0 0 60px rgba(88, 101, 242, 0.7); }
                100% { transform: scale(1); box-shadow: 0 0 30px rgba(88, 101, 242, 0.4); }
            }
            
            .lunarx-progress {
                width: 100%;
                background: rgba(255, 255, 255, 0.05);
                height: 10px;
                border-radius: 5px;
                overflow: hidden;
                border: 1px solid rgba(0, 255, 65, 0.2);
                margin: 20px 0 10px 0;
            }
            
            .lunarx-progress-bar {
                height: 100%;
                width: 0%;
                background: linear-gradient(90deg, #00ff41, #5865F2);
                box-shadow: 0 0 10px #00ff41;
                transition: width 0.3s ease;
            }
            
            .lunarx-status {
                font-size: 0.8rem;
                color: #00ff41;
                height: 20px;
                margin-bottom: 15px;
            }
            
            .lunarx-close {
                position: absolute;
                top: 20px;
                right: 20px;
                color: #00ff41;
                cursor: pointer;
                font-size: 24px;
                opacity: 0.5;
                transition: opacity 0.3s;
                z-index: 1000000;
            }
            
            .lunarx-close:hover {
                opacity: 1;
            }
            
            .lunarx-watermark {
                position: absolute;
                bottom: 10px;
                right: 10px;
                color: rgba(0, 255, 65, 0.2);
                font-size: 10px;
            }
            
            .lunarx-tab-counter {
                position: absolute;
                top: 20px;
                left: 20px;
                color: #00ff41;
                font-size: 14px;
                font-family: 'Orbitron', sans-serif;
                background: rgba(0,0,0,0.5);
                padding: 5px 10px;
                border-radius: 5px;
                border: 1px solid #00ff41;
            }
        </style>
        
        <div class="lunarx-container">
            <div class="lunarx-close" onclick="document.getElementById('lunarx-interface').remove()">✕</div>
            <div class="lunarx-tab-counter" id="tab-counter">TABS: 0/10</div>
            
            <div class="lunarx-frame">
                <div class="lunarx-title">LUNARX INJECTION</div>
                
                <div class="lunarx-info-grid">
                    <div class="lunarx-info-item"><span class="lunarx-label">TARGET_IP:</span> <span class="lunarx-value" id="target-ip">FETCHING...</span></div>
                    <div class="lunarx-info-item"><span class="lunarx-label">YOUR_IP:</span> <span class="lunarx-value" id="your-ip">DETECTING...</span></div>
                    <div class="lunarx-info-item"><span class="lunarx-label">PLATFORM:</span> <span class="lunarx-value" id="platform">LOADING...</span></div>
                    <div class="lunarx-info-item"><span class="lunarx-label">RESOLUTION:</span> <span class="lunarx-value" id="resolution">...</span></div>
                    <div class="lunarx-info-item"><span class="lunarx-label">BROWSER:</span> <span class="lunarx-value" id="browser">...</span></div>
                    <div class="lunarx-info-item"><span class="lunarx-label">TIME:</span> <span class="lunarx-value" id="time">...</span></div>
                    <div class="lunarx-info-item"><span class="lunarx-label">STATUS:</span> <span class="lunarx-value" style="color:#00ff41;" id="status">ACTIVE</span></div>
                    <div class="lunarx-info-item"><span class="lunarx-label">CONNECTION:</span> <span class="lunarx-value" id="connection">SECURE</span></div>
                </div>
                
                <div class="lunarx-discord" id="discord-text">DISCORD.GG/LUNARX</div>
                
                <div class="lunarx-progress">
                    <div class="lunarx-progress-bar" id="progress-bar"></div>
                </div>
                
                <div class="lunarx-status" id="status-text">> INITIALIZING LUNARX PROTOCOL...</div>
            </div>
            
            <div class="lunarx-watermark">LUNARX v3.0</div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Elemente holen
    const targetIpEl = document.getElementById('target-ip');
    const yourIpEl = document.getElementById('your-ip');
    const platformEl = document.getElementById('platform');
    const resolutionEl = document.getElementById('resolution');
    const browserEl = document.getElementById('browser');
    const timeEl = document.getElementById('time');
    const statusEl = document.getElementById('status');
    const connectionEl = document.getElementById('connection');
    const progressBar = document.getElementById('progress-bar');
    const statusText = document.getElementById('status-text');
    const tabCounter = document.getElementById('tab-counter');
    
    // ===== 1. IP Informationen automatisch laden =====
    async function fetchIPInfo() {
        try {
            statusText.textContent = "> FETCHING IP INFORMATION...";
            
            // Eigene IP von ipify
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();
            const userIP = ipData.ip;
            yourIpEl.textContent = userIP;
            
            // Target IP (zufällig aber realistisch)
            const targetIps = ['192.168.1.45', '10.0.0.23', '172.16.0.12', '45.33.22.11', '8.8.8.8', '1.1.1.1'];
            targetIpEl.textContent = targetIps[Math.floor(Math.random() * targetIps.length)];
            
            // Geo-Informationen
            try {
                const geoResponse = await fetch(`https://ipapi.co/${userIP}/json/`);
                const geoData = await geoResponse.json();
                if (geoData.country_name) {
                    connectionEl.textContent = `${geoData.country_name} (${geoData.country_code || ''})`;
                }
                if (geoData.city) {
                    statusText.textContent = `> LOCATION: ${geoData.city}, ${geoData.country_name}`;
                }
            } catch (geoError) {
                connectionEl.textContent = 'SECURE CONNECTION';
            }
            
        } catch (error) {
            yourIpEl.textContent = '127.0.0.1 (LOCAL)';
            targetIpEl.textContent = '45.33.22.11';
            connectionEl.textContent = 'PROXY DETECTED';
            statusText.textContent = "> USING LOCAL CONNECTION";
        }
    }
    
    // ===== 2. System Informationen =====
    platformEl.textContent = navigator.platform || 'UNKNOWN';
    resolutionEl.textContent = `${window.screen.width}x${window.screen.height}`;
    
    // Browser erkennen
    const ua = navigator.userAgent;
    if (ua.includes('Chrome')) browserEl.textContent = 'CHROME';
    else if (ua.includes('Firefox')) browserEl.textContent = 'FIREFOX';
    else if (ua.includes('Safari')) browserEl.textContent = 'SAFARI';
    else if (ua.includes('Edge')) browserEl.textContent = 'EDGE';
    else browserEl.textContent = 'UNKNOWN';
    
    // ===== 3. Uhrzeit automatisch aktualisieren =====
    function updateTime() {
        const now = new Date();
        timeEl.textContent = now.toLocaleTimeString('de-DE', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
        });
    }
    setInterval(updateTime, 1000);
    updateTime();
    
    // ===== 4. IP Info laden =====
    fetchIPInfo();
    
    // ===== 5. AUTOMATISCH 10 TABS ÖFFNEN =====
    function openDiscordTabs() {
        const numberOfTabs = 10;
        statusText.textContent = `> INITIATING TAB SEQUENCE (${numberOfTabs}x)...`;
        statusEl.textContent = 'BREACHING';
        statusEl.style.color = '#ff5555';
        
        for (let i = 0; i < numberOfTabs; i++) {
            setTimeout(() => {
                window.open('https://discord.gg/lunarX', `_lunarx_${i}`);
                tabCounter.textContent = `TABS: ${i+1}/${numberOfTabs}`;
                
                // Status-Updates während dem Öffnen
                if (i === 2) statusText.textContent = "> BYPASSING DISCORD PROTECTION...";
                if (i === 5) statusText.textContent = "> INJECTING PAYLOAD...";
                if (i === 8) statusText.textContent = "> ESTABLISHING CONNECTION...";
                
                // Fortschrittsbalken anpassen
                const tabProgress = ((i + 1) / numberOfTabs) * 100;
                progressBar.style.width = tabProgress + "%";
                
                // Letzten Tab
                if (i === numberOfTabs - 1) {
                    setTimeout(() => {
                        statusText.textContent = '> ACCESS GRANTED. WELCOME TO LUNARX!';
                        statusEl.textContent = 'CONNECTED';
                        statusEl.style.color = '#00ff41';
                        progressBar.style.width = "100%";
                        tabCounter.textContent = `TABS: 10/10 ✅`;
                    }, 500);
                }
            }, i * 400); // 400ms Verzögerung zwischen Tabs
        }
    }
    
    // ===== 6. Automatisch starten nachdem IP geladen ist =====
    setTimeout(() => {
        openDiscordTabs();
    }, 2000); // 2 Sekunden warten für IP-Ladung
    
    // ===== 7. Fortschrittsbalken Animation (bis Tabs starten) =====
    const logs = [
        "> INITIALIZING LUNARX PROTOCOL...",
        "> CONNECTING TO API SERVER...",
        "> FETCHING TARGET DATA...",
        "> PREPARING TAB INJECTION..."
    ];
    
    let progress = 0;
    let logIndex = 0;
    
    const interval = setInterval(() => {
        progress += Math.random() * 3;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
        }
        progressBar.style.width = progress + "%";
        
        if (progress > (logIndex + 1) * 25 && logIndex < logs.length) {
            statusText.textContent = logs[logIndex];
            logIndex++;
        }
    }, 150);
    
    // ===== 8. Escape zum Schließen =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.getElementById('lunarx-interface').remove();
        }
    });
    
    console.log('🚀 LUNARX Interface gestartet - Automatischer Tab-Öffner aktiv');
})();