document.addEventListener('DOMContentLoaded', function() {
    // Matrix background effect
    createMatrixRain();
    
    // Add data attributes for glitch effect
    const glitchTexts = document.querySelectorAll('.glitch-text');
    glitchTexts.forEach(text => {
        text.setAttribute('data-text', text.textContent);
    });
    
    // Terminal typing effect
    typeCommands();
    
    // Add easter egg for konami code
    initKonamiCode();
    
    // Add system stats
    displaySystemStats();
});

function createMatrixRain() {
    const matrixBg = document.querySelector('.matrix-bg');
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    // Create falling characters
    for (let i = 0; i < 100; i++) {
        const span = document.createElement('span');
        span.textContent = chars[Math.floor(Math.random() * chars.length)];
        span.style.position = 'absolute';
        span.style.left = Math.random() * 100 + '%';
        span.style.animationDelay = Math.random() * 5 + 's';
        span.style.animationDuration = (Math.random() * 3 + 2) + 's';
        span.style.color = 'rgba(0, 255, 65, 0.1)';
        span.style.fontSize = '12px';
        span.classList.add('matrix-char');
        matrixBg.appendChild(span);
    }
    
    // CSS for matrix characters
    const style = document.createElement('style');
    style.textContent = `
        .matrix-char {
            animation: fall linear infinite;
        }
        
        @keyframes fall {
            0% {
                transform: translateY(-100vh);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

function typeCommands() {
    const commands = document.querySelectorAll('.command');
    
    commands.forEach((cmd, index) => {
        if (cmd.classList.contains('typing')) {
            const text = cmd.textContent;
            cmd.textContent = '';
            cmd.style.width = '0';
            
            setTimeout(() => {
                let i = 0;
                const typeInterval = setInterval(() => {
                    cmd.textContent = text.slice(0, i + 1);
                    i++;
                    
                    if (i >= text.length) {
                        clearInterval(typeInterval);
                        cmd.style.borderRight = 'none';
                    }
                }, 100);
            }, 1000 + (index * 2000));
        }
    });
}

function initKonamiCode() {
    let konamiSequence = [];
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    document.addEventListener('keydown', function(e) {
        konamiSequence.push(e.code);
        konamiSequence = konamiSequence.slice(-konamiCode.length);
        
        if (konamiSequence.join(',') === konamiCode.join(',')) {
            activateHackerMode();
        }
    });
}

function activateHackerMode() {
    const terminal = document.querySelector('.terminal-body');
    terminal.style.filter = 'hue-rotate(180deg)';
    
    // Add new terminal line
    const outputDiv = document.querySelector('.terminal-output');
    const newLine = document.createElement('div');
    newLine.className = 'line';
    newLine.innerHTML = `
        <span class="prompt">root@postsilicon:~$</span>
        <span class="command" style="color: #ff0040;">HACKER MODE ACTIVATED</span>
    `;
    
    const cursorLine = document.querySelector('.cursor-line');
    outputDiv.insertBefore(newLine, cursorLine);
    
    // Glitch effect
    document.body.style.animation = 'glitch 0.1s infinite';
    
    setTimeout(() => {
        terminal.style.filter = 'none';
        document.body.style.animation = 'none';
    }, 3000);
}

function displaySystemStats() {
    setTimeout(() => {
        const outputDiv = document.querySelector('.terminal-output');
        const statsLine = document.createElement('div');
        statsLine.className = 'line';
        statsLine.innerHTML = `
            <span class="prompt">root@postsilicon:~$</span>
            <span class="command">neofetch</span>
        `;
        
        const statsOutput = document.createElement('div');
        statsOutput.style.paddingLeft = '20px';
        statsOutput.style.marginTop = '10px';
        statsOutput.style.color = '#cccccc';
        statsOutput.innerHTML = `
            <div style="color: #00ff41;">OS:</div>
            <div style="padding-left: 20px;">PostSilicon Linux 2024.1</div>
            <div style="color: #00ff41; margin-top: 10px;">Uptime:</div>
            <div style="padding-left: 20px;">${Math.floor(Date.now() / 86400000)} days</div>
            <div style="color: #00ff41; margin-top: 10px;">Shell:</div>
            <div style="padding-left: 20px;">zsh 5.9 (x86_64-pc-linux-gnu)</div>
            <div style="color: #00ff41; margin-top: 10px;">Terminal:</div>
            <div style="padding-left: 20px;">PostSilicon Terminal v3.14</div>
        `;
        
        const cursorLine = document.querySelector('.cursor-line');
        outputDiv.insertBefore(statsLine, cursorLine);
        outputDiv.insertBefore(statsOutput, cursorLine);
    }, 8000);
}

// Add scan lines effect
function addScanlines() {
    const scanlines = document.createElement('div');
    scanlines.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(transparent 50%, rgba(0, 255, 65, 0.03) 50%);
        background-size: 100% 4px;
        pointer-events: none;
        z-index: 1000;
    `;
    document.body.appendChild(scanlines);
}

// Initialize scan lines
addScanlines();

// Add random terminal commands periodically
setInterval(() => {
    if (Math.random() < 0.3) {
        const commands = [
            'ping matrix.neo',
            'sudo rm -rf /system/agents',
            'decode --matrix blue_pill.enc',
            'whoami',
            'ps aux | grep reality'
        ];
        
        const randomCmd = commands[Math.floor(Math.random() * commands.length)];
        // This could be expanded to actually show these commands in the terminal
    }
}, 10000);

// Screen flicker effect on mouse move
document.addEventListener('mousemove', function() {
    if (Math.random() < 0.01) {
        document.body.style.filter = 'brightness(1.1) contrast(1.1)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 50);
    }
});