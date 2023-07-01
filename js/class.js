class Ball {
    constructor(args) {
        let def = {
            x: 0,
            y: 0,
            m: 0, // Massa
            degree: 0, // sudut
            g: 0, //gravity
            diameter: 20, // Radius
            second: 2, // Waktu yang dibutuhkan untuk menyelesaikan program
            startTime: 0, // Waktu Mulai 
            pathColor: 'red', // Warna jalur
            isUpdate: false,
            pos: { x: 0, y: 0 },
            v: { val: 0, x: 0, y: 0 }, // Perubahan kecepatan
            max: { y: 0, x: 0, degree: 45 },
            pastTime: 0, // Waktu yang berlalu
            data: [], // Data
            pathData: [], // Lintasan yang harus digambar
           
        }
        Object.assign(def, args);
        Object.assign(this, def);
    }
    setValue() {
        this.totalTime = 0;
        this.isUpdate = false;
        this.y = parseFloat($('#height').val());
        this.v.val = parseFloat($('#velocity').val());
        this.degree = parseFloat($('#degree').val());
        this.g = parseFloat($('#gravity').val());
        this.m = parseFloat($('#mass').val());
        this.v.x = cos(this.degree) * this.v.val;
        this.v.y = sin(this.degree) * this.v.val;
        this.max.degree = atan(this.v.val / sqrt(pow(this.v.val, 2) + 2 * this.g * this.y));
        this.init();
    }
    init() {
        // Durasi Terbang
        this.overTime = this.projectTime(); // Waktu berakhir
        this.dTime = min(this.overTime / 500, 0.001); // Interval waktu
        this.pos.x = this.x;
        this.pos.y = this.y;
        
    }
    start() {
        this.setValue();
        this.isUpdate = true;
        this.data = [this.position];
        this.pathData = [this.position];
        while (this.pos.y >= 0) {
            this.pastTime += this.dTime;
            let newPos = this.move();
            this.pos.x += newPos.x;
            this.pos.y += newPos.y;
            this.data.push(this.position);
        }
        this.totalTime = this.pastTime; // Menggunakan nilai pastTime sebagai waktu total
        this.pos.x = this.x;
        this.pos.y = this.y;
        this.pathGrid = floor(this.data.length / 200); // Jumlah titik yang diambil
        this.pathIndex = 0;

         // Menghitung jarak tempuh
    let totalDistance = this.data[this.data.length - 1].x - this.data[0].x;

    // Menampilkan hasil jarak tempuh di elemen HTML dengan ID 'distance-result'
    const distanceResult = document.getElementById('distance-result');
    distanceResult.textContent = totalDistance.toFixed(2) ;   

    // Menampilkan hasil jarak waktu di elemen HTML dengan ID 'time-result'
    const timeResult = document.getElementById('time-result');
    timeResult.textContent = this.totalTime.toFixed(2) ;

    }
    projectTime(vy = this.v.y) {
        let a = -this.g;
        let b = 2 * vy;
        let c = 2 * this.y;
        let bb4ac = sqrt(pow(b, 2) - 4 * a * c);
        let t = max((-b + bb4ac) / (2 * a), (-b - bb4ac) / (2 * a));
        return t;
    }
    
    distance(degree) {
        let distance = 0;

        let vx = (cos(degree) * pow(this.v.val, 2) ) / this.g ;
        let vy = (sin(degree) * pow(this.v.val, 2) ) / this.g ;
        distance = this.projectTime(vy) * vx;

        this.angleWithDistance.push(distance);
    }
    drawDistance() {
        stroke(this.pathColor);
        strokeWeight(2);
        beginShape();
        noFill();
        this.angleWithDistance.forEach((point, index) => vertex(xGrid * index / 10, -point * scale));
        endShape();
    }
    get C_Drag() {
        return { x: 0, y: -this.g };
    }
    get position() {
        return { time: this.pastTime, vx: this.v.x, vy: this.v.y, ...this.pos };
    }
    
    arrow() {
        let startLen = 25;
        let endLen = 55;
        let v0 = createVector(this.pos.x * scale + startLen * cos(this.degree), -this.pos.y * scale - startLen * sin(this.degree));
        let v1 = createVector(endLen * cos(this.degree), -endLen * sin(this.degree));
        drawArrow(v0, v1, 'red ');
    }
    path() { // Gambar jalur
        stroke(this.pathColor);
        strokeWeight(2);
        beginShape();
        noFill();
        this.pathData.forEach(point => vertex(point.x * scale, -point.y * scale));
        endShape();
    }
    draw() {
        this.update();
        push();
        translate(boundary, size.h - boundary);
        if (!this.isUpdate) // Gambar panah sudut
            this.arrow();
        this.path();
        fill('white');
        stroke('black');
        circle(this.pos.x * scale, -this.pos.y * scale, this.diameter);
        pop();
    }
    move() { // Posisi yang dituju
        let c = this.C_Drag;

        this.v.x = this.v.x + c.x * this.dTime;
        this.v.y = this.v.y + c.y * this.dTime;
        return {
            x: (this.v.x * this.dTime) - (0.5 * 0 * pow(this.dTime, 2)),
            y: (this.v.y * this.dTime) - (0.5 * this.g * pow(this.dTime, 2))
        };
    }
    update() {
        if (!this.isUpdate || this.pos.y < 0) return;
        this.pathIndex += this.pathGrid;
        if (this.pathIndex >= this.data.length) { // Terkahir
            this.pos.y = this.data[this.data.length - 1].y;
            this.pos.x = this.data[this.data.length - 1].x;
            this.pathData.push(this.data[this.data.length - 1]);
            return;
        }
        this.pathData.push(this.data[this.pathIndex]);
        this.pos.y = this.data[this.pathIndex].y;
        this.pos.x = this.data[this.pathIndex].x;
    }
}
