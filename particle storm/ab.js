// Generated by CoffeeScript 1.12.4
(function() {
  $(function() {
    var animation, colors, createSprites, createTexture, frames, height, particles, render, renderer, sprites, stage, width, x, y;
    width = window.innerWidth;
    height = window.innerHeight;
    x = width / 2;
    y = height / 2;
    stage = new PIXI.Container();
    render = new PIXI.autoDetectRenderer(width, height);
    colors = [0xb8d000, 0x2175d9, 0xed1b24, 0x35b4d6, 0xff9900, 0xe30074];
    document.body.appendChild(render.view);
    renderer = function() {
      render.render(stage);
      return requestAnimationFrame(renderer);
    };
    particles = new PIXI.particles.ParticleContainer(1000, {
      position: true,
      rotation: true,
      alpha: true,
      scale: true,
      uvs: true
    });
    stage.addChild(particles);
    createTexture = function(colors, size) {
      var color, cx, cy, frame, graphics, i, j, len, list, rect, rx, ry, texture;
      list = [];
      cx = size;
      cy = size;
      graphics = new PIXI.Graphics();
      graphics.lineStyle(0);
      for (i = j = 0, len = colors.length; j < len; i = ++j) {
        color = colors[i];
        rx = size * 2 * i + size;
        ry = size;
        graphics.beginFill(color, 0.5);
        graphics.drawCircle(rx, ry, size);
      }
      graphics.endFill();
      texture = graphics.generateCanvasTexture(1, 1);
      i = 0;
      while (i < texture.width) {
        rect = new PIXI.Rectangle(i, 0, size * 2, size * 2);
        frame = new PIXI.Texture(texture.baseTexture, rect);
        list.push(frame);
        i += size * 2;
      }
      return list;
    };
    createSprites = function(total, arr_ture) {
      var i, sprite, sprites;
      sprites = [];
      i = 0;
      while (i < total) {
        sprite = new PIXI.Sprite(_.sample(arr_ture));
        sprite.x = x;
        sprite.y = y;
        sprites.push(sprite);
        particles.addChild(sprite);
        i++;
      }
      return sprites;
    };
    frames = createTexture(colors, 12);
    sprites = createSprites(400, frames);
    animation = function() {
      var attrs, create, delay, i, j, len, radius, results, sprite, suiji, tl, values;
      results = [];
      for (i = j = 0, len = sprites.length; j < len; i = ++j) {
        sprite = sprites[i];
        TweenMax.set(sprite, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight
        });
        tl = new TimelineMax({
          repeat: -1,
          yoyo: true
        });
        delay = 5 * Math.random();
        suiji = 100 * Math.random();
        radius = sprite.width / 2;
        create = function(x, y, radius) {
          var degree, list;
          list = [];
          degree = 0;
          i = 100;
          while (i > 0) {
            y = y + Math.sin(degree * 180 / Math.PI) * radius;
            x = x + Math.cos(degree * 180 / Math.PI) * radius;
            list.push({
              x: x,
              y: y
            });
            degree += 3.6;
            i--;
          }
          return list;
        };
        values = create(sprite.x, sprite.y, 80);
        attrs = {
          bezier: {
            values: values,
            type: "cubic",
            autoRotate: true
          },
          ease: Power1.easeInOut
        };
        results.push(tl.to(sprite, 6, attrs, 0));
      }
      return results;
    };
    renderer();
    return animation();
  });

}).call(this);
