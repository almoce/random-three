import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

class MyThree {
    constructor () {
        this.scene = null
        this.render = null
        this.camera = null
        this.control = null
        this.loader = null
        this.time = new T.Clock()
        this.itens = {}
    }
    addItem (k, v) {
        this.itens[k] = v
        this.scene.add(this.itens[k])
    }
    getItem (k) {
        return this.itens[k]
    }
    init ({ w, h, fov, near, far, orb = false, dom = document.body, anime = () => {} }, cb = () => {}) {
        this.scene = new T.Scene()
        this.camera = new T.PerspectiveCamera(fov, w / h, near, far)
        this.render = new T.WebGLRenderer({ antialias: true })
        this.control = orb ? new OrbitControls(this.camera, this.render.domElement) : false
        this.loader = new GLTFLoader()
        this.render.setSize(w, h)
        this.time.start()
        dom.appendChild(this.render.domElement)
        if (anime) {
            this.anime(anime)
        }
        return cb()
    }
    anime (cb) {
        this.render.render(this.scene, this.camera)
        requestAnimationFrame(() => this.anime(cb))
        if (this.control) {
            this.control.update()
        }
        cb()
    }
}

export default MyThree
