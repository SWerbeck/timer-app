import React, { useCallback } from "react";
import "./App.css";
import Timer from "../src/components/Timer";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.
import type { Container, Engine } from "tsparticles-engine";
import useSound from "use-sound";
import Headline from "./components/Headline";

function App() {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.log(container);
    },
    []
  );
  return (
    <div style={{backgroundColor: "#d7e4eb", position: "absolute", height: "100%", width: "100%"}}>
        <Headline />
        <Timer />
      
     
    </div>
  );
}

export default App;
