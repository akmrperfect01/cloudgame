const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let player = { x: 180, y: 350, size: 30 };
let enemies = [];
let score = 0;

function spawnEnemy() {
    enemies.push({ x: Math.random() * 370, y: -30, size: 25, speed: 3 + Math.random() * 4 });
}

function update() {
    ctx.clearRect(0, 0, 400, 400);
    
    // Draw Player
    ctx.fillStyle = "#0078D4";
    ctx.fillRect(player.x, player.y, player.size, player.size);
    
    // Draw and Move Enemies
    ctx.fillStyle = "#e81123";
    enemies.forEach((enemy, index) => {
        enemy.y += enemy.speed;
        ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);

        // Collision Check
        if (player.x < enemy.x + enemy.size && player.x + player.size > enemy.x &&
            player.y < enemy.y + enemy.size && player.y + player.size > enemy.y) {
            alert("Score: " + score);
            score = 0;
            enemies = [];
        }

        if (enemy.y > 400) {
            enemies.splice(index, 1);
            score++;
        }
    });

    if (Math.random() < 0.03) spawnEnemy();
    requestAnimationFrame(update);
}

window.addEventListener('keydown', e => {
    if (e.key === "ArrowLeft" && player.x > 0) player.x -= 20;
    if (e.key === "ArrowRight" && player.x < 370) player.x += 20;
});

update();
