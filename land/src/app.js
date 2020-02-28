import './app.scss'
import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
const land = require('./assets/land.gltf')
// const vertexShader = `varying vec3 vWorldPosition;

//             void main() {

//                 vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
//                 vWorldPosition = worldPosition.xyz;

//                 gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

//             }`
// const fragmentShader = `uniform vec3 topColor;
//             uniform vec3 bottomColor;
//             uniform float offset;
//             uniform float exponent;

//             varying vec3 vWorldPosition;

//             void main() {

//                 float h = normalize( vWorldPosition + offset ).y;
//                 gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 1.0 );

//             }`

const O = {
    scene: null,
    render: null,
    camera: null,
    control: null,
    laoder: null,
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
    const far = 10000
    O.scene = new T.Scene()
    O.camera = new T.PerspectiveCamera(fov, aspect, near, far)
    O.render = new T.WebGLRenderer({ antialias: true })
    O.control = new OrbitControls(O.camera, O.render.domElement)
    O.loader = new GLTFLoader()
    O.render.setSize(w, h)
    // O.render.shadowMap.enabled = true
    // O.render.gammaOutput = true
    document.body.appendChild(O.render.domElement)

    const light = new T.DirectionalLight(0xffffff, 2)
    light.position.multiplyScalar(30)
    light.position.set(-100, 150, 150)

    // light.castShadow = true
    // light.shadow.mapSize.width = 2048
    // light.shadow.mapSize.height = 2048
    // var d = 50
    // light.shadow.camera.left = -d
    // light.shadow.camera.right = d
    // light.shadow.camera.top = d
    // light.shadow.camera.bottom = -d

    // light.shadow.camera.far = 3500
    // light.shadow.bias = -0.0001

    // console.log(light)
    // const lightHelper = new T.DirectionalLightHelper(light, 30)
    O.scene.add(light)

    // const hemispfere = new T.HemisphereLight(0xffffff, 0x351e0c, 1)
    // const hermiHelper = new T.HemisphereLightHelper(hemispfere, 10)
    // hemispfere.position.set(10, 150, 0)
    // O.scene.add(hemispfere, hermiHelper)

    O.scene.background = new T.Color(getColor(200, 200, 200))
    O.scene.fog = new T.Fog(O.scene.background, 1, 1800)

    O.camera.position.z = 350
    O.camera.position.y = 150
    O.camera.lookAt(0, 0, 0)

    // var groundGeo = new T.PlaneBufferGeometry(3000, 3000)
    // var groundMat = new T.MeshLambertMaterial({ color: 0xdddddd })
    // var ground = new T.Mesh(groundGeo, groundMat)
    // ground.position.y = -100
    // ground.rotation.x = -Math.PI / 2
    // // ground.receiveShadow = true
    // O.scene.add(ground)

    // var uniforms = {
    //     topColor: { value: new T.Color(0x0077ff) },
    //     bottomColor: { value: new T.Color(0xffffff) },
    //     offset: { value: 33 },
    //     exponent: { value: 0.6 }
    // }
    // uniforms['topColor'].value.copy(hemispfere.color)

    // O.scene.fog.color.copy(uniforms['bottomColor'].value)

    // var skyGeo = new T.SphereBufferGeometry(4000, 32, 15)
    // var skyMat = new T.ShaderMaterial({
    //     uniforms: uniforms,
    //     vertexShader: vertexShader,
    //     fragmentShader: fragmentShader,
    //     side: T.BackSide
    // })

    // var sky = new T.Mesh(skyGeo, skyMat)
    // O.scene.add(sky)
}
const init = () => {
    addCanvas()
    const { loader, scene } = O
    loader.load(land, function (obj) {
        // obj.scene.children.forEach(i => {
        //     i.castShadow = true
        //     i.receiveShadow = true
        // })
        obj.scene.position.set(0, 10, 0)
        scene.add(obj.scene)
    })
    anime()
}

const anime = () => {
    const { render, scene, camera, control } = O
    render.render(scene, camera)
    requestAnimationFrame(anime)
    control.update()
}

init()
