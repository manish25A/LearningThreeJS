// animation

import './style.css';
import * as THREE from 'three';
import { Mesh, PointLight, TextureLoader } from 'three';
import gsap from 'gsap'; //to create animations like timelines twins and all
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

//debug gui
//debug
const gui = new dat.GUI();

const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load('displacementMap.png');

// creating scene
const scene = new THREE.Scene();

// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;
// // material.color = new THREE.Color('purple'); //external color for meshbasic material
// // // material.wireframe = true;
// // material.opacity = 0.7;
// material.transparent = true;
// material.side = THREE.FrontSide; //front back and double

// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;

// const material = new THREE.MeshMatcapMaterial();
// material.matcap = doorColorTexture;
const material = new THREE.MeshPhongMaterial();
// const material = new THREE.MeshLambertMaterial();
// const material = new THREE.MeshDepthMaterial();
// material.matcap = doorColorTexture;

material.shininess = 1000;
material.specular = new THREE.Color(0x1188ff);
const sphere = new THREE.Mesh(
	new THREE.SphereBufferGeometry(0.5, 16, 16),
	material
);
sphere.position.x = -1.5;

const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), material);

const torus = new THREE.Mesh(
	new THREE.TorusBufferGeometry(0.3, 0.2, 16, 32),
	material
);
torus.position.x = 1.5;
scene.add(sphere, plane, torus);

// axes helper(see the position of x y and z axis and their position)
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// mesh.position.normalize();

//lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);
// sizes
const sizes = {
	width: window.innerHeight,
	height: window.innerHeight,
};
// Camera
// using logical camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	1, //near
	1000 //far
);

// time
let time = Date.now();

camera.position.z = 2;

scene.add(camera);

// renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
	canvas,
	antialias: true,
});

//controls
const controls = new OrbitControls(camera, canvas);
// controls.enableZoom = false;
controls.enableDamping = true; //for smoothness
// controls.target.y = 1;
// controls.update();

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
console.log(window.devicePixelRatio);
// //gsap animations
// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
// gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });
//clock
const clock = new THREE.Clock();
// animations
const loop = () => {
	// clock
	const elapsedTime = clock.getElapsedTime();
	// console.log(elapsedTime);
	// same for everyone
	// time
	// const currentTime = Date.now();
	// const afterTime = currentTime - time;
	// time = currentTime;
	// console.log(clock);

	//! updates objects
	// mesh.rotation.x += 0.01;
	// mesh.rotation.y = elapsedTime * Math.PI * 1; //one revolution per second
	// mesh.position.x = Math.sin(elapsedTime);
	// mesh.position.y = Math.cos(elapsedTime);
	// camera.lookAt(mesh.position);
	// mesh.position.y += 0.01;

	//update camera and objects
	// camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
	// camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
	// camera.position.y = cursor.y * 5;
	// camera.lookAt(mesh.position);
	// rotate or update objects
	sphere.rotation.y = 0.15 * elapsedTime;
	plane.rotation.y = 0.15 * elapsedTime;
	torus.rotation.y = 0.15 * elapsedTime;
	// update controls
	controls.update(); //update controls on each frame for damping

	// render
	renderer.render(scene, camera);
	window.requestAnimationFrame(loop); //call the functioon on next frame
};

loop();
