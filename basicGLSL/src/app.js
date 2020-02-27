const w = window.innerWidth
const h = window.innerHeight
const canvas = document.createElement('canvas')
canvas.width = w
canvas.height = h
document.body.appendChild(canvas)

const ctx = canvas.getContext('webgl')
ctx.viewport(0, 0, ctx.drawingBufferWidth / 5, ctx.drawingBufferHeight / 5)

ctx.clearColor(1.0, 0.0, 0.0, 1.0)
ctx.clear(ctx.COLOR_BUFFER_BIT)
