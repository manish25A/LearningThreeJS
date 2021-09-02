// animation

import './style.css';
import * as THREE from 'three';
import { CubeTextureLoader, Mesh, PointLight, TextureLoader } from 'three';
import gsap from 'gsap'; //to create animations like timelines twins and all
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

//debug gui
//debug
const gui = new dat.GUI();
// creating scene
const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load('door.jpg');

const fontLoader = new THREE.FontLoader();
fontLoader.load('fonts/helvetiker_regular.typeface.json', (font) => {
	const textGeometry = new THREE.TextBufferGeometry(
		'hello world',

		{
			font,
			size: 0.5,
			height: 0.02,
			curveSegments: 12,
			bevelEnabled: true,
			bevelThickness: 0.3,
			bevelSize: 0.02,
			bevelOffset: 0,
			bevelSegments: 5,
		}
	);
	// textGeometry.computeBoundingBox();

	textGeometry.center();
	// textGeometry.translate(
	// 	-textGeometry.boundingBox.max.x * 0.5,
	// 	-textGeometry.boundingBox.max.y * 0.5,
	// 	-(textGeometry.boundingBox.max.z - 0.3) * 0.5
	// );

	const material = new THREE.MeshMatcapMaterial();
	material.matcap = doorColorTexture;
	const text = new THREE.Mesh(textGeometry, material);
	scene.add(text);

	for (let i = 0; i < 100; i++) {
		const circleGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45);
		const material = new THREE.MeshMatcapMaterial({
			matcap: doorColorTexture,
		});
		const circle = new THREE.Mesh(circleGeometry, material);
		circle.position.x = (Math.random() - 0.5) * 10;
		circle.position.y = (Math.random() - 0.5) * 10;
		circle.position.z = (Math.random() - 0.5) * 10;
		circle.rotation.x = Math.random() * Math.PI;

		const scale = Math.random();
		circle.scale.set(scale, scale, scale);
		scene.add(circle);
	}
});

// axes helper(see the position of x y and z axis and their position)
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

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

camera.position.z = 5;

scene.add(camera);

// // objects
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial();
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);
// renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
	canvas,
	antialias: true,
});

//controls
const controls = new OrbitControls(camera, canvas);
// controls.enableZoom = false;
// controls.enableDamping = true; //for smoothness
// controls.target.y = 1;
// controls.update();

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const clock = new THREE.Clock();
// animations
const loop = () => {
	// clock
	const elapsedTime = clock.getElapsedTime();

	// render
	renderer.render(scene, camera);
	window.requestAnimationFrame(loop); //call the functioon on next frame
};

loop();
