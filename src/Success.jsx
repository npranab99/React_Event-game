import "./App.css";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function Success() {
  const [event, setEvent] = useState([]);

  const [eventName, setEventName] = useState("");
  const [eventPrize, setEventPrize] = useState("");
  //const [eventId, setEventId] = useState(null);

  const usenevigate = useNavigate();

  const params = useParams();
  var userId = params.id;
  //console.warn(userId);
  useEffect(() => {
    fetch("http://localhost:4000/event").then((event) => {
      event.json().then((resp) => {
        setEvent(resp);
      });
    });
  }, []);

  function addToCart(id) {
    var itemToBeAdded = event.find((item) => item.id === id);
    //console.warn(itemToBeAdded);
    setEventName(itemToBeAdded.name);
    setEventPrize(itemToBeAdded.prize);
    //setEventId(itemToBeAdded.id);
    var itemDetails = { eventName, eventPrize, userId };
    //console.log(itemDetails);
    //fetch(`http://localhost:4000/user/${userId}`, {
    fetch(`http://localhost:4000/check_out`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemDetails),
    });
  }

  function checkOut() {
    usenevigate(`/loggin/${userId}/check_out`);
  }

  return (
    <div className="App">
      <h2> Login Success!!</h2>
      <h3>Hello {userId} </h3>

      <table border="1">
        <thead>Event List</thead>
        <tbody>
          <tr>
            <td>ID</td>
            <td>Event Name</td>
            <td>Prize</td>
            <td>Action</td>
          </tr>

          {event.map((item, i) => (
            <tr key={i}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.prize}</td>
              <td>
                <button onClick={() => addToCart(item.id)}>Add To Cart</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h3>Item Added To The Cart</h3>
        <table>
          <tbody>
            <tr>
              <td>Cart Item</td>
              <br />
              <td>Item Prize</td>
            </tr>
            <tr>
              <td>
                <p> {eventName}</p>
              </td>
              <td>
                <p>{eventPrize} </p>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <button onClick={checkOut}>Checkout</button>
      </div>
      <br />

      <Link to="/">
        <button>Log Out</button>
      </Link>
    </div>
  );
}

export default Success;
