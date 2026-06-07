export const plans = [
  { id: "p1", name: "Day Pass", duration: "1 Day", price: 15, description: "Full access for a single day", color: "bg-blue-500" },
  { id: "p2", name: "Monthly", duration: "1 Month", price: 60, description: "Standard monthly recurring access", color: "bg-emerald-500" },
  { id: "p3", name: "Quarterly", duration: "3 Months", price: 150, description: "Save $30 with quarterly billing", color: "bg-indigo-500" },
  { id: "p4", name: "Annual", duration: "12 Months", price: 500, description: "Best value, full year access", color: "bg-purple-500" },
  { id: "p5", name: "Premium VIP", duration: "1 Month", price: 100, description: "Includes personal training session and towel service", color: "bg-amber-500" },
];

export const members = [
  { id: "m1", name: "Sarah Connor", phone: "555-0101", email: "sarah@example.com", age: 34, gender: "Female", address: "123 Tech Ln", plan: "Annual", startDate: "2025-06-01", expiryDate: "2026-06-01", status: "active", notes: "" },
  { id: "m2", name: "John Smith", phone: "555-0102", email: "john@example.com", age: 28, gender: "Male", address: "456 Oak St", plan: "Monthly", startDate: "2026-05-15", expiryDate: "2026-06-15", status: "active", notes: "" },
  { id: "m3", name: "Mike Johnson", phone: "555-0103", email: "mike@example.com", age: 45, gender: "Male", address: "789 Pine Rd", plan: "Monthly", startDate: "2026-05-04", expiryDate: "2026-06-04", status: "expiring_soon", notes: "Expiring in 2 days" },
  { id: "m4", name: "Emily Davis", phone: "555-0104", email: "emily@example.com", age: 22, gender: "Female", address: "321 Elm St", plan: "Quarterly", startDate: "2026-01-10", expiryDate: "2026-04-10", status: "expired", notes: "Called to renew" },
  { id: "m5", name: "Chris Evans", phone: "555-0105", email: "chris@example.com", age: 31, gender: "Male", address: "654 Birch Blvd", plan: "Annual", startDate: "2025-10-01", expiryDate: "2026-10-01", status: "active", notes: "" },
  { id: "m6", name: "Jessica Taylor", phone: "555-0106", email: "jessica@example.com", age: 29, gender: "Female", address: "987 Cedar Ct", plan: "Monthly", startDate: "2026-05-05", expiryDate: "2026-06-05", status: "expiring_soon", notes: "" },
  { id: "m7", name: "David Wilson", phone: "555-0107", email: "david@example.com", age: 50, gender: "Male", address: "135 Maple Dr", plan: "Premium VIP", startDate: "2026-05-20", expiryDate: "2026-06-20", status: "active", notes: "" },
  { id: "m8", name: "Laura Moore", phone: "555-0108", email: "laura@example.com", age: 26, gender: "Female", address: "246 Ash Way", plan: "Quarterly", startDate: "2026-03-01", expiryDate: "2026-06-01", status: "expired", notes: "" },
  { id: "m9", name: "Daniel Anderson", phone: "555-0109", email: "daniel@example.com", age: 38, gender: "Male", address: "357 Walnut Ave", plan: "Monthly", startDate: "2026-05-10", expiryDate: "2026-06-10", status: "active", notes: "" },
  { id: "m10", name: "Rachel Thomas", phone: "555-0110", email: "rachel@example.com", age: 33, gender: "Female", address: "468 Chestnut Pl", plan: "Annual", startDate: "2025-08-15", expiryDate: "2026-08-15", status: "active", notes: "" },
  { id: "m11", name: "James Jackson", phone: "555-0111", email: "james@example.com", age: 42, gender: "Male", address: "579 Spruce Cir", plan: "Day Pass", startDate: "2026-06-01", expiryDate: "2026-06-02", status: "active", notes: "" },
  { id: "m12", name: "Linda White", phone: "555-0112", email: "linda@example.com", age: 48, gender: "Female", address: "680 Willow Trl", plan: "Monthly", startDate: "2026-05-03", expiryDate: "2026-06-03", status: "expiring_soon", notes: "" },
  { id: "m13", name: "Robert Harris", phone: "555-0113", email: "robert@example.com", age: 27, gender: "Male", address: "791 Cherry Ln", plan: "Quarterly", startDate: "2026-02-15", expiryDate: "2026-05-15", status: "expired", notes: "" },
  { id: "m14", name: "Patricia Martin", phone: "555-0114", email: "patricia@example.com", age: 36, gender: "Female", address: "802 Hickory Pkwy", plan: "Annual", startDate: "2025-11-20", expiryDate: "2026-11-20", status: "active", notes: "" },
  { id: "m15", name: "William Thompson", phone: "555-0115", email: "william@example.com", age: 39, gender: "Male", address: "913 Poplar St", plan: "Monthly", startDate: "2026-05-25", expiryDate: "2026-06-25", status: "active", notes: "" },
  { id: "m16", name: "Jennifer Garcia", phone: "555-0116", email: "jennifer@example.com", age: 24, gender: "Female", address: "024 Cypress Rd", plan: "Premium VIP", startDate: "2026-05-01", expiryDate: "2026-06-01", status: "expired", notes: "" },
  { id: "m17", name: "Richard Martinez", phone: "555-0117", email: "richard@example.com", age: 41, gender: "Male", address: "135 Sycamore Dr", plan: "Monthly", startDate: "2026-05-04", expiryDate: "2026-06-04", status: "expiring_soon", notes: "" },
  { id: "m18", name: "Elizabeth Robinson", phone: "555-0118", email: "elizabeth@example.com", age: 52, gender: "Female", address: "246 Magnolia Ave", plan: "Quarterly", startDate: "2026-04-01", expiryDate: "2026-07-01", status: "active", notes: "" },
  { id: "m19", name: "Joseph Clark", phone: "555-0119", email: "joseph@example.com", age: 30, gender: "Male", address: "357 Redwood Ct", plan: "Annual", startDate: "2025-07-10", expiryDate: "2026-07-10", status: "active", notes: "" },
  { id: "m20", name: "Susan Rodriguez", phone: "555-0120", email: "susan@example.com", age: 35, gender: "Female", address: "468 Sequoia Pl", plan: "Monthly", startDate: "2026-05-28", expiryDate: "2026-06-28", status: "active", notes: "" },
  { id: "m21", name: "Thomas Lewis", phone: "555-0121", email: "thomas@example.com", age: 46, gender: "Male", address: "579 Juniper Cir", plan: "Day Pass", startDate: "2026-06-02", expiryDate: "2026-06-03", status: "active", notes: "" },
  { id: "m22", name: "Margaret Lee", phone: "555-0122", email: "margaret@example.com", age: 29, gender: "Female", address: "680 Fir Trl", plan: "Monthly", startDate: "2026-05-02", expiryDate: "2026-06-02", status: "expiring_soon", notes: "" },
  { id: "m23", name: "Charles Walker", phone: "555-0123", email: "charles@example.com", age: 37, gender: "Male", address: "791 Beech Ln", plan: "Quarterly", startDate: "2025-12-01", expiryDate: "2026-03-01", status: "expired", notes: "" },
  { id: "m24", name: "Dorothy Hall", phone: "555-0124", email: "dorothy@example.com", age: 44, gender: "Female", address: "802 Dogwood Pkwy", plan: "Annual", startDate: "2025-09-05", expiryDate: "2026-09-05", status: "active", notes: "" },
  { id: "m25", name: "Christopher Allen", phone: "555-0125", email: "christopher@example.com", age: 32, gender: "Male", address: "913 Hawthorn St", plan: "Monthly", startDate: "2026-05-18", expiryDate: "2026-06-18", status: "active", notes: "" }
];

export const revenueData = [
  {
    "month": "2026-05",
    "revenue": 4000,
    "members": 2
  },
]
