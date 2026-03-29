import { Dock, HomeScreen, Navbar } from "@components"
import { Terminal } from "@windows";
import gsap from "gsap";
import { Draggable } from "gsap/all";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <HomeScreen />
      <Dock />
      <Terminal />
    </main>
  )
}

export default App