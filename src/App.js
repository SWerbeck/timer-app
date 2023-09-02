import "./App.css";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Timer from "./components/Timer";

function App() {
  const particlesInit = async (main) => {
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  const particlesLoaded = (container) => {};

  return (
    <div className="particle-container">
      <Particles
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: "#416cb0",
          },
          fpsLimit: 60,
          interactivity: {
            detectsOn: "canvas",
            fullscreen: true,
            events: {
              resize: true,
            },
          },
          particles: {
            color: {
              value: "#9fafca",
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
                speed: 3,
                sync: false,
              },
              value: 1,
            },
            shape: {
              type: "square",
            },
            size: {
              random: true,
              minimumValue: 0.5,
            },
            value: 1,
          },
        }}
      />
      <div className="custom-component">
        <div className="card text-center header-section">Header section</div>
        <Timer />
        <div className="card footer text-body-secondary footer-section">
          Footer
        </div>
      </div>
    </div>
  );
}

export default App;
