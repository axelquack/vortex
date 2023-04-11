// Declare global variables for the scene, camera, renderer, and vortex ring
let scene, camera, renderer, ring;

// Initialize the scene, camera, renderer, and vortex ring
function init() {
  // Create a new scene
  scene = new THREE.Scene();

  // Create a perspective camera with a field of view of 75 degrees,
  // an aspect ratio based on the current window size, and near and far clipping planes
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // Create a WebGL renderer
  renderer = new THREE.WebGLRenderer();

  // Set the renderer size to match the current window size
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Set the background color of the renderer to white
  renderer.setClearColor(0xffffff);

  // Add the renderer's canvas element to the DOM
  document.body.appendChild(renderer.domElement);

  // Create a torus geometry with an outer radius of 5, a tube radius of 1.5,
  // and 100 radial and tubular segments for a smooth appearance
  const geometry = new THREE.TorusGeometry(5, 1.5, 100, 100);

  // Create a black wireframe material for the vortex ring
  const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
  // Optionally, create a standard material for the vortex ring:
  // const material = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.5, metalness: 0.5 });

  // Create the vortex ring mesh using the torus geometry and wireframe material
  ring = new THREE.Mesh(geometry, material);

  // Add the vortex ring mesh to the scene
  scene.add(ring);

  // Set the camera's z-position so the vortex ring is visible
  camera.position.z = 15;

  // Add an event listener to handle window resize events
  window.addEventListener('resize', onWindowResize, false);
}

// Animate the vortex ring and render the scene
function animate() {
  // Request the next animation frame and call the animate function again
  requestAnimationFrame(animate);

  // Rotate the vortex ring around the x-axis and y-axis
  ring.rotation.x += 0.01;
  ring.rotation.y += 0.01;

  // Render the scene using the camera
  renderer.render(scene, camera);
}

// Handle window resize events
function onWindowResize() {
  // Update the camera's aspect ratio based on the new window size
  camera.aspect = window.innerWidth / window.innerHeight;

  // Update the camera's projection matrix to apply the new aspect ratio
  camera.updateProjectionMatrix();

  // Update the renderer's size to match the new window size
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Call the init function to set up the scene, camera, and renderer
init();

// Call the animate function to start the animation loop
animate();
