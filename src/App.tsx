import { Dock, HomeScreen, Navbar } from "@components"
import { Resume, Safari, Terminal } from "@windows";
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
      <Resume />
    </main>
  )
}

export default App