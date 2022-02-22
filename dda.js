var sketch2 = function (p) {
    p.drawing = false;
    p.maxLimit = 100;
    p.interval = 0;
    p.x1 = -40;
    p.y1 = -40;
    p.x2 = 25;
    p.y2 = 600;
    p.steps = 0;
    p.xIncrement = 0;
    p.yIncrement = 0;
    p.dy = 0;
    p.dx = 0;
    p.k = 0;
    p.setup = function () {
        p.createCanvas(610, 610);

        document.getElementById("drawLine").addEventListener("click", p.drawLine);

        // p.line(p.x1, p.y1, p.x2, p.y2);
    }
    p.addrow = function (x, y) {
        var table = document.getElementById("lTable");
        var row = table.insertRow();
        row.className = "bg-gray-700 border-b border-gray-600";
        for (var i = 0; i < 2; i++) {
            var cell = row.insertCell(i);
            cell.className = "px-4 py-3";
            cell.innerHTML = i == 0 ? p.k : "( " + x + ", " + y + " )";

        }
        //scroll to bottom of the table
        var div = document.getElementById('scrollContainer2');
        div.scrollTop = div.scrollHeight - div.clientHeight;
        p.k++;
    }
    p.drawLine = function () {
        p.background(255);
        p.k = 0;
        document.getElementById("lTable").innerHTML = `<thead class="relative text-left border-b border-gray-300">
        <th class="sticky top-0 px-4 py-3 bg-gray-800 rounded-t-lg">K</th>
        <th class="sticky top-0 px-4 py-3 bg-gray-800 rounded-t-lg">( X<sub>k</sub> , Y<sub>k</sub> )</th>

      </thead>
      <tbody class="bg-gray-700 border-b border-gray-600" id="tableBody">

      </tbody>`;
        p.x1 = Number(document.getElementById("x1").value);
        p.y1 = Number(document.getElementById("y1").value);
        p.x2 = Number(document.getElementById("x2").value);
        p.y2 = Number(document.getElementById("y2").value);
        p.drawCartesian();
        p.resolvePoints();
        p.drawpoint(p.x1, p.y1);
        p.calcVariables();
    }
    p.calcVariables = function () {
        p.dy = p.y2 - p.y1;
        p.dx = p.x2 - p.x1;
        p.steps = Math.abs(p.dx) > Math.abs(p.dy) ? Math.abs(p.dx) : Math.abs(p.dy);
        p.xIncrement = p.dx / p.steps;
        p.yIncrement = p.dy / p.steps;
    }
    p.draw = function () {
        p.frameRate(30);
        if (p.steps > 0) {
            p.x1 += p.xIncrement;
            p.y1 += p.yIncrement;
            p.drawpoint(Math.round(p.x1), Math.round(p.y1));
            p.steps--;
        }
    }
    p.drawCartesian = function () {
        p.translate(p.width / 2, p.height / 2);
        p.strokeWeight(1);
        p.stroke('#C0C0C0');
        p.line(0, 310, 0, -310);
        p.line(310, 0, -310, 0);
        p.triangle(-5, 295, 0, 305, 5, 295);
        p.triangle(-5, -295, 0, -305, 5, -295);
        p.triangle(295, -5, 305, 0, 295, 5);
        p.triangle(-295, -5, -305, 0, -295, 5);


    }
    p.resolvePoints = function () {
        //max of x1,x2,y1,y2
        let max = Math.max(Math.abs(p.x1), Math.abs(p.x2), Math.abs(p.y1), Math.abs(p.y2));
        max *= 2;
        //next multiple of 10 to max
        max = (Math.ceil(max / 10) * 10);
        p.maxLimit = max;
        //make all values fit between -multiple and multiple
        // p.x1 = 580 * p.x1 / max;
        // p.x2 = 580 * p.x2 / max;
        // p.y1 = 580 * p.y1 / max;
        // p.y2 = 580 * p.y2 / max;
        // console.log(p.x1, p.x2, p.y1, p.y2);
    }
    p.drawpoint = function (a, b) {
        p.addrow(a, b);
        p.translate(p.width / 2, p.height / 2);
        p.rotate(p.radians(270));
        var nMax = p.maxLimit / 2;
        var m = p.map(a, -nMax, nMax, -290, 290);
        var n = p.map(b, -nMax, nMax, -290, 290);
        a = m;
        b = n;
        p.strokeWeight(3);
        p.stroke('black');
        console.log(a, b);
        p.point(b, a);

    }
};

var myp5_2 = new p5(sketch2, 'dda');