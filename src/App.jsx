import Home from "./pages/Home";
import useLenis from "./hooks/useLenis";

function App() {
  useLenis();
  return (
    <div className="bg-black text-white min-h-screen">
      <Home />
    </div>
  );
}
export default App;
