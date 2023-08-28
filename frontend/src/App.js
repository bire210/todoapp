import "./App.css";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import Home from "./pages/Home";
import Todo from "./pages/Todo";

// Change 2 qw1
function App() {
  return (
    <div className="App">
      <Route path="/" component={Home} exact />
      <Route path="/todo" component={Todo} />
    </div>
  );
}

export default App;
