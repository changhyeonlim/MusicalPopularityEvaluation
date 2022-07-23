var song_1;
var fft_1;
var particles_1 = [];

var song_2;
var fft_2;
var particles_2 = [];

var features_1 = Levitating_feature; //Change here
var features_2 = Bohemian_Rhapsody_feature;
var song_load_1 = "./static/music_library/Levitating.mp3";
var song_load_2 = "./static/music_library/Bohemian_Rhapsody.mp3";

var flag1 = false;
var flag2 = false;

var amp1_beat_hold = 0;
var amp1_2_hold = 20;
var amp1_hold = 15;
var amp1_3_hold = 10;
var amp1_4_hold = 7;
var amp1_5_hold = 4;
var amp1_5_hold = 2;

var amp2_beat_hold = 0;
var amp2_2_hold = 20;
var amp2_hold = 15;
var amp2_3_hold = 10;
var amp2_4_hold = 7;
var amp2_5_hold = 4;
var amp2_5_hold = 2;

var sketch_song_1 = function (p) {
  p.setup = function () {
    const myPinkCanvas = p.createCanvas(615, 615);
    myPinkCanvas.parent("song_1");
    var button_1 = document.querySelector("#button_1");
    button_1.addEventListener("click", (e) => {
      play_pause_1(song_1);
    });
    fft_1 = new p5.FFT();
  };

  p.preload = function () {
    song_1 = p.loadSound(song_load_1);
  };
  p.draw = function () {
    var color_list = ["#001524", "#15616d", "#ffecd1", "#ff7d00", "#78290f"];
    p.clear();
    p.background(color_list[0]);
    p.stroke(color_list[1]);
    p.strokeWeight(3);
    p.noFill();
    p.smooth();

    p.translate(p.width / 2, p.height / 2);

    p.textSize(12);
    p.textAlign(p.CENTER);
    p.textFont("Open Sans");
    p.textStyle(p.NORMAL);
    p.fill("ffecd1");
    p.noStroke();
    p.text("Dominating in year: "+features_1.year, 0, -215);

    p.textSize(24);
    p.textAlign(p.CENTER);
    p.textFont("Open Sans");
    p.textStyle(p.BOLD);
    p.fill("ffecd1");
    p.noStroke();
    p.text(features_1.title, 0, -190);

    p.textSize(14);
    p.textAlign(p.CENTER);
    p.textFont("Open Sans");
    p.textStyle(p.ITALIC);
    p.fill("ffecd1");
    p.noStroke();
    p.text(features_1.artist, 0, -170);

    if (flag1 == true) {
      fft_1.analyze();
      amp1_beat = fft_1.getEnergy(5, 200);
      amp1_2 = fft_1.getEnergy(5, 100);
      amp1 = fft_1.getEnergy(101, 300); //Get the frequency betweeen 20~200 that are low frequencies
      amp1_3 = fft_1.getEnergy(301, 500);
      amp1_4 = fft_1.getEnergy(501, 700);
      amp1_5 = fft_1.getEnergy(701, 1000);
      amp1_5 = fft_1.getEnergy(1200, 1300);

      amp1_beat_hold = amp1_beat;
      amp1_2_hold = amp1_2;
      amp1_hold = amp1; //Get the frequency betweeen 20~200 that are low frequencies
      amp1_3_hold = amp1_3;
      amp1_4_hold = amp1_4;
      amp1_5_hold = amp1_5;
      amp1_5_hold = amp1_5;
    } else {
      amp1_beat = amp1_beat_hold;
      amp1_2 = amp1_2_hold;
      amp1 = amp1_hold; //Get the frequency betweeen 20~200 that are low frequencies
      amp1_3 = amp1_3_hold;
      amp1_4 = amp1_4_hold;
      amp1_5 = amp1_5_hold;
      amp1_5 = amp1_5_hold;
    }

    var par_gen_threshold_1 = 60 * parseFloat(features_1.speechiness) * 10;
    var par_gen_random_1 = getRandomInt(60);
    if (par_gen_threshold_1 > par_gen_random_1) {
      var p_1 = new Particle(features_1, p);
      particles_1.push(p_1);
    }

    for (var i = particles_1.length - 1; i >= 0; i--) {
      if (!particles_1[i].edges()) {
        particles_1[i].update(amp1_beat > 220);
        particles_1[i].show();
      } else {
        particles_1.splice(i, 1);
      }
    }

    if (features_1.key == 0) {
      color_list_c1 = ["#590d22", "#800f2f", "#ff4d6d", "#ff8fa3", "#ffccd5"];
    }
    if (features_1.key == 1) {
      color_list_c1 = ["#780116", "#c32f27", "#d8572a", "#db7c26", "#f7b538"];
    }

    if (features_1.key == 6) {
      color_list_c1 = ["#6f2dbd", "#a663cc", "#b298dc", "#b8d0eb", "#b9faf8"];
    }

    if (features_1.key == 7) {
      color_list_c1 = ["#ff7b00", "#ff9500", "#ffaa00", "#ffd000", "#ffea00"];
    }

    if (features_1.key == 10) {
      color_list_c1 = ["#168aad", "#34a0a4", "#52b69a", "#99d98c", "#b5e48c"];
    }
    //Glow effect
    p.noStroke();
    p.fill(252, 246, 189, 4);
    for (i = 0; i < 80; i++) {
      p.ellipse(0, 0, (i * 3 * amp1_5) / 120);
    }
    p.fill(255);
    p.stroke(0);

    p.push();
    let c1_1 = p.color(color_list_c1[0]);
    p.noErase();
    p.fill(c1_1);
    p.ellipse(0, 0, amp1_2 + 90);
    p.noStroke();

    let c1_2 = p.color(color_list_c1[1]);
    p.noErase();
    p.fill(c1_2);
    p.ellipse(0, 0, amp1 + 30);
    p.noStroke();

    let c1_3 = p.color(color_list_c1[2]);
    p.noErase();
    p.fill(c1_3);
    p.ellipse(0, 0, amp1_3 + 10);
    p.noStroke();

    let c1_4 = p.color(color_list_c1[3]);
    p.noErase();
    p.fill(c1_4);
    p.ellipse(0, 0, amp1_4 - 30);
    p.noStroke();

    let c1_5 = p.color(color_list_c1[4]);
    p.fill(c1_5);
    p.ellipse(0, 0, amp1_5 - 50);
    p.noStroke();

    p.pop();

    p.noFill();
    let ring_1 = p.color("#D3D3D3");
    p.stroke(ring_1);
    p.strokeWeight(20);
    p.circle(0, 0, 610);

    p.noFill();
    let ring_2 = p.color("#A9A9A9");
    p.stroke(ring_2);
    p.strokeWeight(12);
    p.circle(0, 0, 610);

    p.noFill();
    let ring_3 = p.color("#DCDCDC");
    p.stroke(ring_3);
    p.strokeWeight(5);
    p.circle(0, 0, 610);
  };
};

//secondary sketch
var sketch_song_2 = function (p) {
  p.setup = function () {
    const myBlueCanvas = p.createCanvas(615, 615);
    myBlueCanvas.parent("song_2");

    var button_2 = document.querySelector("#button_2");
    button_2.addEventListener("click", (e) => {
      play_pause_2(song_2);
    });
    fft_2 = new p5.FFT();
  };
  p.preload = function () {
    song_2 = p.loadSound(song_load_2);
  };
  p.draw = function () {
    var color_list = ["#001524", "#15616d", "#ffecd1", "#ff7d00", "#78290f"];
    p.clear();
    p.background(color_list[0]);
    p.stroke(color_list[1]);
    p.strokeWeight(3);
    p.noFill();
    p.smooth();

    p.translate(p.width / 2, p.height / 2);

    p.textSize(12);
    p.textAlign(p.CENTER);
    p.textFont("Open Sans");
    p.textStyle(p.NORMAL);
    p.fill("ffecd1");
    p.noStroke();
    p.text("Dominating in year: "+features_2.year, 0, -215);

    p.textSize(24);
    p.textAlign(p.CENTER);
    p.textFont("Open Sans");
    p.textStyle(p.BOLD);
    p.fill("ffecd1");
    p.noStroke();
    p.text(features_2.title, 0, -190);

    p.textSize(14);
    p.textAlign(p.CENTER);
    p.textFont("Open Sans");
    p.textStyle(p.ITALIC);
    p.fill("ffecd1");
    p.noStroke();
    p.text(features_2.artist, 0, -170);

    if (flag2 == true) {
      fft_2.analyze();
      amp2_beat = fft_2.getEnergy(5, 200);
      amp2_2 = fft_2.getEnergy(5, 100);
      amp2 = fft_2.getEnergy(101, 300); //Get the frequency betweeen 20~200 that are low frequencies
      amp2_3 = fft_2.getEnergy(301, 500);
      amp2_4 = fft_2.getEnergy(501, 700);
      amp2_5 = fft_2.getEnergy(701, 1000);
      amp2_5 = fft_2.getEnergy(1200, 1300);

      amp2_beat_hold = amp2_beat;
      amp2_2_hold = amp2_2;
      amp2_hold = amp2; //Get the frequency betweeen 20~200 that are low frequencies
      amp2_3_hold = amp2_3;
      amp2_4_hold = amp2_4;
      amp2_5_hold = amp2_5;
      amp2_5_hold = amp2_5;
    } else {
      amp2_beat = amp2_beat_hold;
      amp2_2 = amp2_2_hold;
      amp2 = amp2_hold; //Get the frequency betweeen 20~200 that are low frequencies
      amp2_3 = amp2_3_hold;
      amp2_4 = amp2_4_hold;
      amp2_5 = amp2_5_hold;
      amp2_5 = amp2_5_hold;
    }

    var par_gen_threshold_2 = 60 * parseFloat(features_2.speechiness) * 10;
    var par_gen_random_2 = getRandomInt(60);
    if (par_gen_threshold_2 > par_gen_random_2) {
      var p_2 = new Particle(features_2, p);
      particles_2.push(p_2);
    }

    for (var i = particles_2.length - 1; i >= 0; i--) {
      if (!particles_2[i].edges()) {
        particles_2[i].update(amp2_beat > 220);
        particles_2[i].show();
      } else {
        particles_2.splice(i, 1);
      }
    }
    if (features_2.key == 0) {
      color_list_c2 = ["#590d22", "#800f2f", "#ff4d6d", "#ff8fa3", "#ffccd5"];
    }
    if (features_2.key == 1) {
      color_list_c2 = ["#780116", "#c32f27", "#d8572a", "#db7c26", "#f7b538"];
    }
    if (features_2.key == 6) {
      color_list_c2 = ["#6f2dbd", "#a663cc", "#b298dc", "#b8d0eb", "#b9faf8"];
    }
    if (features_2.key == 7) {
      color_list_c2 = ["#ff7b00", "#ff9500", "#ffaa00", "#ffd000", "#ffea00"];
    }

    if (features_2.key == 10) {
      color_list_c2 = ["#168aad", "#34a0a4", "#52b69a", "#99d98c", "#b5e48c"];
    }
    //Glow effect
    p.noStroke();
    p.fill(252, 246, 189, 4);
    for (i = 0; i < 80; i++) {
      p.ellipse(0, 0, (i * 3 * amp2_5) / 120);
    }
    p.fill(255);
    p.stroke(0);

    p.push();
    let c2_1 = p.color(color_list_c2[0]);
    p.fill(c2_1);
    p.ellipse(0, 0, amp2_2 + 90);
    p.noStroke();

    let c2_2 = p.color(color_list_c2[1]);
    p.fill(c2_2);
    p.ellipse(0, 0, amp2 + 30);
    p.noStroke();

    let c2_3 = p.color(color_list_c2[2]);
    p.fill(c2_3);
    p.ellipse(0, 0, amp2_3 + 10);
    p.noStroke();

    let c2_4 = p.color(color_list_c2[3]);
    p.fill(c2_4);
    p.ellipse(0, 0, amp2_4 - 30);
    p.noStroke();

    let c2_5 = p.color(color_list_c2[4]);
    p.fill(c2_5);
    p.ellipse(0, 0, amp2_5 - 50);
    p.noStroke();

    p.pop();

    p.noFill();
    let ring_1 = p.color("#D3D3D3");
    p.stroke(ring_1);
    p.strokeWeight(20);
    p.circle(0, 0, 610);

    p.noFill();
    let ring_2 = p.color("#A9A9A9");
    p.stroke(ring_2);
    p.strokeWeight(12);
    p.circle(0, 0, 610);

    p.noFill();
    let ring_3 = p.color("#DCDCDC");
    p.stroke(ring_3);
    p.strokeWeight(5);
    p.circle(0, 0, 610);
  };
};

function play_pause_1(song, flag) {
  if (song.isPlaying()) {
    song.pause();
    flag1 = false;
    flag2 = true;
  } else {
    song.play();
    flag1 = true;
    flag2 = false;
  }
}

function play_pause_2(song, flag) {
  if (song.isPlaying()) {
    song.pause();
    flag1 = true;
    flag2 = false;
  } else {
    song.play();
    flag1 = false;
    flag2 = true;
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

class Particle {
  constructor(features, p) {
    this.p = p;
    this.pos = p5.Vector.random2D().mult(40);
    this.vel = p.createVector(0, 0);
    this.acc = this.pos.copy().mult(p.random(0.0001, 0.000001));
    this.w = p.random(3, 20);
    //this.color=sample(color_list);
    this.color = [p.random(100, 255), p.random(150, 255), p.random(150, 255)];
    this.feature = parseInt(features.tempo);
  }
  edges() {
    if (
      this.pos.x < -this.p.width / 2 ||
      this.pos.x > this.p.width / 2 ||
      this.pos.y < -this.p.height / 2 ||
      this.pos.y > this.p.height / 2
    ) {
      return true;
    } else {
      return false;
    }
  }

  update(cond) {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    var adj_acc = Math.round(parseInt(this.feature) / 22);

    if (cond) {
      for (var i = 0; i < adj_acc; i++) {
        this.pos.add(this.vel);
      }
    }
  }
  show() {
    this.p.noStroke();
    this.p.fill(this.color);
    this.p.noErase();
    this.p.ellipse(this.pos.x, this.pos.y, 4);
  }
}

var play_song_1 = new p5(sketch_song_1);
var play_song_2 = new p5(sketch_song_2);
