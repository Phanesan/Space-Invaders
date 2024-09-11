function playSound(URL, volume = 1) {
    const audio = new Audio(URL);
    audio.volume = volume;
    audio.play();
}

function drawText(ctx, text, x, y, fontSize, font, color, textAlign = 'center', textBaseline = 'middle') {
    ctx.font = `${fontSize}px ${font}`;
    ctx.fillStyle = color;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.fillText(text, x, y);
}