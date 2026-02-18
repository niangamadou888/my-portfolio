import { useEffect, useRef } from 'react';

const VERTEX_SHADER = `
  attribute vec4 a_position;
  void main() {
    gl_Position = a_position;
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;

  // Cosine palette locked to #d6c9b6 (warm sand) <-> #323c48 (dark slate)
  // a = midpoint, b = half-range, c/d = frequency/phase
  vec3 palette(float t) {
    vec3 a = vec3(0.518, 0.511, 0.498);
    vec3 b = vec3(0.322, 0.276, 0.216);
    vec3 c = vec3(1.0,   1.0,   1.0);
    vec3 d = vec3(0.0,   0.0,   0.0);
    return a + b * cos(6.28318 * (c * t + d));
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0.0);

    for (float i = 0.0; i < 3.0; i++) {
      uv = fract(uv * 1.5) - 0.5;
      float d = length(uv) * exp(-length(uv0));
      // Slow, calm movement
      vec3 col = palette(length(uv0) + i * 0.4 + u_time * 0.1);
      d = sin(d * 6.0 + u_time * 0.6) / 6.0;
      d = abs(d);
      d = pow(0.01 / d, 1.0);
      finalColor += col * d;
    }

    // Keep it subtle — dark slate base, faint warm highlights
    finalColor *= 0.12;
    vec3 base = vec3(0.196, 0.235, 0.282); // #323c48
    finalColor = mix(base, finalColor + base * 0.8, 0.55);

    // Very soft warm mouse glow
    vec2 mouse = (u_mouse * 2.0 - u_resolution.xy) / u_resolution.y;
    float mouseDist = length(uv0 - mouse);
    finalColor += vec3(0.214, 0.201, 0.182) * exp(-mouseDist * 6.0) * 0.06;

    gl_FragColor = vec4(clamp(finalColor, 0.0, 1.0), 1.0);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

export const ShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const vertShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

    const program = gl.createProgram()!;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const posAttr = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: window.innerHeight - e.clientY };
    };
    window.addEventListener('mousemove', handleMouse);

    const startTime = Date.now();
    const render = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
};
