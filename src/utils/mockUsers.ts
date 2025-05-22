export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
  lastLogin: string;
  status: "Active" | "Inactive" | "Suspended";
}

export const mockUsers: User[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: "Admin",
    lastLogin: "2023-07-10",
    status: "Active",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    role: "Editor",
    lastLogin: "2023-07-12",
    status: "Active",
  },
  {
    id: 3,
    firstName: "Robert",
    lastName: "Johnson",
    email: "robert.j@example.com",
    role: "Viewer",
    lastLogin: "2023-06-28",
    status: "Active",
  },
  {
    id: 4,
    firstName: "Emily",
    lastName: "Williams",
    email: "emily.w@example.com",
    role: "Editor",
    lastLogin: "2023-05-15",
    status: "Inactive",
  },
  {
    id: 5,
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.b@example.com",
    role: "Admin",
    lastLogin: "2023-07-15",
    status: "Active",
  },
  // Add more users as needed
];
