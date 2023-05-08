import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import Success from "./Success";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const usenevigate = useNavigate();

  function login(e) {
    //e.perventDefault();
    //console.log({ email, pass });
    //var data = { email, pass };
    if (email === "" || pass === null) {
      alert("Fill Email");
    }
    if (pass === "" || email === null) {
      alert("Fill Password");
    } else {
      console.log("Proceed"); //////
      fetch("http://localhost:4000/user/" + email)
        .then((res) => {
          res.json().then((resp) => {
            console.log(resp);

            if (resp.pass === pass && resp.id === email) {
              usenevigate(`/loggin/${resp.id}`);
              console.log("suuuuuuuuu");
              <Link to="/loggin/:id"></Link>;
            } else {
              alert("please enter valid id or password");
            }
          });
        })
        .catch((err) => {
          alert("login failed" + err.message);
        });
    }
  }

  return (
    <>
      <label>User Email</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <label>Password</label>
      <input
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <button type="button" onClick={login}>
        Login
      </button>
      <br />
      <Link to="/">Nav</Link>
    </>
  );
}

export default Login;
