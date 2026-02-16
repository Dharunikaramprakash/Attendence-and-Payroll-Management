
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
    <div>
      <h3>Employee Payroll</h3>

      <button onClick={generatePayroll}>
  Generate Payroll
</button>

      {payrolls.map(pay => (
        <div key={pay._id}>
          Net Pay: ₹{pay.netPay} -
          {pay.approved ? "Approved" : "Pending"}

          {!pay.approved && (
            <button onClick={() => approve(pay._id)}>
              Approve
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default PayrollManagement;
