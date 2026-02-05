// --- Pestañas dinámicas ---
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    tabButtons.forEach(btn => btn.classList.remove("active"));
    tabContents.forEach(content => content.classList.remove("show"));

    button.classList.add("active");
    const tabId = button.getAttribute("data-tab");
    document.getElementById(tabId).classList.add("show");
  });
});

// --- Visor 3D con OrbitControls ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 600/400, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(600, 400);
document.getElementById("viewer").appendChild(renderer.domElement);

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(0, 2, 5);
controls.update();

// --- Cargar modelo STL ---
function loadSTL(path) {
  const loader = new THREE.STLLoader();
  loader.load(path, function(geometry) {
    const material = new THREE.MeshPhongMaterial({color:0x5555ff});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI/2;
    scene.add(mesh);
    animate();
  });
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

// Ejemplo: carga un modelo
// loadSTL('models/avion.stl');
