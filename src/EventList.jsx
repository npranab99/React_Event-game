import { useState } from "react";

function EventList() {
  const [data, setData] = useState([]);

  function getList() {
    fetch("http://localhost:4000/event").then((event) => {
      event.json().then((response) => {
        setData(response);
      });
    });
  }

  return (
    <>
      <table border="1">
        <tbody>
          <tr>
            <td>Event Name</td>
            <td>Event Date</td>
          </tr>

          {data.map((e) => (
            <tr>
              <td>{e.event}</td>
              <td>{e.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={getList}>Get List</button>
    </>
  );
}

export default EventList;
