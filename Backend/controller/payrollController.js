import Payroll from "../model/payroll.js";
import Attendence from "../model/attendence.js";

export const generatePayroll = async (req, res) => {
  try {
    const { employeeID, month, year } = req.body;

    const monthnum = parseInt(month);
    const yearnum = parseInt(year);

    const startDate = new Date(yearnum, monthnum - 1, 1);
    const endDate = new Date(yearnum, monthnum, 0);

    const attendance = await Attendence.find({
      employeeID,
      date: { $gte: startDate, $lte: endDate }
    });

    const presentDays = attendance.length;
    const totalWorkingDays = 26;
    const lopDays = totalWorkingDays - presentDays;
    const lopAmount = lopDays * 1500;
    const netPay = Math.max(0, 45000 - lopAmount);

    const payroll = await Payroll.create({
      employeeID,
      month,
      year,
      totalWorkingDays,
      presentDays,
      lopDays,
      basicSalary: 45000,
      lopAmount,
      netPay
    });

    res.json(payroll);
  } catch (error) {
    res.status(500).json({ message: "Failed to generate payroll", error: error.message });
  }
};

export const myPayroll = async (req, res) => {
  try {
    const payroll = await Payroll.find({ employeeID: req.user.id });
    res.json(payroll);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch payroll", error: error.message });
  }
};
