import './app.scss'
import * as T from 'three'
import MyThree from '../../misc'
const mt = new MyThree()

const vertexShader = `
// create a shared variable for the
// VS and FS containing the normal
varying vec3 vNormal;

void main() {

  // set the vNormal value with
  // the attribute value passed
  // in by Three.js
  vNormal = normal;

  gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(position, 1.0);
}
`
const fragmentShader = `
    uniform float u_time;
    void main() {
        gl_FragColor = vec4(abs(sin(u_time)),0.0,0.0,1.0);
    }
`
const uniforms = {
    u_time: {
        type: 'f',
        value: 0
    }
}
const shaderMaterial = () => {
    return new T.ShaderMaterial({
        uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    })
}

const sphere = () => {
    const geometry = new T.SphereGeometry(3, 10, 10)
    const material = shaderMaterial()
    var mesh = new T.Mesh(geometry, material)
    mesh._rotate = {
        x: 0,
        y: 0
    }
    mesh._updateRotate = () => {
        const t = mt.time.getElapsedTime()
        mesh.rotation.x += Math.cos(t) / 100
        mesh.rotation.y += Math.sin(t) / 100
    }
    return mesh
}

const setScene = () => {
    const ball = sphere()
    ball.position.set(0, 3, 0)
    mt.addItem('ball', ball)
    const ambient = new T.AmbientLight(0xffffff, 0.6) // soft white light
    mt.addItem('ambient', ambient)
    mt.camera.position.set(0, 7, 15)
    const grand = new T.Mesh(new T.PlaneBufferGeometry(3000, 3000), new T.MeshPhongMaterial({ color: 0xcccccc }))
    grand.position.y = 0
    grand.rotation.x = -Math.PI / 2
    grand.receiveShadow = true
    mt.addItem('grand', grand)

    mt.scene.background = new T.Color(0xcccccc)
    mt.scene.fog = new T.Fog(mt.scene.background, 1, 50)
}

const update = () => {
    const ball = mt.getItem('ball')
    if (ball) {
        ball._updateRotate()
    }
    uniforms.u_time.value = mt.time.getElapsedTime()
}

mt.init(
    {
        w: window.innerWidth,
        h: window.innerHeight,
        fov: 75,
        near: 0.1,
        far: 1000,
        orb: true,
        anime: update
    },
    () => {
        setScene()
    }
)
