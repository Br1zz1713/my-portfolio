
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
let mouse = { x: null, y: null };

// Configuration for easy tweaking
const config = {
    particleCount: 80,
    connectionDistance: 150,
    mouseDistance: 200,
    particleSpeed: 0.5,
    baseColor: 'rgba(255, 255, 255, 0.5)', // Default light mode
    lineColor: 'rgba(255, 255, 255, 0.15)'
};

// Handle sizing
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Particle Class
class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * config.particleSpeed;
        this.vy = (Math.random() - 0.5) * config.particleSpeed;
        this.size = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction
        if (mouse.x != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < config.mouseDistance) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (config.mouseDistance - distance) / config.mouseDistance;
                // Gently push away or pull towards (using push away for 'network' feel)
                const direction = -1;
                this.vx += forceDirectionX * force * direction * 0.05;
                this.vy += forceDirectionY * force * direction * 0.05;
            }
        }
    }

    draw() {
        ctx.fillStyle = getThemeColor();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Helpers
function getThemeColor() {
    const theme = document.documentElement.getAttribute('data-theme');
    return theme === 'dark' ? 'rgba(0, 229, 255, 0.7)' : 'rgba(255, 255, 255, 0.7)';
}

function getLineColor() {
    const theme = document.documentElement.getAttribute('data-theme');
    return theme === 'dark' ? 'rgba(127, 88, 232, 0.2)' : 'rgba(255, 255, 255, 0.2)';
}

function init() {
    particles = [];
    for (let i = 0; i < config.particleCount; i++) {
        particles.push(new Particle());
    }
}

// Animation Loop
function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Draw connections
        for (let j = i; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < config.connectionDistance) {
                ctx.strokeStyle = getLineColor();
                ctx.lineWidth = 1 - distance / config.connectionDistance;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}

// Mouse Listeners
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

// Start
init();
animate();
