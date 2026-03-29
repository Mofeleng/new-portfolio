import { Dock, HomeScreen, Navbar } from "@components"
import { Safari, Terminal } from "@windows";
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
      <Safari />
    </main>
  )
}

export default App