$(function() {


    /**
     *  Particle Storm - pushing 1500 particles with PixiJS
     *  by Erik Terwan
     */

    /**
     *  Particle Storm - pushing 1500 particles with PixiJS
     *  by Erik Terwan
     */

    (function(PIXI) {
        "use strict";

        var app, particles, numberOfParticles = 1500;

        // Aliases
        var Application = PIXI.Application,
            Container = PIXI.Container,
            Graphics = PIXI.Graphics,
            ParticleContainer = new PIXI.particles.ParticleContainer();
        console.log(ParticleContainer);

        var lifetime = 0;



        function init() {
            //Create the renderer
            app = new Application(window.innerWidth, window.innerHeight, {
                antialias: true
            });

            //Add the canvas to the HTML document
            document.body.appendChild(app.view);

            // Fullscreen
            app.view.style.position = "absolute";
            app.view.style.display = "block";
            app.view.autoResize = true;

            populate();
        }

        function populate() {
            particles = [];

            for (var i = 0; i < numberOfParticles; i++) {
                var particle = new Particle();
                particle.init(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight,
                    Math.random() * 2,
                    (Math.random() * 3) - 1.5,
                    (Math.random() * 3) - 1.5
                );

                particles.push(particle);
                ParticleContainer.addChild(particle);


            }
            app.stage.addChild(ParticleContainer);
            particles.forEach(function(particle) {
                particle.draw();
            });

            // Animate the rotation
            app.ticker.add(update);
        }

        function update(delta) {
            var sin = Math.sin(lifetime / 50);
            var cos = Math.cos(lifetime / 50);
            var xAdd = sin * (2 * delta);
            var yAdd = cos * (2 * delta);

            particles.forEach(function(particle) {
                particle.update(delta, xAdd, yAdd);
            });

            lifetime++;

        }


        var Particle = function() {
            this.radius = 0;
            this.xSpeed = 0;
            this.ySpeed = 0;
            this.circle;

            this.init = (function(_this) {
                return function(x, y, r, xSpeed, ySpeed) {
                    _this.circle = new Graphics();
                    _this.circle.x = x;
                    _this.circle.y = y;

                    _this.radius = r;
                    _this.xSpeed = xSpeed;
                    _this.ySpeed = ySpeed;
                }
            })(this);

            this.update = (function(_this) {
                return function(delta, xAdd, yAdd) {
                    _this.circle.x += (_this.xSpeed * delta);
                    _this.circle.y += (_this.ySpeed * delta);

                    _this.circle.x += xAdd != undefined ? xAdd : 0;
                    _this.circle.y += yAdd != undefined ? yAdd : 0;

                    if (_this.circle.x < _this.radius || _this.circle.x > (window.innerWidth - _this.radius)) {
                        _this.xSpeed = -_this.xSpeed;
                    }

                    if (_this.circle.y < _this.radius || _this.circle.y > (window.innerHeight - _this.radius)) {
                        _this.ySpeed = -_this.ySpeed;
                    }
                }
            })(this);

            this.draw = (function(_this) {
                return function() {
                    _this.circle.beginFill(0x2299FF);
                    _this.circle.drawCircle(0, 0, _this.radius);
                    _this.circle.endFill();
                }
            })(this);
        };

        init();
    })(PIXI);

})
