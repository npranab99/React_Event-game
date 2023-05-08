import { useState } from "react";

function CreateEvent() {
  const [name, setName] = useState("");
  const [prize, setPrize] = useState("");

  function update(e) {
    // e.preventDefault();
    // console.log(name, prize);
    let data = { name, prize };

    if (name && prize) {
      fetch("http://localhost:4000/event", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(data),
      });
    } else alert("please fill all");
  }

  return (
    <>
      <form onSubmit={update}>
        <label>Name of the event</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Set the start Date</label>
        <input
          type="text"
          value={prize}
          onChange={(e) => setPrize(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default CreateEvent;
