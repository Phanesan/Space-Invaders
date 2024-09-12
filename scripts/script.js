document.getElementById('canvas').width = document.body.clientWidth;
document.getElementById('canvas').height = document.body.clientHeight;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var start = false;

ctx.font = '50px Arial';
ctx.fillStyle = 'white';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('CLICK PARA INICIAR EL JUEGO', canvas.width / 2, canvas.height / 2);

document.addEventListener("click", (event) => {
    if(!start) {
        const gameManager = new GameManager();
        gameManager.start();

        start = true;
    }
});
