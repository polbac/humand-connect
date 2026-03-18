export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string | null;
  employeeInternalId: string;
  nickname: string | null;
  phoneNumber: string | null;
  birthdate: string | null;
  hiringDate: string | null;
  status: 'ACTIVE' | 'UNCLAIMED' | 'DEACTIVATED';
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  fields: unknown[];
  relationships: UserRelationship[];
  segmentations: UserSegmentation[];
  workdays: string[];
}

export interface UserRelationship {
  employeeInternalId: string;
  name: 'BOSS' | 'SUBORDINATE';
}

export interface UserSegmentation {
  group: string;
  item: string;
}

export interface UsersListResponse {
  count: number;
  users: User[];
}

export interface CreateUserInput {
  firstName: string;
  lastName: string;
  employeeInternalId: string;
  password: string;
  email?: string;
  nickname?: string;
  phoneNumber?: string;
  birthdate?: string;
  hiringDate?: string;
}

export interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  nickname?: string;
  phoneNumber?: string;
  birthdate?: string;
  hiringDate?: string;
}
