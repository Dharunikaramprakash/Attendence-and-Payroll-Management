import Attendence from '../model/attendence.js'



export const loginAttendance = async (req, res) => {
  const attendance = await Attendence.create({
    employeeID: req.user.id,
    date: new Date(),
    loginTime: new Date()
  });

  res.json(attendance);
};

export const logoutAttendance = async (req, res) => {
  try {
    const objectId = req.user.id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const attendance = await Attendence.findOne({
      employeeID: objectId,
      date: { $gte: today, $lt: tomorrow },
      loginTime: { $exists: true },
      logoutTime: null
    });

    if (!attendance) {
      return res.status(404).json({ message: "No active attendance record found for today" });
    }

    attendance.logoutTime = new Date();
    attendance.workingHours = (attendance.logoutTime - attendance.loginTime) / (1000 * 60 * 60);

    await attendance.save();

    res.json({ message: "Logout recorded successfully", attendance });

  } catch (error) {
    res.status(500).json({ message: "Failed to record logout", error: error.message });
  }
};

export const myMonthlyAttendance = async (req, res) => {
  try {
    const { month, year } = req.query;
    const monthnum = parseInt(month);
    const yearnum = parseInt(year);

    const startDate = new Date(yearnum, monthnum - 1, 1);
    const endDate = new Date(yearnum, monthnum, 0);

    const data = await Attendence.find({
      employeeID: req.user.id,
      date: { $gte: startDate, $lte: endDate }
    });

    res.json(data);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch attendance", error: error.message });
  }
};
