import './app.scss'
import * as T from 'three'
// import * as dat from 'dat.gui'
import fontJson from './assets/Cascadia Code_Regular.json'

const O = {
    scene: undefined,
    render: undefined,
    camera: undefined,
    font: undefined,
    text: undefined
}
const fontLoader = new T.FontLoader()
const getColor = (r, g, b) => {
    const get = (n) => Number(n).toString(16).padStart(2, '0')
    return parseInt(`0x${get(r)}${get(g)}${get(b)}`)
}

const init = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    const fov = 75
    const aspect = width / height
    const near = 0.1
    const far = 1000
    O.scene = new T.Scene()
    O.camera = new T.PerspectiveCamera(fov, aspect, near, far)
    O.render = new T.WebGLRenderer({ antialias: true })

    O.render.setSize(width, height)

    document.body.appendChild(O.render.domElement)
    const material = new T.MeshPhongMaterial({ color: 0x0000ff, wireframe: false })

    const geometry = new T.TextGeometry('01 42 03', {
        font: O.font,
        size: 80,
        height: 5,
        curveSegments: 50,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 5,
        bevelOffset: 0,
        bevelSegments: 5
    })
    const t = new T.BufferGeometry().fromGeometry(geometry)
    const text = new T.Mesh(t, material)
    text.position.z = -500
    text.position.y = 100
    text.position.x = -250
    O.text = geometry
    O.scene.add(text)
    console.log(text)
    const color = getColor(255, 255, 255)
    const intensity = 1
    const light = new T.DirectionalLight(color, intensity)
    light.position.set(0, 30, 100)
    O.scene.add(light)
    O.camera.position.z = 105
}
fontLoader.load(fontJson, (font) => {
    O.font = font
    init()
    animate()
})

const animate = () => {
    requestAnimationFrame(animate)
    O.render.render(O.scene, O.camera)
}
