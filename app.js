// POLARIS v5 Premium Architectural Engine - Selective Scientific Scroll Animations
// Strict Philosophy: Animate Information, Not Decoration. Zero Gimmicks.

(function() {
    'use strict';

    // 0. RESET SCROLL RESTORATION & FORCE TOP SCROLL ON LOAD/REFRESH
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    function resetToTop() {
        if (window.location.hash) {
            history.replaceState(null, '', window.location.pathname + window.location.search);
        }
        window.scrollTo(0, 0);
    }

    resetToTop();
    window.addEventListener('load', resetToTop);
    window.addEventListener('beforeunload', () => {
        window.scrollTo(0, 0);
    });

    // CUSTOM SMOOTH ANIMATION SCROLL ENGINE (INFINITE REPEATABLE SMOOTH SLIDE)
    let currentScrollFrame = null;

    function animateScrollTo(targetY) {
        // Cancel any previously running scroll animation to prevent collision
        if (currentScrollFrame) {
            cancelAnimationFrame(currentScrollFrame);
            currentScrollFrame = null;
        }

        const startY = window.pageYOffset || document.documentElement.scrollTop;
        const distance = targetY - startY;
        if (Math.abs(distance) < 5) return;

        const duration = 500; // Crisp 500ms slide
        let start = null;

        function step(timestamp) {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);

            // Easing: easeOutCubic
            const ease = 1 - Math.pow(1 - progress, 3);

            window.scrollTo(0, startY + distance * ease);

            if (progress < 1) {
                currentScrollFrame = requestAnimationFrame(step);
            } else {
                currentScrollFrame = null;
                if (window.location.hash) {
                    history.replaceState(null, '', window.location.pathname + window.location.search);
                }
            }
        }

        currentScrollFrame = requestAnimationFrame(step);
    }

    // 1. ANCHOR & LINK CLICK INTERCEPTOR (INFINITELY REPEATABLE SCROLLING)
    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a');
        if (!anchor) return;

        const href = anchor.getAttribute('href');
        if (!href) return;

        // Ensure all sections are revealed so scrolling never target hidden/unrendered layout
        document.querySelectorAll('.reveal-section, .reveal-stagger-container, .pipeline-flow-container').forEach(el => {
            el.classList.add('is-visible');
        });

        // Top / Logo links
        if (href === '#' || href === '#hero' || href === 'index.html' || anchor.classList.contains('hero-brand')) {
            e.preventDefault();
            animateScrollTo(0);
            return;
        }

        // Section anchor links (#visual-math, #pipeline-flow, #benchmarks, #methodology)
        if (href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const targetY = target.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop) - 10;
                animateScrollTo(targetY);
            }
        }
    });

    // HERO NEURAL VECTOR RADAR HUD CANVAS ANIMATION (SLOW & SMOOTH)
    function initHeroRadarCanvas() {
        const canvas = document.getElementById('hero-radar-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        function resize() {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }
        resize();
        window.addEventListener('resize', resize);

        let angle = 0;
        const nodes = [];
        for (let i = 0; i < 8; i++) {
            nodes.push({
                id: i,
                r: Math.random() * 90 + 30,
                theta: Math.random() * Math.PI * 2,
                speed: (Math.random() - 0.5) * 0.004,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                isByzantine: i < 2,
                isShielded: true
            });
        }

        function drawRadarHUD() {
            const width = canvas.width / window.devicePixelRatio;
            const height = canvas.height / window.devicePixelRatio;
            const cx = width / 2;
            const cy = height / 2;

            ctx.clearRect(0, 0, width, height);

            // Grid Background & Concentric Rings
            ctx.strokeStyle = 'rgba(212, 232, 151, 0.12)';
            ctx.lineWidth = 1;

            [35, 75, 115, 145].forEach(r => {
                ctx.beginPath();
                ctx.arc(cx, cy, r, 0, Math.PI * 2);
                ctx.stroke();
            });

            // Crosshair lines
            ctx.strokeStyle = 'rgba(212, 232, 151, 0.18)';
            ctx.beginPath();
            ctx.moveTo(cx, 15);
            ctx.lineTo(cx, height - 15);
            ctx.moveTo(15, cy);
            ctx.lineTo(width - 15, cy);
            ctx.stroke();

            // Safety Invariant Boundary Frame (+-5.0)
            ctx.strokeStyle = '#d4e897';
            ctx.lineWidth = 2;
            ctx.setLineDash([6, 4]);
            ctx.strokeRect(cx - 105, cy - 105, 210, 210);
            ctx.setLineDash([]);

            // Axis Coordinate Labels
            ctx.fillStyle = '#d4e897';
            ctx.font = '9px Space Mono';
            ctx.fillText('+5.0', cx + 110, cy + 3);
            ctx.fillText('-5.0', cx - 135, cy + 3);
            ctx.fillText('+5.0', cx - 12, cy - 110);
            ctx.fillText('-5.0', cx - 12, cy + 118);

            // Sweeping Radar Beam (SLOW RADAR ROTATION)
            angle += 0.005;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, 145, angle, angle + 0.4);
            ctx.closePath();
            
            const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 145);
            grad.addColorStop(0, 'rgba(212, 232, 151, 0.25)');
            grad.addColorStop(1, 'rgba(212, 232, 151, 0.02)');
            ctx.fillStyle = grad;
            ctx.fill();
            ctx.restore();

            // Radar beam leading edge line
            ctx.strokeStyle = '#d4e897';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + 145 * Math.cos(angle + 0.4), cy + 145 * Math.sin(angle + 0.4));
            ctx.stroke();

            // Draw Dynamic Agent Nodes
            nodes.forEach(n => {
                n.theta += n.speed;
                const nx = cx + n.r * Math.cos(n.theta);
                const ny = cy + n.r * Math.sin(n.theta);

                ctx.strokeStyle = n.isByzantine ? 'rgba(201, 74, 74, 0.5)' : 'rgba(212, 232, 151, 0.5)';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(nx, ny);
                ctx.lineTo(nx - n.vx * 8, ny - n.vy * 8);
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(nx, ny, 5, 0, Math.PI * 2);
                ctx.fillStyle = n.isByzantine ? '#c94a4a' : '#d4e897';
                ctx.fill();

                if (n.isShielded && !n.isByzantine) {
                    ctx.beginPath();
                    ctx.arc(nx, ny, 10 + Math.sin(angle * 1.5 + n.id) * 3, 0, Math.PI * 2);
                    ctx.strokeStyle = '#d4e897';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }

                ctx.fillStyle = '#ffffff';
                ctx.font = '9px Space Mono';
                ctx.fillText(`A${n.id}`, nx + 8, ny - 4);
            });

            requestAnimationFrame(drawRadarHUD);
        }

        drawRadarHUD();
    }

    // VISUAL MATH DIAGRAM 1: TOPOLOGICAL CONNECTED GRAPH (SLOW MORPH)
    function initTopologyMathCanvas() {
        const canvas = document.getElementById('math-topo-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let time = 0;
        function drawTopo() {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            time += 0.006;
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            const nodes = [
                { x: cx - 80 + Math.sin(time) * 15, y: cy - 40 + Math.cos(time) * 10 },
                { x: cx + Math.cos(time * 1.2) * 20, y: cy - 60 + Math.sin(time * 1.5) * 10 },
                { x: cx + 80 + Math.sin(time * 0.8) * 15, y: cy - 20 + Math.cos(time) * 15 },
                { x: cx + 50 + Math.cos(time) * 10, y: cy + 50 + Math.sin(time) * 12 },
                { x: cx - 60 + Math.sin(time * 1.4) * 12, y: cy + 40 + Math.cos(time * 0.9) * 15 }
            ];

            ctx.strokeStyle = '#004741';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(nodes[0].x, nodes[0].y);
            for (let i = 1; i < nodes.length; i++) {
                ctx.lineTo(nodes[i].x, nodes[i].y);
            }
            ctx.closePath();
            ctx.stroke();

            ctx.fillStyle = 'rgba(0, 71, 65, 0.08)';
            ctx.fill();

            nodes.forEach(n => {
                ctx.beginPath();
                ctx.arc(n.x, n.y, 8, 0, Math.PI * 2);
                ctx.fillStyle = '#004741';
                ctx.fill();
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                ctx.stroke();
            });

            requestAnimationFrame(drawTopo);
        }

        drawTopo();
    }

    // VISUAL MATH DIAGRAM 2: CONTROL BARRIER TRAJECTORY (SLOW WAVE)
    function initBarrierMathCanvas() {
        const canvas = document.getElementById('math-cbs-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let t = 0;
        function drawCBS() {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            t += 0.008;
            const w = canvas.width;
            const h = canvas.height;

            ctx.strokeStyle = '#c94a4a';
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(40, h / 2);
            ctx.lineTo(w - 40, h / 2);
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.strokeStyle = '#004741';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(40, h / 2 + 50);

            for (let x = 40; x < w - 40; x += 5) {
                const y = h / 2 - Math.abs(Math.sin((x + t * 20) * 0.02)) * 60 - 15;
                ctx.lineTo(x, y);
            }
            ctx.stroke();

            requestAnimationFrame(drawCBS);
        }

        drawCBS();
    }

    // SELECTIVE SCIENTIFIC SCROLL ANIMATIONS ENGINE
    function initScrollAnimations() {
        if (!('IntersectionObserver' in window)) {
            document.querySelectorAll('.reveal-section, .reveal-stagger-container, .pipeline-flow-container').forEach(el => {
                el.classList.add('is-visible');
            });
            document.querySelectorAll('.bench-bar-fill').forEach(bar => {
                const w = bar.getAttribute('data-width');
                if (w) bar.style.width = w;
            });
            return;
        }

        // SECTION & STAGGER REVEAL OBSERVER
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.reveal-section, .reveal-stagger-container, .pipeline-flow-container').forEach(el => {
            revealObserver.observe(el);
        });

        // EMPIRICAL STATS COUNTER ANIMATION (RUNS ONCE OVER ~0.8s)
        const statsContainer = document.querySelector('.stats-container');
        if (statsContainer) {
            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateStatsCounters();
                        statsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            statsObserver.observe(statsContainer);
        }

        function animateStatsCounters() {
            const counterElems = document.querySelectorAll('.counter-stat');
            const duration = 800;
            const startTime = performance.now();

            function step(now) {
                const elapsed = Math.min(duration, now - startTime);
                const progress = elapsed / duration;
                const easeOutQuad = progress * (2 - progress);

                counterElems.forEach(el => {
                    const target = parseFloat(el.getAttribute('data-target') || '0');
                    const decimals = parseInt(el.getAttribute('data-decimals') || '0');
                    const suffix = el.getAttribute('data-suffix') || '';

                    const currentVal = target * easeOutQuad;
                    el.textContent = currentVal.toFixed(decimals) + suffix;
                });

                if (elapsed < duration) {
                    requestAnimationFrame(step);
                } else {
                    counterElems.forEach(el => {
                        const target = parseFloat(el.getAttribute('data-target') || '0');
                        const decimals = parseInt(el.getAttribute('data-decimals') || '0');
                        const suffix = el.getAttribute('data-suffix') || '';
                        el.textContent = target.toFixed(decimals) + suffix;
                    });
                }
            }
            requestAnimationFrame(step);
        }

        // BENCHMARK BAR FILL WIDTH ANIMATION
        const benchContainer = document.querySelector('.bench-visual-container');
        if (benchContainer) {
            const benchObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        document.querySelectorAll('.bench-bar-fill').forEach(bar => {
                            const w = bar.getAttribute('data-width');
                            if (w) bar.style.width = w;
                        });
                        benchObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            benchObserver.observe(benchContainer);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        initHeroRadarCanvas();
        initTopologyMathCanvas();
        initBarrierMathCanvas();
        initScrollAnimations();
    });

})();
