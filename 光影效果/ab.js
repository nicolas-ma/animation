// Generated by CoffeeScript 1.12.4
(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $(function() {
    var ParticleEngine, new_c;
    ParticleEngine = (function() {
      function ParticleEngine() {
        this.renderer = bind(this.renderer, this);
        this.drawBgLight = bind(this.drawBgLight, this);
        this.width = 800;
        this.height = 600;
        this.stage = new PIXI.Container();
        this.render = new PIXI.autoDetectRenderer(this.width, this.height);
        this.compositeStyle = "lighter";
        this.particleSettings = [
          {
            id: "small",
            num: 300,
            fromX: 0,
            toX: 400,
            ballwidth: 3,
            alphamax: 0.4,
            areaHeight: .5,
            color: '#0cdbf3',
            fill: false
          }, {
            id: "medium",
            num: 100,
            fromX: 0,
            toX: 400,
            ballwidth: 8,
            alphamax: 0.3,
            areaHeight: 1,
            color: '#6fd2f3',
            fill: true
          }, {
            id: "large",
            num: 10,
            fromX: 0,
            toX: 400,
            ballwidth: 30,
            alphamax: 0.2,
            areaHeight: 1,
            colr: '#93e9f3',
            fill: true
          }
        ];
        this.particleArray = [];
        this.lights = [
          {
            ellipseWidth: 400,
            ellipseHeight: 100,
            alpha: .6,
            offsetX: 0,
            offsetY: 0,
            color: '0x6ac6e8'
          }, {
            ellipseWidth: 350,
            ellipseHeight: 250,
            alpha: .3,
            offsetX: -50,
            offsetY: 0,
            color: '0x54d5e8'
          }, {
            ellipseWidth: 100,
            ellipseHeight: 80,
            alpha: .2,
            offsetX: 50,
            offsetY: -50,
            color: '0x2ae8d8'
          }
        ];
        this.blurFilter = new PIXI.filters.BlurFilter();
        this.drawBgLight();
        this.renderer();
      }

      ParticleEngine.prototype.drawBgLight = function() {
        var blurFilter, bounds, container, frame, height, i, j, light, light_s, rect, ref, results, texture, width, x, y;
        blurFilter = null;
        bounds = null;
        results = [];
        for (i = j = 0, ref = this.lights.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          container = new PIXI.Container();
          light = new PIXI.Graphics();
          light.lineStyle(0);
          light.beginFill(this.lights[i].color, this.lights[i].alpha);
          x = this.width / 2;
          y = this.height / 2;
          console.log(x);
          width = this.lights[i].ellipseWidth / 2;
          height = this.lights[i].ellipseHeight / 2;
          console.log("widht" + width + " + height" + height);
          light.drawEllipse(x, y, width, height);
          light.endFill();
          console.log(light);
          light.filters = [this.blurFilter];
          this.blurFilter.blur = 20;
          light.compositeOperation = "screen";
          texture = light.generateCanvasTexture(1, 1);
          rect = new PIXI.Rectangle(0, 0, width * 2, height * 2);
          frame = new PIXI.Texture(texture.baseTexture, rect);
          light_s = new PIXI.Sprite(frame);
          container.addChild(light_s);
          container.blendMode = PIXI.BLEND_MODES.MULTIPLY;
          this.stage.addChild(light);
          results.push(this.lights[i].ele = container);
        }
        return results;
      };

      ParticleEngine.prototype.renderer = function() {
        document.body.appendChild(this.render.view);
        this.render.render(this.stage);
        return requestAnimationFrame(this.renderer);
      };

      return ParticleEngine;

    })();
    return new_c = new ParticleEngine();
  });

}).call(this);
