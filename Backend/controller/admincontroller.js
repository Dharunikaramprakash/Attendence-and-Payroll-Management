import User from "../model/User.js";
import Attendence from "../model/attendence.js"
import Payroll from "../model/payroll.js"
import bcrypt from 'bcrypt'

export const createEmployee = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check duplicate email
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    let count = await User.countDocuments();
    let employeeID;
    let exists = true;

    while (exists) {
      employeeID = "EMP" + String(count + 1);
      const existingUser = await User.findOne({ employeeID });

      if (!existingUser) {
        exists = false;
      } else {
        count++;
      }
    }

    const hashpw = await bcrypt.hash(password, 10);

    const employee = await User.create({
      name,
      email,
      password: hashpw,
      role,
      employeeID,
    });

    res.status(201).json(employee);

  } catch (error) {
    console.log("CREATE EMPLOYEE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


export const updateEmployee = async (req, res) => {
     
   const updateData = { ...req.body };

    // Hash password only if provided
    if (req.body.password) {
      updateData.password = await bcrypt.hash (String(req.body.password),10);
    }

    const employee = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
  res.json(employee);
};

export const viewAttendance = async (req, res) => {
  const attendance = await Attendence.find().populate("employeeID");
  res.json(attendance);
};

export const approvePayroll = async (req, res) => {
  const payroll = await Payroll.findByIdAndUpdate(
    req.params.id,
    { approved: true },
    { new: true }
  );
  res.json(payroll);
};
export const getAllEmployees = async (req, res) => {
  const employees = await User.find({role:"employee"});
  res.json(employees);
};
export const getAllPayrolls = async (req, res) => {
  const payrolls = await Payroll.find().populate("employeeID");
  res.json(payrolls);
};

export const getEmployeeAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Attendence.find({ employeeID: id })
      .populate("employeeID", "name email");

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch employee attendance" });
  }
};

export const getEmployeePayroll = async (req, res) => {
  try {
    const { id } = req.params;

    const payroll = await Payroll.find({ employeeID: id })
      .populate("employeeID", "name email");

    res.json(payroll);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch employee payroll" });
  }
};