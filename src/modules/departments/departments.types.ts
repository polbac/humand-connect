export interface Department {
  id: number;
  name: string;
  description: string | null;
  parentId: number | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  memberCount: number;
}

export interface DepartmentMember {
  id: number;
  employeeInternalId: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string | null;
  workdays: string | null;
}

export interface PaginatedDepartmentList {
  count: number;
  items: Department[];
  limit: number;
  page: number;
  totalPages: number;
}

export interface PaginatedDepartmentMemberList {
  count: number;
  items: DepartmentMember[];
  limit: number;
  page: number;
  totalPages: number;
}