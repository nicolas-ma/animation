$(function() {
    var app = new PIXI.Application();
    document.body.appendChild(app.view);

    var count = 0;
    var duan = 16;
    // build a rope!
    var ropeLength = 918 / duan;


    var points = [];

    for (var i = 0; i < duan; i++) {
        points.push(new PIXI.Point(i * ropeLength, 0));
    }

    var strip = new PIXI.mesh.Rope(PIXI.Texture.fromImage('./snake.png'), points);

    strip.x = -40;
    strip.y = 300;

    app.stage.addChild(strip);

    var g = new PIXI.Graphics();
    g.x = strip.x;
    g.y = strip.y;
    app.stage.addChild(g);

    // start animating


    app.ticker.add(function() {

        count += 0.1;

        // make the snake
        for (var i = 0; i < points.length; i++) {
            points[i].y = Math.sin((i * 0.5) + count) * 30;
            points[i].x = i * ropeLength + Math.cos((i * 0.3) + count) * 20;
        }
        renderPoints();
    });

    function renderPoints() {

        g.clear();

        g.lineStyle(2, 0xffc2c2);
        g.moveTo(points[0].x, points[0].y);

        for (var i = 1; i < points.length; i++) {
            g.lineTo(points[i].x, points[i].y);
        }

        for (var i = 1; i < points.length; i++) {
            g.beginFill(0xff0022);
            g.drawCircle(points[i].x, points[i].y, 10);
            g.endFill();
        }
    }

})
