import './app.scss'
import * as T from 'three'
import MyThree from '../../misc'
const mt = new MyThree()

const cube = () => {
    const geo = new T.BoxGeometry(2, 2, 2)
    const mat = new T.MeshStandardMaterial({ color: 0x0000ff, wireframe: false })
    const box = new T.Mesh(geo, mat)
    box._rotate = {
        x: 0,
        y: 0
    }
    box._updateRotate = () => {
        const t = mt.time.getElapsedTime()
        box.rotation.x += Math.cos(t) / 100
        box.rotation.y += Math.sin(t) / 100
    }
    return box
}

const setScene = () => {
    const box = cube()
    console.log(mt)
    box.castShadow = true
    box.receiveShadow = true
    box.position.set(0, 2, 0)
    mt.addItem('box', box)
    const light = new T.PointLight(0xffffff, 1, 10)
    const lightHelper = new T.PointLightHelper(light, 1)
    light.position.set(0, 8, 0)
    light.castShadow = true
    light.shadow.mapSize.width = 512 // default
    light.shadow.mapSize.height = 512 // default
    light.shadow.camera.near = 0.5 // default
    light.shadow.camera.far = 500 // default

    mt.render.shadowMap.enabled = true
    mt.scene.add(lightHelper)
    mt.addItem('light', light)
    const ambient = new T.AmbientLight(0xffffff, 1) // soft white light
    mt.addItem('ambient', ambient)
    mt.camera.position.set(0, 5, 15)
    const grand = new T.Mesh(new T.PlaneBufferGeometry(3000, 3000), new T.MeshStandardMaterial({ color: 0xcccccc }))
    grand.position.y = 0
    grand.rotation.x = -Math.PI / 2
    grand.receiveShadow = true
    mt.addItem('grand', grand)

    mt.scene.background = new T.Color(0xcccccc)
    mt.scene.fog = new T.Fog(mt.scene.background, 1, 50)
}

const update = () => {
    const box = mt.getItem('box')
    if (box) {
        box._updateRotate()
    }
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
