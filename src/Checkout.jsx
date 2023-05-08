import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";

function Checkout() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(startDate);
  const [maxDate, setMaxDate] = useState("");
  const [setupDate, setSetupDate] = useState(startDate);

  const [item, setItem] = useState([]);
  //const [item1, setItem1] = useState([]);
  const [location, setLocation] = useState([]);
  //const [location1, setLocation1] = useState([]);
  const [distance1, setDistance1] = useState(0);

  //const [tDistance, setTDistance] = useState(0);
  const [tPrize, setTPrize] = useState(0);
  const [tCharge, setTCharge] = useState(0);

  const [grandTotal, setGrandTotal] = useState(0);

  const params = useParams();
  var userId = params.id;
  const usenevigate = useNavigate();

  useEffect(() => {
    getItem();
  }, []);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    transportCharge();
  }, [distance1]);

  useEffect(() => {
    totalPrize();
  }, [tCharge, tPrize]);

  useEffect(() => {
    var selectedDay = startDate;
    var prevDay = new Date(selectedDay);
    prevDay.setDate(prevDay.getDate() - 1);
    //console.log(prevDay);
    setMaxDate(prevDay);
  }, [startDate]);

  function getItem() {
    fetch("http://localhost:4000/check_out").then((itemm) => {
      itemm.json().then((resp) => {
        var kill = resp
          .filter((obj) => obj.userId === userId)
          .map((obj1) => obj1.eventPrize);

        var kill2 = kill.reduce((a, b) => {
          return Number(a) + Number(b);
        });
        //console.log("kill2:", kill2);
        setTPrize(kill2);

        setItem(resp);
      });
    });
  }

  function deleteItem(id) {
    fetch(`http://localhost:4000/check_out/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        //console.warn(resp);
        getItem();
      });
    });
  }

  function getLocation() {
    fetch("http://localhost:4000/event_location/").then((loc) => {
      loc.json().then((resp) => {
        //console.log(resp.map((obj) => obj.name));
        setLocation(resp);
      });
    });
  }

  function selectLocation(e) {
    //setLocation1(e.target.value);
    setDistance1(location.find((ltn) => ltn.name === e.target.value).Distance);
  }

  function transportCharge() {
    var trCharge = distance1 * 2 * 50;
    setTCharge(trCharge);
    //console.warn(tCharge);
  }

  function totalPrize() {
    var total = tCharge + tPrize;
    setGrandTotal(total);
  }

  function pay() {
    if (distance1 === 0) {
      alert("please select a event location");
    } else {
      usenevigate(`/loggin/${userId}/check_out/payment_success`);
      setItem([]);
    }
  }

  return (
    <>
      <div className="App">
        <h2>Check Out page!!</h2>

        <div className="Container4">
          <div className="Container4">
            <table border="1">
              <tbody>
                <tr>
                  <td>Item Name</td>
                  <td>Prize</td>
                  <td>Action</td>
                </tr>
                {item
                  .filter((item1) => {
                    return userId === item1.userId;
                  })
                  .map((item2, i) => (
                    <tr key={i}>
                      <td>{item2.eventName}</td>
                      <td>{item2.eventPrize}</td>
                      <td>
                        <button onClick={() => deleteItem(item2.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <br />
          </div>

          <div className="vl"></div>

          <div>
            <div>
              <label>Event Start Date - - </label>
              <DatePicker
                showIcon
                selected={startDate}
                onChange={(e) => setStartDate(e)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
              />
              <br />
              <label>Event End Date - - </label>
              <DatePicker
                showIcon
                selected={endDate}
                onChange={(e) => setEndDate(e)}
                dateFormat="dd/MM/yyyy"
                minDate={startDate}
              />
              <br />
              <label>Setup Event Date - - </label>
              <DatePicker
                showIcon
                selected={setupDate}
                onChange={(e) => setSetupDate(e)}
                dateFormat="dd/MM/yyyy"
                minDate={maxDate}
                maxDate={endDate}
              />
              <br />
              <br />
            </div>

            <br />

            <div>
              <label>Choose A event Location: -</label>
              <br />
              <select onChange={selectLocation}>
                <option value="">Select your loction--</option>
                {location.map((item, i) => (
                  <option key={i} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
              <br />
            </div>

            <div>
              <label>Distance -- </label>
              <br />
              <input type="name" value={distance1} />
              <label>Km</label>
              <br />
              <label>Transport charge -- </label>
              <br />
              <input type="name" value={tCharge} />
              <label>Rs.</label>
              <br />
              <label>Total charge -- </label>
              <br />
              <input type="name" value={grandTotal} />
              <br />
            </div>

            <div>
              <label>Payment Method</label>
              <br />
              <select>
                <option value="UPI">UPI</option>
                <option value="Cash">Cash</option>
                <option value="Online Banking">Online Banking</option>
                <option value="Chaque">Chaque</option>
              </select>
            </div>
          </div>
        </div>

        <button onClick={pay}>Pay Now</button>
      </div>
    </>
  );
}
export default Checkout;
