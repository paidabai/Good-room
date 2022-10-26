import {useRoutes} from "react-router-dom";
import indexRouter from "./routes";

function App() {
  const elementRoute = useRoutes(indexRouter)
  return (
    <div className="App">
      {elementRoute}
    </div>
  );
}

export default App;
