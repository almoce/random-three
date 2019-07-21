import './app.scss'
import * as T from 'three'
import * as dat from 'dat.gui'

const gui = new dat.GUI()
const config = new T.Vector3(0, 0, 0)

gui.add(config, 'x', -100, 100)
gui.add(config, 'y', -100, 100)
gui.add(config, 'z', -100, 100)
const getW = () => window.innerWidth
const getH = () => window.innerHeight
const w = getW()
const h = getH()
const render = new T.WebGLRenderer()
render.setSize(w, h)
document.body.appendChild(render.domElement)

const camera = new T.PerspectiveCamera(45, w / h, 1, 500)
camera.position.set(0, 0, 100)
camera.lookAt(0, 0, 0)
const scene = new T.Scene()

const material = new T.LineBasicMaterial({ color: 0x000000 })

const geometry = new T.Geometry()
geometry.vertices.push(new T.Vector3(0, 0, 0))
geometry.vertices.push(config)

const line = new T.Line(geometry, material)
scene.add(line)

let hue = 0
const changeCubeColor = () => {
    hue++
    const hsl = `hsl(${hue}, 100%, 50%)`
    const color = new T.Color(hsl)
    line.material.color = color
}

const animate = () => {
    requestAnimationFrame(animate)
    line.geometry.verticesNeedUpdate = true
    changeCubeColor()
    render.render(scene, camera)
}
animate()
