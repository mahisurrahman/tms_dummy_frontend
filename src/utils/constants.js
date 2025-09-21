export const filterOptions = [
  "All", "Project: DNCRP", "Project: DOLE", "Project: MOL", "Project: PRET-A-MED",
  "Priority: High", "Priority: Medium", "Priority: Low",
  "Team: DEVELOPER", "Team: HR", "Team: ADMIN",
  "Status: Present", "Status: Absent"
];

export const projectOptions = ["All", "DNCRP", "DOLE", "MOL", "PRET-A-MED"];
export const attendanceOptions = ["All", "Present", "Absent"];
export const roleOptions = ["All", "DEVELOPER", "HR", "ADMIN"];
export const priorityOptions = ["All", "High", "Medium", "Low"];
export const statusOptions = [
  "All", "completed", "ongoing", "pending", "scheduled", "due", "cancelled"
];

export const sections = [
  "pending", "review", "ongoing", "completed", "cancelled", "scheduled", "finished"
];

export const sectionTitles = {
  pending: "Pending",
  review: "On Review",
  ongoing: "On Going",
  completed: "Completed",
  cancelled: "Cancelled",
  scheduled: "Re-scheduled",
  finished: "Finished",
};