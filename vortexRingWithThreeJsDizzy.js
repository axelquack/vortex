let scene, camera, renderer, ring;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.TorusGeometry(5, 1.5, 100, 100);
  
  // Create a liquid/fluid golden material using MeshStandardMaterial
  const material = new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.4, metalness: 0.8 });
  
  ring = new THREE.Mesh(geometry, material);
  scene.add(ring);

  // Adding point lights to the scene
  const light1 = new THREE.PointLight(0xffffff, 1, 0);
  light1.position.set(10, 10, 10);
  scene.add(light1);

  const light2 = new THREE.PointLight(0xffffff, 1, 0);
  light2.position.set(-40, -10, -10);
  scene.add(light2);

  camera.position.z = 15;

  window.addEventListener('resize', onWindowResize, false);
}

function animate() {
  requestAnimationFrame(animate);

  // Apply transformations to the vortex ring
  ring.rotation.x += 0.01;
  ring.rotation.y += 0.05;
  ring.rotation.z += 0.07;
  ring.scale.x = 1 + Math.sin(Date.now() * 0.001) * 0.5;
  ring.scale.y = 1 + Math.cos(Date.now() * 0.002) * 0.5;
  ring.scale.z = 1 + Math.sin(Date.now() * 0.003) * 0.5;

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
animate();
