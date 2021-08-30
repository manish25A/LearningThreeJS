import './style.css';
import * as THREE from 'three';

// creating scene
const scene = new THREE.Scene();

// objects

//! OBEJCTS TRANSFORMATION
// object groups
const group = new THREE.Group();
group.position.y = 1;
group.scale.y = 2; //scales to y-axis
group.rotation.y = 1; //rotates from y axis which is anticlockwise
scene.add(group);

const cube1 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: 'red' })
);
group.add(cube1);

const cube2 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: 'blue' })
);
cube2.position.x = -2;
group.add(cube2);

const cube3 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: 'green' })
);
cube3.position.x = 2;
group.add(cube3);
// // for the object rectangle cuboid
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// // simple object
// const material = new THREE.MeshBasicMaterial({ color: '#ed23fd' });

// const mesh = new THREE.Mesh(geometry, material);
// // each axis separately
// // mesh.position.x = 1;
// // mesh.position.y = 0.6;
// // mesh.position.z = 0.7;
// // all together with x,y,z
// mesh.position.set(1, -0.6, 0.7);

// // mesh.scale.x = 1;
// // mesh.scale.y = 0.5;
// // mesh.scale.z = 1.5;
// //!scale of the object (it is a vector property)
// mesh.scale.set(1, 0.5, 1.5);
// // rotation
// mesh.rotation.reorder('YXZ');
// mesh.rotation.y = Math.PI * 0.25;
// mesh.rotation.x = 0.5;

// scene.add(mesh);

// axes helper(see the position of x y and z axis and their position)
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// mesh.position.normalize();
// sizes
const sizes = {
	width: 400,
	height: 400,
};

// Camera
// using logical camera
const camera = new THREE.PerspectiveCamera(100, sizes.width / sizes.height);
camera.position.z = 3;
// camera.position.y = 1;
// camera.position.x = 1;
scene.add(camera);
// console.log(mesh.position.length());
// camera.lookAt(mesh.position);

// renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
	canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// import * as THREE from 'three';

// // creating scene
// const scene = new THREE.Scene();

// // red cube
// const geometry = new THREE.BoxGeometry(1, 1, 1);

// const material = new THREE.MeshBasicMaterial({ color: '#ff0000' });

// const mesh = new THREE.Mesh(geometry, material);

// scene.add(mesh);
// // sizes
// const sizes = {
// 	width: 400,
// 	height: 400,
// };

// // Camera
// // using logical camera
// const camera = new THREE.PerspectiveCamera(100, sizes.width / sizes.height);
// camera.position.z = 1;
// camera.position.x = 1;
// camera.position.y = 0.5;

// scene.add(camera);

// // renderer
// const canvas = document.querySelector('.webgl');
// const renderer = new THREE.WebGLRenderer({
// 	canvas,
// });

// renderer.setSize(sizes.width, sizes.height);
// renderer.render(scene, camera);
