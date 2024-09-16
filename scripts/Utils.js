function playSound(URL, volume = 1) {
    const audio = new Audio(URL);
    audio.volume = volume;
    audio.play();

    return audio;
}

function drawText(ctx, text, x, y, fontSize, font, color, textAlign = 'center', textBaseline = 'middle', lineWidth = 2, strokeColor = 'black') {
    ctx.font = `${fontSize}px ${font}`;
    ctx.fillStyle = color;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.fillText(text, x, y);

    ctx.strokeStyle = strokeColor;
    ctx.textBaseline = textBaseline;
    ctx.textAlign = textAlign;
    ctx.lineWidth = lineWidth;
    ctx.strokeText(text, x, y);
}

function drawRect(ctx, x, y, width, height, color, opacity = 1) {
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    ctx.globalAlpha = 1;
}

// funcion para hacer un cuadrado sin relleno
function drawSquare(ctx, x, y, width, height, color, lineWidth = 2, opacity = 1) {
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.strokeRect(x, y, width, height);
    ctx.globalAlpha = 1;
}

function drawImage(ctx, img, x, y, width, height, angle) {
    ctx.save();
    ctx.translate(x + (width / 2), y + (height / 2));
    ctx.rotate(angle * Math.PI / 180);
    ctx.drawImage(img, width / -2, height / -2, width, height);
    ctx.restore();
}

function probability(prob) {
    return Math.random() < prob;
}