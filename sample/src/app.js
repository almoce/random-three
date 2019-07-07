import './app.scss'
import * as THREE from 'three'

let scene, render, camera, cube

const getColor = (r, g, b) => {
    const get = (n) => Number(n).toString(16).padStart(2, '0')
    return parseInt(`0x${get(r)}${get(g)}${get(b)}`)
}

const init = () => {
    const fov = 75
    const aspect = window.innerWidth / window.innerHeight
    const near = 0.1
    const far = 1000
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    render = new THREE.WebGLRenderer({ antialias: true })

    render.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(render.domElement)

    const boxWidth = 2
    const boxHeight = 2
    const boxDepth = 2
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)
    // const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: false })
    const material = new THREE.MeshPhongMaterial({ color: 0x0000ff, wireframe: false })

    cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    camera.position.z = 5

    const color = getColor(255, 255, 255)
    const intensity = 1
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.set(-1, 2, 4)
    scene.add(light)
}
let rotationX = 0
let rotationY = 0

const random = (n = 10) => Math.floor(Math.random() * n)

const updateRotationSpeed = () => {
    rotationX = random() / 500
    rotationY = random() / 500
}

let hueC = 0
const changeCubeColor = () => {
    hueC++
    const hsl = `hsl(${hueC}, 100%, 70%)`
    const color = new THREE.Color(hsl)
    cube.material.color = color
}
const animate = () => {
    requestAnimationFrame(animate)
    render.render(scene, camera)
    cube.rotation.x += rotationX
    cube.rotation.y += rotationY
    changeCubeColor()
}

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener('resize', onWindowResize, false)
init()
animate()
updateRotationSpeed()

setInterval(() => {
    updateRotationSpeed()
}, 1000)
