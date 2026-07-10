(function () {
    if (typeof THREE === 'undefined') return;

    const isDark = () => document.body.getAttribute('data-theme') !== 'light';

    function getAccentColor() {
        return isDark() ? 0x7c6ff5 : 0x6c5ce7;
    }

    function getSecondaryColor() {
        return isDark() ? 0x38bdf8 : 0x3b82f6;
    }

    function initHeroScene() {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.z = 30;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 800 : 2000;

        const particleGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        const speeds = new Float32Array(particleCount);

        const accentR = 0.49, accentG = 0.44, accentB = 0.96;
        const secondR = 0.22, secondG = 0.74, secondB = 0.97;

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const radius = 8 + Math.random() * 20;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);

            const mix = Math.random();
            colors[i3] = accentR * (1 - mix) + secondR * mix;
            colors[i3 + 1] = accentG * (1 - mix) + secondG * mix;
            colors[i3 + 2] = accentB * (1 - mix) + secondB * mix;

            sizes[i] = Math.random() * 2 + 0.5;
            speeds[i] = Math.random() * 0.5 + 0.1;
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const particleMaterial = new THREE.PointsMaterial({
            size: 0.12,
            vertexColors: true,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            sizeAttenuation: true
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);

        const geometries = [
            new THREE.IcosahedronGeometry(2, 0),
            new THREE.TorusGeometry(1.5, 0.4, 8, 16),
            new THREE.OctahedronGeometry(1.5, 0),
            new THREE.TorusKnotGeometry(1, 0.3, 64, 8, 2, 3)
        ];

        const floatingMeshes = [];
        const wireframeMat = new THREE.MeshBasicMaterial({
            color: getAccentColor(),
            wireframe: true,
            transparent: true,
            opacity: 0.15
        });

        geometries.forEach((geo, index) => {
            const mesh = new THREE.Mesh(geo, wireframeMat.clone());
            const angle = (index / geometries.length) * Math.PI * 2;
            const dist = 12 + Math.random() * 6;
            mesh.position.set(
                Math.cos(angle) * dist,
                (Math.random() - 0.5) * 10,
                Math.sin(angle) * dist - 5
            );
            mesh.userData = {
                rotSpeed: { x: 0.003 + Math.random() * 0.01, y: 0.005 + Math.random() * 0.01 },
                floatSpeed: 0.5 + Math.random() * 0.5,
                floatAmplitude: 1 + Math.random() * 2,
                baseY: mesh.position.y,
                orbitAngle: angle,
                orbitRadius: dist,
                orbitSpeed: 0.0003 + Math.random() * 0.0005
            };
            scene.add(mesh);
            floatingMeshes.push(mesh);
        });

        let mouseX = 0, mouseY = 0;
        let targetMouseX = 0, targetMouseY = 0;

        document.addEventListener('mousemove', (e) => {
            targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
            targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        let time = 0;
        const posArray = particleGeometry.attributes.position.array;
        const originalPositions = new Float32Array(posArray);

        function animate() {
            requestAnimationFrame(animate);
            time += 0.005;

            mouseX += (targetMouseX - mouseX) * 0.05;
            mouseY += (targetMouseY - mouseY) * 0.05;

            particles.rotation.y = time * 0.1 + mouseX * 0.3;
            particles.rotation.x = mouseY * 0.2;

            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                const speed = speeds[i];
                posArray[i3] = originalPositions[i3] + Math.sin(time * speed + i) * 0.5;
                posArray[i3 + 1] = originalPositions[i3 + 1] + Math.cos(time * speed + i * 0.5) * 0.5;
                posArray[i3 + 2] = originalPositions[i3 + 2] + Math.sin(time * speed * 0.5 + i * 0.3) * 0.3;
            }
            particleGeometry.attributes.position.needsUpdate = true;

            floatingMeshes.forEach(mesh => {
                const d = mesh.userData;
                mesh.rotation.x += d.rotSpeed.x;
                mesh.rotation.y += d.rotSpeed.y;
                mesh.position.y = d.baseY + Math.sin(time * d.floatSpeed) * d.floatAmplitude;
                d.orbitAngle += d.orbitSpeed;
                mesh.position.x = Math.cos(d.orbitAngle) * d.orbitRadius;
                mesh.position.z = Math.sin(d.orbitAngle) * d.orbitRadius - 5;
            });

            camera.position.x += (mouseX * 3 - camera.position.x) * 0.02;
            camera.position.y += (mouseY * 2 - camera.position.y) * 0.02;
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
        }

        animate();

        window.addEventListener('resize', () => {
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        });

        const themeObserver = new MutationObserver(() => {
            const newColor = getAccentColor();
            floatingMeshes.forEach(mesh => {
                mesh.material.color.setHex(newColor);
            });
            particleMaterial.opacity = isDark() ? 0.7 : 0.4;
        });
        themeObserver.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
    }

    function initBgScene() {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 50;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(1);

        const isMobile = window.innerWidth < 768;
        const count = isMobile ? 300 : 600;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 100;
            positions[i + 1] = (Math.random() - 0.5) * 100;
            positions[i + 2] = (Math.random() - 0.5) * 60;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            size: 0.08,
            color: getAccentColor(),
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        let scrollY = 0;
        window.addEventListener('scroll', () => {
            scrollY = window.pageYOffset;
        });

        function animate() {
            requestAnimationFrame(animate);
            points.rotation.y += 0.0003;
            points.rotation.x = scrollY * 0.00005;
            points.position.y = -scrollY * 0.01;
            renderer.render(scene, camera);
        }

        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        const themeObserver = new MutationObserver(() => {
            material.color.setHex(getAccentColor());
            material.opacity = isDark() ? 0.4 : 0.2;
        });
        themeObserver.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initHeroScene();
            initBgScene();
        });
    } else {
        initHeroScene();
        initBgScene();
    }
})();
