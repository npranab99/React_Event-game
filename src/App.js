import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./components/Registration";
import Login from "./Login";
import NavBar from "./NavBar";
import Success from "./Success";
import CreateEvent from "./CreateEvent";
import EventList from "./EventList";
import Checkout from "./Checkout";
import SuccessPayment from "./SuccessPayment";
import Abc from "./Abc";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}></Route>
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/loggin" element={<Login />}></Route>
          <Route path="loggin/:id" element={<Success />}></Route>
          <Route path="loggin/:id/check_out" element={<Checkout />}></Route>

          <Route path="/event" element={<CreateEvent />}></Route>
          <Route path="/event_list" element={<EventList />}></Route>
          <Route
            path="/loggin/:id/check_out/payment_success"
            element={<SuccessPayment />}
          ></Route>
          <Route path="/abc" element={<Abc />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
