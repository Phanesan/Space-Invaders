function playSound(URL, volume = 1) {
    const audio = new Audio(URL);
    audio.volume = volume;
    audio.play();
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

function drawRect(ctx, x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}