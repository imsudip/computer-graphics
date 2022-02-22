

var sketch = function (p) {
  p.radius = 1;
  p.drawing = false;
  p.k = 0;
  p.fr = 5
  p.x = 0;
  p.y = 0;
  p.pp = 0;
  p.enableLines = false;
  p.scale = 1;
  p.resolution = 2;
  p.maxRadius = 0;
  p.setup = function () {
    p.createCanvas(610, 610);
    p.frameRatelistener();
    p.resolutionlistener();
    document.getElementById("drawCircle").addEventListener("click", p.drawCircle);
    document.getElementById("framerate").addEventListener("change", p.frameRatelistener);
    document.getElementById("resolution").addEventListener("change", p.resolutionlistener);
  }
  p.frameRatelistener = function () {
    p.fr = (document.getElementById("framerate").value);
    document.getElementById("framerateLabel").innerHTML = "Framerate: " + p.fr;
    p.frameRate(Number(p.fr));
  }
  p.resolutionlistener = function () {
    p.resolution = document.getElementById("resolution").value;
    p.maxRadius = 600 / 2 / p.resolution;
    document.getElementById("resolutionLabel").innerHTML = "Resolution: 1/" + p.resolution + "X";
    document.getElementById("radius").placeholder = "Radius ( upto " + p.maxRadius + " ) in px";
    document.getElementById("radius").value = "";
  }
  p.drawCircle = function () {
    p.radius = Number(document.getElementById("radius").value);
    if (p.radius > 0 && p.radius <= p.maxRadius) {
      p.drawing = true;
      p.resetSketch();
    }
    else {
      alert("Please enter a radius between 0 and " + p.maxRadius);
      document.getElementById("radius").value = "";
    }
  }
  p.addrow = function () {
    var table = document.getElementById("cTable");
    var row = table.insertRow();
    row.className = "bg-gray-700 border-b border-gray-600";
    for (var i = 0; i < 4; i++) {
      var cell = row.insertCell(i);
      cell.className = "px-4 py-3";
      cell.innerHTML = i == 0 ? p.k : i == 1 ? p.pp : i == 2 ? p.x : i == 3 ? p.y : '';

    }
    //scroll to bottom of the table
    var div = document.getElementById('scrollContainer');
    div.scrollTop = div.scrollHeight - div.clientHeight;
  }

  p.resetSketch = function () {
    p.background(255);
    document.getElementById("cTable").innerHTML = `<thead class="relative text-left border-b border-gray-300">
    <th class="sticky top-0 px-4 py-3 bg-gray-800 rounded-t-lg">K</th>
    <th class="sticky top-0 px-4 py-3 bg-gray-800 rounded-t-lg">P<sub>k</sub></th>
    <th class="sticky top-0 px-4 py-3 bg-gray-800 rounded-t-lg">X <sub>k+1</sub></th>
    <th class="sticky top-0 px-4 py-3 bg-gray-800 rounded-t-lg">Y <sub>k+1</sub></th>
  </thead>
  <tbody class="bg-gray-700 border-b border-gray-600" id="tableBody">

  </tbody>`;
    p.k = 0;
    p.x = 0;
    p.y = p.radius;
    p.pp = 1 - p.radius;
    p.enableLines = document.getElementById("enableLines").checked;
    p.addrow();
    p.k++;
  }
  p.draw = function () {

    p.translate(p.width / 2, p.height / 2);

    if (p.drawing) {
      p.plot(p.x, p.y);
      if (p.x < p.y) {
        if (p.pp < 0) {
          p.x += p.scale;
        }
        else {
          p.x += p.scale;
          p.y -= p.scale;
        }
        console.log(p.x, p.y);
        p.addrow();
        if (p.pp < 0) {
          p.pp += 2 * p.x + 1;
        } else {
          p.pp += 2 * (p.x - p.y) + 1;
        }
        p.k++;
      }
    } else {
      p.drawing = false;
    }
  }
  p.getNewPoint = function (a, b) {
    let v = p.createVector(a, b);
    let u = p.createVector(a / v.mag(), b / v.mag()).mult(p.radius * p.resolution - 10);
    let f = p.createVector(0, 0).add(u);
    p.line(0, 0, f.x, f.y);
  }
  p.plot = function (a, b) {
    a *= p.resolution;
    b *= p.resolution;
    //change the color of the line on each point drawn
    p.strokeWeight(3);
    p.stroke('violet');
    p.point(a, b);
    p.stroke('indigo');
    p.point(a, -b);
    p.stroke('blue');
    p.point(-a, b);
    p.stroke('green');
    p.point(-a, -b);
    p.stroke('yellow');
    p.point(b, a);
    p.stroke('orange');
    p.point(b, -a);
    p.stroke('red');
    p.point(-b, a);
    p.stroke('black');
    p.point(-b, -a);
    if (p.enableLines) {
      p.strokeWeight(1);
      p.stroke('violet');
      p.getNewPoint(a, b);
      p.stroke('indigo');
      p.getNewPoint(a, -b);
      p.stroke('blue');
      p.getNewPoint(-a, b);
      p.stroke('green');
      p.getNewPoint(-a, -b);
      p.stroke('yellow');
      p.getNewPoint(b, a);
      p.stroke('orange');
      p.getNewPoint(b, -a);
      p.stroke('red');
      p.getNewPoint(-b, a);
      p.stroke('black');
      p.getNewPoint(-b, -a);
    } else {
      p.strokeWeight(1);
      p.stroke('#C0C0C0');
      p.line(0, 310, 0, -310);
      p.line(310, 0, -310, 0);
      p.triangle(-5, 295, 0, 305, 5, 295);
      p.triangle(-5, -295, 0, -305, 5, -295);
      p.triangle(295, -5, 305, 0, 295, 5);
      p.triangle(-295, -5, -305, 0, -295, 5);

      for (let i = -p.maxRadius; i <= p.maxRadius; i += 10) {
        p.line(i * p.resolution, 3, i * p.resolution, -3);
      }
      for (let i = -p.maxRadius; i <= p.maxRadius; i += 10) {
        p.line(3, i * p.resolution, -3, i * p.resolution);
      }

    }

  }
}

var myp5 = new p5(sketch, 'circles');

