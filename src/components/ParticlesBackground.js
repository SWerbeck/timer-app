import React from "react";
import Particles from "react-tsparticles";

export default function ParticlesBackground() {
  return (
    <div>
      <Particles
        options={{
          background: {
            color: "#0e387a",
          },
          fpsLimit: 60,
          interactivity: {
            detectsOn: "canvas",
            events: {
              resize: true,
            },
          },
          particles: {
            color: {
              value: "9fafca",
            },
            number: {
              density: {
                enable: true,
                area: 1080,
              },
              limit: 0,
              //number of particles in the screen
              value: 400,
            },
            opacity: {
              animation: {
                enable: true,
                minimumValue: 0.05,
                speed: 1,
                sync: false,
              },
              random: {
                enable: true,
                minimumValue: 0.05,
              },
              shape: {
                shape: "circle",
              },
              size: {
                random: true,
                minimumValue: 0.5,
              },
              value: 1,
            },
          },
        }}
      ></Particles>
    </div>
  );
}
