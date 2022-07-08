import { ContextProvider } from "./context/contextProvider";
import MainScreen from "./components/MainScreen/MainScreen";

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <MainScreen />
      </ContextProvider>
    </div>
  );
}

export default App;
