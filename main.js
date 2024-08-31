import * as THREE from 'three';
import './style.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';

//Scene 
const scene = new THREE.Scene();

//Create our sphere
//Create a shape first
const geometry = new THREE.SphereGeometry(3, 64, 64);

//Style that shape
const material = new THREE.MeshStandardMaterial({
  color: '#00ff83',
  roughness: 0.5
});

//Combination of geometry and materials
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

//Setup Lights
const light = new THREE.PointLight(0xffffff, 1, 100, 0.1);
light.position.set(0, 10, 10);
light.intensity = 1.25;
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);

//Rendered where to render and size
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

//Contoller
const control = new OrbitControls(camera, canvas);
control.enableDamping = true;
control.enablePan = false;
control.enableZoom = false;
control.autoRotate = true;
control.autoRotateSpeed = 5;

//Resize event
window.addEventListener('resize', () => {
  //Update the sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //Update camera
  camera.updateProjectionMatrix()
  camera.aspect = sizes.width / sizes.height;
  renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
  control.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
}
loop();

//TimeLine magic
const tl = gsap.timeline({ default: { duration: 1 } });
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
tl.fromTo('nav', { y: '-100%' }, { y: '0%' });
tl.fromTo('.title', { opacity: 0 }, { opacity: 1 });

//Mouse animation color
let mouseDown = false;
let rgb = [];
const titleElement = document.getElementById("title");
window.addEventListener('mousedown', () => (mouseDown = true));
window.addEventListener('mouseup', () => (mouseDown = false));

window.addEventListener('mousemove', (e) => {

  if (mouseDown) {
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      150,
    ]

    //Animate
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b
    });

    titleElement.style.color = `rgb(${rgb.join(",")})`;
    titleElement.style.textShadow = `0 0 10px rgb(${rgb.join(",")}), 0 0 20px rgb(${rgb.join(",")}), 0 0 30px rgb(${rgb.join(",")}), 0 0 40px rgb(${rgb.join(",")}), 0 0 50px rgb(${rgb.join(",")})`;
  }

});