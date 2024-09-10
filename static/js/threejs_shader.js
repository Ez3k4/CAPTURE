/* import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; */
/* import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js'; */

// Function to get shader script content
function getShader(id) {
    return document.getElementById(id).textContent;
}

// init renderer
const canvas = document.getElementById('three-canvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
renderer.shadowMap.enabled = true; // Enable shadow maps
renderer.setSize(window.innerWidth, window.innerHeight/2);

//################################## CAMEREA ################################

// init scene and camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / (window.innerHeight / 2), 0.01, 3000);
camera.position.z = 12;

/* // Add OrbitControls
var controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable damping (inertia)
controls.dampingFactor = 0.25; // Damping factor
controls.screenSpacePanning = false; // Disable panning */



// ################################# OBJECT ##################################

const uniforms = {
    u_resolution: { type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight / 2) },
    u_time: { type: 'f', value: 0.0 }
}

// create a shader material
const mat = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: getShader('vertexShader'),
    fragmentShader: getShader('fragmentShader')
});

// create icosahedron geometry
const geo = new THREE.IcosahedronGeometry(4, 30);

// create a mesh
const icosahedronMesh = new THREE.Mesh(geo, mat);

// add the mesh to the scene
scene.add(icosahedronMesh);
icosahedronMesh.material.wireframe = true


// ############################# LIGHT ###############################

// a directional light
var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0.75, 1, 0.25);
directionalLight.castShadow = true; // Enable shadows if needed
scene.add(directionalLight);

// ############################## CONTROL ##############################

// Add a grid helper
/* var gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper); */

// render
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    // Update the u_time uniform
    uniforms.u_time.value += 0.01;

}
animate();