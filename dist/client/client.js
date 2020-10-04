import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls';
// initialize core components
var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(55, aspect, 45, 30000);
// camera.position.set(0, 0, 0)
camera.position.set(1200, -250, 2000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var loader = new THREE.TextureLoader();
var controls = new OrbitControls(camera, renderer.domElement);
// initialize and start animate loop
var animationTasks = [];
var animate = () => {
    requestAnimationFrame(animate);
    animationTasks.forEach(task => task());
    controls.update();
    renderer.render(scene, camera);
};
animate();
// handle window resize event
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
}
window.addEventListener('resize', onWindowResize, false);
///////////////////////////////////////////////////////////////////////////////
const skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
var x = new THREE.MeshBasicMaterial({ map: loader.load("/assets/space.jpg") });
x.side = THREE.BackSide;
var materials = [x, x, x, x, x, x];
const skybox = new THREE.Mesh(skyboxGeo, materials);
scene.add(skybox);
const sphereGeo = new THREE.SphereGeometry(200, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: false });
var sphere = new THREE.Mesh(sphereGeo, sphereMaterial);
scene.add(sphere);
animationTasks.push(() => {
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
});
animationTasks.push(() => {
    skybox.rotation.x += 0.001;
    skybox.rotation.y += 0.001;
});
// working sphere - NO TOUCHY
// const geometry = new THREE.SphereGeometry(2.0, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2)
// const material = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: false })
// const cube: THREE.Mesh = new THREE.Mesh(geometry, material)
// scene.add(cube)
// camera.position.z = 10
