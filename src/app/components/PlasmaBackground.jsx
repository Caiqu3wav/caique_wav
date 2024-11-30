'use client'
import { useEffect } from "react";
import GlslCanvas from "glslCanvas";

export default function PlasmaBackground() {
  useEffect(() => {
    let sandbox;

    function main() {
      const canvas = document.querySelector("#c");
      if (!sandbox) {
        sandbox = new GlslCanvas(canvas, {
          fragmentString: `
precision highp float;

uniform vec3 iResolution;
uniform float iTime;
uniform vec3 colorA; // Primeira cor
uniform vec3 colorB; // Segunda cor
uniform vec3 colorC; // Terceira cor

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy; 
    uv = uv * 2.0 - 1.0; // Centraliza as coordenadas no meio da tela
    uv.x *= iResolution.x / iResolution.y; // Corrige a proporção da tela

    // Distorce as coordenadas para evitar repetição
    uv += 0.1 * sin(uv.yx * 10.0 + iTime); // Distorção dinâmica baseada no tempo

    // Criação do padrão de plasma
    float color = sin(uv.x * 10.0 + iTime) +
                  sin(uv.y * 10.0 + iTime) +
                  sin((uv.x + uv.y) * 10.0 + iTime);
    color = color / 3.0 + 0.5; // Normaliza para valores entre 0 e 1

    // Mistura entre três cores com base no padrão de plasma
    vec3 plasmaColor;
    if (color < 0.5) {
        plasmaColor = mix(colorA, colorB, color * 2.0); // Interpolação entre colorA e colorB
    } else {
        plasmaColor = mix(colorB, colorC, (color - 0.5) * 2.0); // Interpolação entre colorB e colorC
    }

    fragColor = vec4(plasmaColor, 1.0); // Define a cor final
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
          `,
        });
      }

      const colorA = [0.2, 0.4, 0.8]; // Azul
      const colorB = [1.0, 0.5, 0.0]; // Laranja
      const colorC = [0.0, 1.0, 0.5]; // Verde

      sandbox.setUniform("iTime", 0);
      sandbox.setUniform("iResolution", canvas.width, canvas.height, 1);
      sandbox.setUniform("colorA", ...colorA);
      sandbox.setUniform("colorB", ...colorB);
      sandbox.setUniform("colorC", ...colorC);

      let width = canvas.width,
        height = canvas.height;

      function render(time) {
        if (document.hidden) return;

        time *= 0.001; // Convert to seconds
        sandbox.setUniform("iTime", time);
        if (width !== canvas.width || height !== canvas.height) {
          width = window.innerWidth;
          height = window.innerHeight;
          sandbox.setUniform("iResolution", width, height, 1);
        }
        requestAnimationFrame(render);
      }

      requestAnimationFrame(render);
    }

    main();

    return () => {
      sandbox?.destroy?.();
    };
  }, []);

  return <canvas id="c" style={{ width: "100%", height: "100%" }} />;
}