import * as THREE from '/build/three.module.js'
import { OrbitControls } from '/jsm/controls/OrbitControls'

import { Unit } from './Unit.js'


// initialize core components
const Scene = new THREE.Scene()

const Camera = new THREE.PerspectiveCamera(
    55, // degrees
    window.innerWidth / window.innerHeight,
    Unit.FromAstroUnits(45),
    Unit.FromAstroUnits(30000))
Camera.position.set(
    Unit.FromAstroUnits(1200),
    Unit.FromAstroUnits(-250),
    Unit.FromAstroUnits(2000))

const Renderer = new THREE.WebGLRenderer()
Renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(Renderer.domElement)

const loader = new THREE.TextureLoader()

const Controls = new OrbitControls(Camera, Renderer.domElement)

// initialize and start animate loop
const animationTasks : { () : void } [] = []
function animate() {
    requestAnimationFrame(animate)
    animationTasks.forEach(task => task())
    Controls.update()
    Renderer.render(Scene, Camera)
} animate()

// handle window resize event
window.addEventListener(
    'resize',
    () => {
        Camera.aspect = window.innerWidth / window.innerHeight
        Camera.updateProjectionMatrix()
        Renderer.setSize(window.innerWidth, window.innerHeight)
        Renderer.render(Scene, Camera) },
    false)

function initSkybox() {
    const skyboxGeometry = new THREE.BoxGeometry(
        Unit.FromAstroUnits(10000),
        Unit.FromAstroUnits(10000),
        Unit.FromAstroUnits(10000))

    const skyboxMaterial = new Array(6).fill(
        new THREE.MeshBasicMaterial({
            map: loader.load("/assets/space.jpg"),
            side: THREE.BackSide }))

    const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial)

    Scene.add(skybox)

    animationTasks.push(() => {
        // radians per frame
        skybox.rotation.x += 0.001
        skybox.rotation.y += 0.001 })
} initSkybox()

function initSphere() {
    const sphereGeo = new THREE.SphereGeometry(
        Unit.FromAstroUnits(300), 50, 50)

    const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        wireframe: false })

    const sphere = new THREE.Mesh(sphereGeo, sphereMaterial)
    Scene.add(sphere)

} initSphere()

function initBlackHole() {
    const accretionDiskMaterial = new THREE.MeshBasicMaterial({
          map: loader.load("/assets/accretionDisk_texture.png")})

    const geo = new THREE.CircleGeometry( Unit.FromAstroUnits(800), 32)
    const circle = new THREE.Mesh( geo, accretionDiskMaterial )
    circle.material.side = THREE.DoubleSide
    Scene.add(circle)

    const geo2 = new THREE.CircleGeometry(Unit.FromAstroUnits(800), 32)
    const circle2 = new THREE.Mesh( geo2, accretionDiskMaterial )
    circle2.material.side = THREE.DoubleSide
    circle2.rotation.x = Math.PI/2
    Scene.add(circle2)

    animationTasks.push(() => {
        circle.rotation.z += 0.008
        circle2.rotation.z += 0.008
    })
} initBlackHole()
