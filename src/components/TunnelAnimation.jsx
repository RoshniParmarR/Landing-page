import React, { useEffect, useRef } from 'react';

export default function TunnelAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Resize handler
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Tunnel Rings State
    // We store the depth z of each ring. z ranges from 0.05 (near/large) to 1.0 (far/small).
    const numRings = 10;
    const rings = [];
    for (let i = 0; i < numRings; i++) {
      rings.push(0.05 + (i / numRings) * 0.95);
    }

    const speed = 0.0015; // Animation speed

    const draw = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Base dimensions for the 3D projection
      const wBase = width * 1.6;
      const hBase = height * 1.6;

      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(129, 140, 248, 0.22)'; // Light indigo/lavender line color

      // 1. Draw Perspective Grid Lines (Radial lines)
      const numDivsX = 10;
      const numDivsY = 8;

      // Lines to top & bottom edges of the outer bounds
      for (let i = 0; i <= numDivsX; i++) {
        const x = cx - wBase / 2 + (i / numDivsX) * wBase;

        // Top wall line
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, cy - hBase / 2);
        ctx.stroke();

        // Bottom wall line
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, cy + hBase / 2);
        ctx.stroke();
      }

      // Lines to left & right edges of the outer bounds
      for (let i = 0; i <= numDivsY; i++) {
        const y = cy - hBase / 2 + (i / numDivsY) * hBase;

        // Left wall line
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx - wBase / 2, y);
        ctx.stroke();

        // Right wall line
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + wBase / 2, y);
        ctx.stroke();
      }

      // 2. Draw Rectangular Rings (Depth rings)
      // Sort rings so the furthest (smallest) ones are drawn first, or vice-versa.
      // Since it's a wireframe, order doesn't matter too much, but drawing largest to smallest is standard.
      const sortedRings = [...rings].sort((a, b) => a - b);

      sortedRings.forEach((z) => {
        // Linear scale factor. As z decreases, size increases exponentially (1/z).
        const scale = 0.08 / z;
        const w = wBase * scale;
        const h = hBase * scale;

        // Fade out rings as they approach the center (larger z = smaller size = more faded)
        const opacity = Math.min(0.28, (1 - z) * 0.45);
        ctx.strokeStyle = `rgba(129, 140, 248, ${opacity})`;

        ctx.beginPath();
        ctx.rect(cx - w / 2, cy - h / 2, w, h);
        ctx.stroke();
      });

      // 3. Update Ring Depths
      for (let i = 0; i < rings.length; i++) {
        rings[i] -= speed;
        if (rings[i] <= 0.05) {
          rings[i] = 1.0;
        }
      }

      // 4. Draw Center Vanishing Point Dot
      ctx.fillStyle = 'rgba(99, 102, 241, 0.4)';
      ctx.beginPath();
      ctx.arc(cx, cy, 2, 0, Math.PI * 2);
      ctx.fill();

      // Vanishing point is clear and visible, no overlay gradient is needed here

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block bg-transparent"
    />
  );
}
