$(->
  class ParticleEngine

    constructor:()->

      @width = 800
      @height = 600

      @stage = new PIXI.Container()
      @render = new PIXI.autoDetectRenderer(@width, @height)
      @compositeStyle = "lighter"
      @particleSettings = [
        {
          id : "small"
          num: 300
          fromX: 0
          toX : 400
          ballwidth: 3
          alphamax: 0.4
          areaHeight: .5
          color: '#0cdbf3'
          fill: false
        },
        {
          id: "medium"
          num: 100
          fromX: 0
          toX: 400
          ballwidth: 8
          alphamax: 0.3
          areaHeight: 1
          color: '#6fd2f3'
          fill: true
        },
        {
          id: "large"
          num: 10
          fromX: 0
          toX: 400
          ballwidth: 30
          alphamax: 0.2
          areaHeight: 1
          colr: '#93e9f3'
          fill: true
        }
      ]
      @.particleArray = []
      @lights = [
        {
          ellipseWidth: 400
          ellipseHeight: 100
          alpha: .6
          offsetX: 0
          offsetY: 0
          color: '0x6ac6e8'
        }
        {
          ellipseWidth: 350
          ellipseHeight: 250
          alpha: .3
          offsetX: -50
          offsetY: 0
          color: '0x54d5e8'
        }
        {
          ellipseWidth: 100
          ellipseHeight: 80
          alpha: .2
          offsetX: 50
          offsetY: -50
          color: '0x2ae8d8'
        }
    ]
    # @stage.compositeOperation = @compositeStyle
      @blurFilter = new PIXI.filters.BlurFilter()
      @drawBgLight()
      @renderer()
    drawBgLight: ()=>

      blurFilter = null
      bounds = null
      for i in [0...@lights.length]
        container = new PIXI.Container()
        light = new PIXI.Graphics()
        light.lineStyle(0)
        light.beginFill(@lights[i].color, @lights[i].alpha)
        x = @width / 2
        y = @height / 2
        console.log x
        width = @lights[i].ellipseWidth/2
        height = @lights[i].ellipseHeight/2
        console.log "widht#{width} + height#{height}"
        light.drawEllipse(x, y, width, height)
        light.endFill()
        console.log light
        light.filters = [@blurFilter]
        @blurFilter.blur = 20
        light.compositeOperation = "screen"
        texture = light.generateCanvasTexture(1, 1)
        rect = new PIXI.Rectangle(0, 0, width*2, height*2)
        frame = new PIXI.Texture(texture.baseTexture, rect)
        light_s = new PIXI.Sprite(frame)
        container.addChild(light_s)
        container.blendMode = PIXI.BLEND_MODES.MULTIPLY
        @stage.addChild(light)
        # @stage.addChild(light)
        @lights[i].ele = container

    renderer: ()=>
      document.body.appendChild(@render.view)
      @render.render(@stage)
      requestAnimationFrame(@renderer)
  new_c = new ParticleEngine()
)
