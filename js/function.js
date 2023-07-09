let setValue = () => balls.forEach(ball => ball.setValue());

let setBoundary = () => { // Mengatur pergeseran koordinat
    size = { w: windowWidth * 1, h: windowHeight * 1 };
    let temp = min(size.w, size.h);
    boundary = temp * 6 / 100;
    xGrid = (size.w - boundary - 50) / 9;
}

let axis = () => {
    push();
    translate(boundary, size.h - boundary);

    let boardCount = size.w / (base * scale);
    if (boardCount > 12) {
        base *= 2;
        boardCount /= 2;
    } else if (boardCount < 6) {
        base /= 2;
        boardCount *= 2;
    }

    // sumbu 10 meter
    textSize(12)
    fill('#0D1117');
    strokeWeight(1);
    textAlign(CENTER)
    for (let bx = 0; bx < size.w; bx += base / 5 * scale){
        stroke('#4cbaed');
        line(bx, 0, bx, -size.h);
        noStroke();
        if (round(bx / scale, 3) % 25 != 0){
            text(round(bx / scale, 3), bx, 10);
        }
    }
    for (let by = 0; by < size.h; by += base / 5 * scale){
        stroke('#4cbaed');
        line(0, -by, size.w, -by);
        noStroke();
        if (round(by / scale, 3) % 25 != 0){
            text(round(by / scale, 3), -15, -by);
        }
    }

    // 50 sumbu meter
    textSize(16);
    strokeWeight(3);
    fill('#0D1117');
    textAlign(CENTER);
    for (let bx = base * scale; bx < size.w; bx += base * scale) {
        // stroke('rgb(160,0,0)');
        stroke('#0627c9')
        line(bx, 0, bx, -size.h);
        noStroke();
        textStyle('bold');
        text(round(bx / scale, 3), bx, 16);
    }
    textAlign(RIGHT, CENTER);
    for (let by = base * scale; by < size.h; by += base * scale) {
        // stroke('rgb(160,0,0)');
        stroke('#0627c9')
        line(0, -by, size.w, -by);
        noStroke();
        textStyle('bold');
        text(round(by / scale, 3), -5, -by);
    }

    

    // Sumbu x y
    textAlign(CENTER, CENTER);
    // stroke('red');
    stroke('black');
    strokeWeight(5);
    line(0, boundary, 0, -size.h);
    line(-boundary, 0, size.w, 0);
    noStroke();
    text(0, -15, 15);
    pop();

    textAlign(CENTER, TOP); // Menetapkan poros teks ke tengah horizontal dan bagian atas
    textSize(40); // Menetapkan ukuran teks
    fill('#000000'); // Menetapkan warna teks
    let textContent = "Projectile Motion"; // Konten teks yang ingin ditampilkan
    text(textContent, width / 2, 10)
}

let drawArrow = (base, vec, color) => {
    let arrowSize = 7;
    push();
    stroke(color);
    strokeWeight(3);
    fill(color);
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
}

// Mengatur ulang bola dan lintasan bola ke kondisi awal
const resetBalls = () => {
    balls.forEach(ball => {
        ball.isUpdate = false;
        ball.data = [];
        ball.pathData = [];
        ball.pos.x = ball.x;
        ball.pos.y = ball.y;
    });

    // Menghapus hasil jarak tempuh dan jarak waktu
    const distanceResult = document.getElementById('distance-result');
    distanceResult.textContent = "0";
    const timeResult = document.getElementById('time-result');
    timeResult.textContent = "0";
};

// Mendengarkan klik tombol restart
$('#restart').click(() => {
    resetBalls();
});

// Fungsi setup dan draw lainnya tetap sama seperti sebelumnya

