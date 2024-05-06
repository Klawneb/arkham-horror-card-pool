import CardFilterSelector from "./Components/CardFilter.tsx";
import CardDisplay from "./Components/CardDisplay.tsx";

function App() {
  return (
    <div className="w-screen h-screen bg-background dark flex">
        <CardFilterSelector/>
        <CardDisplay/>
    </div>
  )
}

export default App
