import * as THREE from '/build/three.module.js'
import { OrbitControls } from '/jsm/controls/OrbitControls'

// initialize core components
var scene = new THREE.Scene()

var aspect = window.innerWidth / window.innerHeight
var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
camera.position.set(0, 0, 0)

var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

var loader = new THREE.TextureLoader();

var controls = new OrbitControls(camera, renderer.domElement)

// initialize and start animate loop
var animationTasks : { (): void } [] = []
var animate = () => {
    requestAnimationFrame(animate)
    animationTasks.forEach(task => task());
    controls.update()
    renderer.render(scene, camera)
}
animate()

// handle window resize event
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
}
window.addEventListener('resize', onWindowResize, false)

///////////////////////////////////////////////////////////////////////////////

var materials = [
    new THREE.MeshBasicMaterial( { map: loader.load("./assets/test_front.jpg") } ),
    new THREE.MeshBasicMaterial( { map: loader.load("./assets/test_bottom.jpg") } ),
    new THREE.MeshBasicMaterial( { map: loader.load("./assets/test_down.jpg") } ),
    new THREE.MeshBasicMaterial( { map: loader.load("./assets/test_up.jpg") } ),
    new THREE.MeshBasicMaterial( { map: loader.load("./assets/test_left.jpg") } ),
    new THREE.MeshBasicMaterial( { map: loader.load("./assets/test_right.jpg") } )
]

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
// var material = new THREE.MeshBasicMaterial({ map: materials, side: THREE.BackSide });

const sphereGeo = new THREE.SphereGeometry(2.0, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2)
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: false })

var sphere = new THREE.Mesh( sphereGeo, sphereMaterial )
scene.add( sphere )

animationTasks.push(() =>
{
  sphere.rotation.x += 0.01
  sphere.rotation.y += 0.01
})

// working sphere - NO TOUCHY
// const geometry = new THREE.SphereGeometry(2.0, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2)
// const material = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: false })

// const cube: THREE.Mesh = new THREE.Mesh(geometry, material)
// scene.add(cube)

camera.position.z = 10
