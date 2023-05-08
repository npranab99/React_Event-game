import { useState } from "react";
import { Link } from "react-router-dom";

function Registration() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");

  //let url = "http://localhost:4000/";

  function saveUser(e) {
    e.preventDefault();
    console.log({ fname, lname, id, pass });
    let data = { fname, lname, id, pass };

    if (fname && lname && id && pass) {
      fetch("http://localhost:4000/user", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setFname("");
      setId("");
      setPass("");
      setLname("");
    } else {
      alert("Fill out all the field");
    }
  }

  return (
    <>
      <form onSubmit={saveUser}>
        <label> First Name</label>
        <input
          type="text"
          value={fname}
          onChange={(e) => {
            setFname(e.target.value);
          }}
          name="name"
        />
        <br></br>
        <label> Last Name</label>
        <input
          type="text"
          value={lname}
          onChange={(e) => {
            setLname(e.target.value);
          }}
        />
        <br></br>
        <label> Email</label>
        <input
          type="text"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <br></br>
        <label> PassWord</label>
        <input
          type="text"
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />
        <br></br>
        <button type="submit">Register</button>
      </form>

      <Link to="/">Go To Nav</Link>
    </>
  );
}

export default Registration;
