import { Dock, HomeScreen, Navbar } from "@components"
import { Finder, Image, Resume, Safari, Terminal, Text } from "@windows";
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
      <Finder />
      <Text />
      <Image />
    </main>
  )
}

export default App