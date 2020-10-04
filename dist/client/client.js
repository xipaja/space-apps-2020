import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls';
import { Unit } from './Unit.js';
// initialize core components
const Scene = new THREE.Scene();
const Camera = new THREE.PerspectiveCamera(55, // degrees
window.innerWidth / window.innerHeight, Unit.FromAstroUnits(45), Unit.FromAstroUnits(30000));
Camera.position.set(Unit.FromAstroUnits(1200), Unit.FromAstroUnits(-250), Unit.FromAstroUnits(2000));
const Renderer = new THREE.WebGLRenderer();
Renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(Renderer.domElement);
const loader = new THREE.TextureLoader();
const Controls = new OrbitControls(Camera, Renderer.domElement);
// initialize and start animate loop
const animationTasks = [];
function animate() {
    requestAnimationFrame(animate);
    animationTasks.forEach(task => task());
    Controls.update();
    Renderer.render(Scene, Camera);
}
animate();
// handle window resize event
window.addEventListener('resize', () => {
    Camera.aspect = window.innerWidth / window.innerHeight;
    Camera.updateProjectionMatrix();
    Renderer.setSize(window.innerWidth, window.innerHeight);
    Renderer.render(Scene, Camera);
}, false);
function initSkybox() {
    const skyboxGeometry = new THREE.BoxGeometry(Unit.FromAstroUnits(10000), Unit.FromAstroUnits(10000), Unit.FromAstroUnits(10000));
    const skyboxMaterial = new Array(6).fill(new THREE.MeshBasicMaterial({
        map: loader.load("/assets/space.jpg"),
        side: THREE.BackSide
    }));
    const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
    Scene.add(skybox);
    animationTasks.push(() => {
        // radians per frame
        skybox.rotation.x += 0.001;
        skybox.rotation.y += 0.001;
    });
}
initSkybox();
function initSphere() {
    const sphereGeo = new THREE.SphereGeometry(Unit.FromAstroUnits(200), 50, 50);
    const sphereGeo2 = new THREE.SphereGeometry(Unit.FromAstroUnits(200), 50, 50);
    const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        wireframe: false
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMaterial);
    sphere.position.x = 300;
    const sphere2 = new THREE.Mesh(sphereGeo2, sphereMaterial);
    sphere.position.x = -300;
    Scene.add(sphere);
    Scene.add(sphere2);
    const quaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), 0.03);
    animationTasks.push(() => {
        // radians per frame
        sphere.position.applyQuaternion(quaternion);
        sphere2.position.applyQuaternion(quaternion);
        // sphere.rotation.x += 0.01
        // sphere.rotation.y += 0.01
        // sphere2.rotation.x += 0.01
        // sphere2.rotation.y += 0.01
        // sphere.rotation.z +=0.01
        // sphere2.rotation.z += 0.01
    });
}
initSphere();
function initBlackHole() {
    const accretionDiskGeo = new THREE.TorusGeometry(Unit.FromAstroUnits(500), Unit.FromAstroUnits(200), 16, 100);
    const testGeo = new THREE.PlaneBufferGeometry(20, 20, 100, 100);
    const accretionDiskMaterial = new THREE.MeshBasicMaterial({
        map: loader.load("/assets/blackhole.jpg")
    });
    const accretionDisk = new THREE.Mesh(accretionDiskGeo, accretionDiskMaterial);
    accretionDisk.position.x = 100;
    Scene.add(accretionDisk);
    animationTasks.push(() => {
        // radians per frame
        accretionDisk.rotation.x += 0.01;
        accretionDisk.rotation.y += 0.01;
    });
}
initBlackHole();
