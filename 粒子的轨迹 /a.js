$(function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var x = width / 2;
    var y = height / 2;
    var stage = new PIXI.Container();
    var render = new PIXI.autoDetectRenderer(width, height);
    var colors = [0xb8d000, 0x2175d9, 0xed1b24, 0x35b4d6, 0xff9900, 0xe30074];
    document.body.appendChild(render.view);

    function renderer() {
        render.render(stage);
        requestAnimationFrame(renderer);

    }

    function createTexture(colors, size) {
        var list = [];
        var cx = size;
        var cy = size;
        var graphics = new PIXI.Graphics();
        graphics.lineStyle(0);
        for (var i = 0; i < colors.length; i++) {
            var rx = size * 2 * i + size;
            var ry = size;
            graphics.beginFill(colors[i], 0.5);
            graphics.drawCircle(rx, ry, size);

        }
        graphics.endFill();
        var texture = graphics.generateCanvasTexture(1, 1);
        for (var i = 0; i < texture.width; i += size * 2) {
            var rect = new PIXI.Rectangle(i, 0, size * 2, size * 2);
            var frame = new PIXI.Texture(texture.baseTexture, rect);
            list.push(frame);
        }
        return list;
    }
    var particles = new PIXI.particles.ParticleContainer(1000, {
        position: true,
        rotation: true,
        alpha: true,
        scale: true,
        uvs: true
    });
    stage.addChild(particles);

    function createSprites(total, arr_ture) {
        var sprites = [];
        for (var i = 0; i < total; i++) {
            var sprite = new PIXI.Sprite(_.sample(arr_ture));
            sprite.x = x;
            sprite.y = y;
            sprites.push(sprite);
            particles.addChild(sprite);
            // stage.addChild(sprite);
        }

        return sprites;
    }

    var frames = createTexture(colors, 12);
    var sprites = createSprites(200, frames)

    console.log(sprites);
    var tl = new TimelineMax;



    function animation() {
        console.log("animation");
        for (var i = 0; i < sprites.length; i++) {
            var new_s = sprites[i];
            var new_x = x + Math.sin(Math.random() * (2 * Math.PI)) * 500;
            var new_y = y + Math.cos(Math.random() * (2 * Math.PI)) * 500;

            tl.to(new_s, 0.1, {
                alpha: 1
            }, "start").to(new_s, 1, {
                x: new_x,
                y: new_y
            }, Math.random() * 2)
        }
    }


    animation();
    renderer();
    // TweenLite.ticker.addEventListener("tick", render);

    $("#button").click(function() {

    })

})
