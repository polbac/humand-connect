export interface JobPosition {
  id: number;
  name: string;
  description: string | null;
  parentId: number | null;
  departmentId: number | null;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedJobPositionList {
  count: number;
  items: JobPosition[];
  limit: number;
  page: number;
  totalPages: number;
}

export interface JobPositionParams {
  limit?: number;
  page?: number;
}

export interface JobPositionByIdParams {
  id: number;
}

export interface JobPositionMember {
  id: number;
  userId: number;
  jobPositionId: number;
  employeeInternalId: string;
  firstName: string;
  lastName: string;
  email: string | null;
  status: string;
  createdAt: string;
}

export interface PaginatedJobPositionMemberList {
  count: number;
  items: JobPositionMember[];
  limit: number;
  page: number;
  totalPages: number;
}

export interface JobPositionMembersParams {
  id: number;
  limit?: number;
  page?: number;
}

export interface UpdateJobPosition {
  name?: string;
  description?: string | null;
  parentId?: number | null;
  departmentId?: number | null;
  status?: 'ACTIVE' | 'INACTIVE';
}

export interface JobPositionUpdateParams {
  id: number;
  data: UpdateJobPosition;
}
