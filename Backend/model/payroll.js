import mongoose from "mongoose";

const PayrollSchema = new mongoose.Schema({
  employeeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  month: Number,
  year: Number,

  totalWorkingDays: Number,
  presentDays: Number,
  lopDays: Number,
  overtimeHours: Number,

  basicSalary: Number,
  lopAmount: Number,
  overtimePay: Number,
  netPay: Number,

  approved: { type: Boolean, default: false }
});

export default mongoose.model("Payroll", PayrollSchema);
