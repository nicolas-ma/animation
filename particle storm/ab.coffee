$(->
  width = window.innerWidth
  height = window.innerHeight
  x = width / 2
  y = height / 2
  stage = new PIXI.Container()
  render = new PIXI.autoDetectRenderer(width, height)
  colors = [0xb8d000, 0x2175d9, 0xed1b24, 0x35b4d6, 0xff9900, 0xe30074]
  document.body.appendChild(render.view)

  renderer =() ->
    render.render(stage)
    requestAnimationFrame(renderer)




  particles = new PIXI.particles.ParticleContainer(1000, {
    position: true,
    rotation: true,
    alpha: true,
    scale: true,
    uvs: true
  });

  stage.addChild(particles)

  createTexture = (colors, size) ->
    list = []
    cx = size
    cy = size
    graphics = new PIXI.Graphics()
    graphics.lineStyle(0)
    for color, i in colors
      rx = size * 2 * i + size
      ry = size
      graphics.beginFill(color, 0.5)
      graphics.drawCircle(rx, ry, size)


    graphics.endFill();
    texture = graphics.generateCanvasTexture(1, 1)

    i = 0
    while i < texture.width
      rect = new (PIXI.Rectangle)(i, 0, size * 2, size * 2)
      frame = new (PIXI.Texture)(texture.baseTexture, rect)
      list.push frame
      i += size * 2

    return list

  createSprites = (total, arr_ture) ->
    sprites = []
    i = 0
    while i < total
      sprite = new (PIXI.Sprite)(_.sample(arr_ture))
      sprite.x = x
      sprite.y = y
      sprites.push sprite
      particles.addChild sprite
      # stage.addChild(sprite);
      i++
    sprites

  frames = createTexture(colors, 12)
  sprites = createSprites(400, frames)

  animation = ()->
    for sprite, i in sprites
      TweenMax.set sprite, x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight
      tl = new TimelineMax(repeat: -1, yoyo:true)
      delay = 5*Math.random()
      suiji = 100 * Math.random()
      radius = sprite.width / 2
      create = (x, y, radius)->
        list = []
        degree = 0
        i = 100
        while i > 0
          y = y + Math.sin(degree*180/Math.PI)*radius
          x = x + Math.cos(degree*180/Math.PI)*radius
          list.push({x: x, y: y})
          degree+=3.6
          i--
        list
      values = create(sprite.x, sprite.y, 80)
      attrs =
        bezier:
          values:values
          type:"cubic"
          autoRotate: true
        ease: Power1.easeInOut

      tl.to sprite, 6, attrs , 0
      # function animation() {
      #     console.log("animation");
      #     for (var i = 0; i < sprites.length; i++) {
      #         var new_s = sprites[i];
      #         var new_x = x + Math.sin(Math.random() * (2 * Math.PI)) * 500;
      #         var new_y = y + Math.cos(Math.random() * (2 * Math.PI)) * 500;
      #
      #         tl.to(new_s, 0.1, {
      #             alpha: 1
      #         }, "start").to(new_s, 1, {
      #             x: new_x,
      #             y: new_y
      #         }, Math.random() * 2)
      #     }
      # }

  renderer()
  animation()
)
