import {useRoutes} from "react-router-dom";
import indexRouter from "./routes";

function App() {
  const elementRoute = useRoutes(indexRouter)
  return (
    <div style={{height: '100%'}}>
      {elementRoute}
    </div>
  );
}

export default App;
