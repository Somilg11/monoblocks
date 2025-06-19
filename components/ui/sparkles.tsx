"use client";

import { useCallback } from "react";
import { loadSlim } from "tsparticles-slim";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";

interface SparklesProps {
  id: string;
  className?: string;
  background?: string;
  particleDensity?: number;
}

export const SparklesCore = ({
  id,
  className = "",
  background = "transparent",
  particleDensity = 100,
}: SparklesProps) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id={id}
      init={particlesInit}
      className={className}
      options={{
        fullScreen: false,
        background: { color: { value: background } },
        particles: {
          number: {
            value: particleDensity,
            density: {
              enable: true,
              area: 800,
            },
          },
          color: {
            value: ["#ffffff", "#e60a64", "#c57690"],
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.6,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.2,
              sync: false,
            },
          },
          size: {
            value: { min: 1, max: 3 },
          },
          move: {
            enable: true,
            speed: 0.6,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "out",
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: false,
            },
            onClick: {
              enable: false,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
};
