import './app.scss'
import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const O = {
    scene: null,
    render: null,
    camera: null,
    control: null,
    obj: {},
    addItem: function (k, v) {
        const item = (this.obj[k] = v)
        this.scene.add(item)
    },
    getItem: function (k) {
        return this.obj[k]
    }
}

const getColor = (r, g, b) => {
    const get = n =>
        Number(n)
            .toString(16)
            .padStart(2, '0')
    return parseInt(`0x${get(r)}${get(g)}${get(b)}`)
}

const addCanvas = () => {
    const w = window.innerWidth
    const h = window.innerHeight
    const fov = 75
    const aspect = w / h
    const near = 0.1
    const far = 1000
    O.scene = new T.Scene()
    O.camera = new T.PerspectiveCamera(fov, aspect, near, far)
    O.render = new T.WebGLRenderer({ antialias: true })
    O.control = new OrbitControls(O.camera, O.render.domElement)
    O.render.setSize(w, h)
    document.body.appendChild(O.render.domElement)
    const light = new T.DirectionalLight(getColor(255, 255, 255), 1)
    light.position.set(-1, 2, 4)
    O.scene.add(light)
    O.camera.position.z = 5
}
const init = () => {
    addCanvas()

    const geometry = new T.BoxGeometry(2, 2, 2)
    const material = new T.MeshPhongMaterial({ color: 0x0000ff, wireframe: false })
    const cube = new T.Mesh(geometry, material)
    // O.scene.add(cube)
    O.addItem('cube', cube)

    console.log(O)
    anime()
}

const anime = () => {
    const { render, scene, camera, control } = O
    render.render(scene, camera)
    requestAnimationFrame(anime)
    control.update()
}

init()
