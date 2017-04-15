$(function() {
    console.log("start");
    var app = new PIXI.Application();
    document.body.appendChild(app.view);

    var count = 0;

    // build a rope!
    var ropeLength = 918 / 20;

    var points = [];

    for (var i = 0; i < 20; i++) {
        var point = new PIXI.Point(i * ropeLength, 0);
        points.push(point);
        // app.stage.addChild(point);
    }

    var strip = new PIXI.mesh.Rope(PIXI.Texture.fromImage('./snake.png'), points);

    strip.x = -459;

    var snakeContainer = new PIXI.Container();
    snakeContainer.x = 400;
    snakeContainer.y = 300;

    snakeContainer.scale.set(800 / 1100);
    app.stage.addChild(snakeContainer);

    snakeContainer.addChild(strip);
    for (var i = 0; i < points.length; i++) {
        var graphic = new PIXI.Graphics();
        graphic.beginFill(0xffffff, 1);
        graphic.drawCircle(points[i].x, points[i].y, 2);
        graphic.endFill();
        app.stage.addChild(graphic);
    }

    app.ticker.add(function() {

        count += 0.1;

        // make the snake
        for (var i = 0; i < points.length; i++) {
            points[i].y = Math.sin((i * 0.5) + count) * 30;
            points[i].x = i * ropeLength + Math.cos((i * 0.3) + count) * 20;
        }
    });
})
