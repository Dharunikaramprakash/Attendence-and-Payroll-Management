// // src/pages/employee/MyPayroll.jsx
import { useEffect, useState } from "react";
import API from "../../api/axios";

function MyPayroll() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPayroll = async () => {
      try {
        const res = await API.get("/payroll/my", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPayroll();
  }, [token]);

  return (
    <div>
      <h3>My Payroll</h3>
      {data.length === 0 ? <p>No payroll data found.</p> :
        data.map(pay => (
          <div key={pay._id}>
            Month: {pay.month}, Net Pay: ₹{pay.netPay}, {pay.approved ? "Approved" : "Pending"}
          </div>
        ))
      }
    </div>
  );
}

export default MyPayroll;
