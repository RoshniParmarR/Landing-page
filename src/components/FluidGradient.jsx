import { Renderer, Program, Mesh, Triangle } from 'ogl';
import React, { useEffect, useRef } from 'react';

function hexToVec3(hex) {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255
  ];
}

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uSpeed;
uniform float uOpacity;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
uniform vec2 uMouse;
uniform float uMouseInfluence;
uniform bool uEnableMouse;

void main() {
  vec2 p = gl_FragCoord.xy / uResolution.xy;
  
  float t = uTime * uSpeed;
  
  // Warp coordinates to create liquid motion
  vec2 uv = p;
  uv.x += sin(p.y * 4.0 + t) * 0.08;
  uv.y += cos(p.x * 4.0 + t * 0.8) * 0.08;
  
  // Dynamic centers for the 4 colors
  vec2 c1 = vec2(0.25 + 0.15 * sin(t * 0.4), 0.25 + 0.15 * cos(t * 0.3));
  vec2 c2 = vec2(0.75 + 0.15 * cos(t * 0.3), 0.25 + 0.15 * sin(t * 0.5));
  vec2 c3 = vec2(0.25 + 0.15 * cos(t * 0.5), 0.75 + 0.15 * sin(t * 0.4));
  vec2 c4 = vec2(0.75 + 0.15 * sin(t * 0.3), 0.75 + 0.15 * cos(t * 0.5));
  
  // Mouse interaction warping
  if (uEnableMouse) {
    vec2 mPos = uMouse;
    float mDist = length(p - mPos);
    if (mDist < 0.6) {
      float force = (1.0 - mDist / 0.6);
      // Push coordinates away from mouse
      uv += (p - mPos) * force * force * uMouseInfluence * 0.15;
    }
  }
  
  float d1 = length(uv - c1);
  float d2 = length(uv - c2);
  float d3 = length(uv - c3);
  float d4 = length(uv - c4);
  
  // Smooth bell-curve dropoff for soft metaball-like blending
  float w1 = exp(-d1 * d1 * 2.5);
  float w2 = exp(-d2 * d2 * 2.5);
  float w3 = exp(-d3 * d3 * 2.5);
  float w4 = exp(-d4 * d4 * 2.5);
  
  float sum = w1 + w2 + w3 + w4;
  vec3 color = (w1 * uColor1 + w2 * uColor2 + w3 * uColor3 + w4 * uColor4) / (sum + 0.001);
  
  // Add film grain/noise to prevent color banding (crucial for smooth gradients)
  float grain = fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  color += (grain - 0.5) * 0.015;
  
  gl_FragColor = vec4(color, uOpacity);
}
`;

export default function FluidGradient({
  speed = 0.5,
  opacity = 0.8,
  color1 = '#e0f2fe', // sky-100 (soft blue)
  color2 = '#f5f3ff', // violet-50 (soft violet)
  color3 = '#fee2e2', // red-100 (soft pink/rose)
  color4 = '#fff7ed', // orange-50 (soft peach/apricot)
  enableMouseInteraction = true,
  mouseInfluence = 1.0
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    // Create Renderer with transparency support
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    let program;
    let currentMouse = [0.5, 0.5];
    let targetMouse = [0.5, 0.5];

    function handleMouseMove(e) {
      const rect = gl.canvas.getBoundingClientRect();
      targetMouse = [
        (e.clientX - rect.left) / rect.width,
        1.0 - (e.clientY - rect.top) / rect.height
      ];
    }

    function handleMouseLeave() {
      targetMouse = [0.5, 0.5];
    }

    function resize() {
      if (!container) return;
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      if (program) {
        program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
      }
    }
    
    window.addEventListener('resize', resize);
    resize();

    const geometry = new Triangle(gl);
    program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [gl.canvas.width, gl.canvas.height] },
        uSpeed: { value: speed },
        uOpacity: { value: opacity },
        uColor1: { value: hexToVec3(color1) },
        uColor2: { value: hexToVec3(color2) },
        uColor3: { value: hexToVec3(color3) },
        uColor4: { value: hexToVec3(color4) },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
        uMouseInfluence: { value: mouseInfluence },
        uEnableMouse: { value: enableMouseInteraction }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    container.appendChild(gl.canvas);

    if (enableMouseInteraction) {
      window.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    let animationFrameId;

    function update(time) {
      animationFrameId = requestAnimationFrame(update);
      program.uniforms.uTime.value = time * 0.001;

      if (enableMouseInteraction) {
        currentMouse[0] += 0.05 * (targetMouse[0] - currentMouse[0]);
        currentMouse[1] += 0.05 * (targetMouse[1] - currentMouse[1]);
        program.uniforms.uMouse.value[0] = currentMouse[0];
        program.uniforms.uMouse.value[1] = currentMouse[1];
      }

      renderer.render({ scene: mesh });
    }
    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      if (enableMouseInteraction) {
        window.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [speed, opacity, color1, color2, color3, color4, enableMouseInteraction, mouseInfluence]);

  return <div ref={containerRef} className="w-full h-full" />;
}
