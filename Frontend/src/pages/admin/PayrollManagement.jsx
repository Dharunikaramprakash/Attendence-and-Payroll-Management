
import { useEffect, useState } from "react";
import API from "../../api/axios";
import { useParams } from "react-router-dom";

function PayrollManagement() {
  const { id } = useParams();
  const [payrolls, setPayrolls] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    API.get(`/admin/payroll/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setPayrolls(res.data));
  }, [id]);

  const approve = async (payrollId) => {
    const token = localStorage.getItem("token");

    await API.put(`/admin/payroll/${payrollId}/approve`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });

    alert("Approved");
  };

  const generatePayroll = async () => {
  const token = localStorage.getItem("token");

  const month = prompt("Enter month (1-12)");
  const year = prompt("Enter year (2026)");

  await API.post("/payroll/generate", {
    employeeID: id,
    month,
    year
  }, {
    headers: { Authorization: `Bearer ${token}` }
  });

  alert("Payroll Generated");

  // Refresh payroll list
  const res = await API.get(`/admin/payroll/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  setPayrolls(res.data);
};


  return (
  <div className="employee-container">
    <div className="payroll-header">
      <h2>Employee Payroll</h2>
      <button className="generate-btn" onClick={generatePayroll}>
        Generate Payroll
      </button>
    </div>

    {payrolls.length === 0 ? (
      <p>No payroll records found.</p>
    ) : (
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Net Pay</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {payrolls.map((pay) => (
            <tr key={pay._id}>
              <td>{pay.month} / {pay.year}</td>
              <td>₹{pay.netPay}</td>

              <td>
                <span
                  className={
                    pay.approved ? "status approved" : "status pending"
                  }
                >
                  {pay.approved ? "Approved" : "Pending"}
                </span>
              </td>

              <td>
                {!pay.approved ? (
                  <button
                    className="approve-btn"
                    onClick={() => approve(pay._id)}
                  >
                    Approve
                  </button>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);
}

export default PayrollManagement;
