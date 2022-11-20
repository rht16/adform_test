import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Users from "./components/user";

function App() {
  return (
    <Provider store={store}>
      <Users />
    </Provider>
  );
}

export default App;