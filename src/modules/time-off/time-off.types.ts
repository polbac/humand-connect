export interface TimeOffBalance {
  amountRequested: number;
  currentBalance: number;
  cycle: {
    fromDate: string;
    toDate: string;
    title: string;
  };
  policy: TimeOffPolicy;
  policyType: TimeOffPolicyType;
  user: TimeOffUser;
}

export interface TimeOffPolicy {
  accumulationMoment: string;
  allowHalfDayRequests: boolean;
  allowRequestOverlapping: boolean;
  argentinianLawCompliance: boolean;
  allowanceAmount: number;
  allowanceProrationFrequency: string;
  allowanceStart: string;
  allowanceType: string;
  approvalRequired: boolean;
  approvalUsers: unknown;
  attachmentInstructions: string | null;
  attachmentRequirement: string;
  balanceViewPrecision: string;
  countingMethod: string;
  description: string;
  descriptionRequired: boolean;
  dismissalApportionmentMethod: string;
  hiringApportionmentMethod: string;
  id: number;
  maximumAmountPerRequest: number;
  maximumBalance: number | null;
  maximumRemnant: number | null;
  minimumAdvanceDays: number;
  minimumAmountPerRequest: number;
  minimumBalance: number | null;
  name: string;
  newHiresRequestsBanUnit: string | null;
  newHiresRequestsBanValue: number | null;
  noRetroactiveRequests: boolean;
  onlyAdminRequests: boolean;
  noFutureRequests: boolean;
  peopleAmount: number;
  policyType: TimeOffPolicyType;
  reminderDaysInterval: number | null;
  remnantExpirationUnit: string | null;
  remnantExpirationValue: number | null;
  requiredPolicyTypeId: number | null;
  seniorityCalculationDate: string | null;
  yearsOfService: unknown;
  fixedHoursPerDay: number | null;
  minimumTimeFraction: number;
}

export interface TimeOffPolicyType {
  icon: string;
  id: number;
  name: string;
  peopleAmount: number | null;
  policiesAmount: number | null;
  unit: string;
  activityType: string;
  visibility: string;
}

export interface TimeOffUser {
  deleted: boolean;
  email: string;
  employeeInternalId: string;
  firstName: string;
  hiringDate: string | null;
  id: number;
  instanceId: number;
  lastName: string;
  profilePicture: string | null;
  workdays: string | null;
}

export interface TimeOffRequest {
  amountRequested: number;
  amountInTime: number;
  amountInMoney: number;
  creator: unknown;
  description: string | null;
  from: {
    consumptionType: string;
    date: string;
    time: string | null;
  };
  id: number;
  issuer: TimeOffUser;
  policyType: TimeOffPolicyType;
  rejectionReason: string | null;
  requestPolicyId: number;
  status: string;
  to: {
    consumptionType: string;
    date: string;
    time: string | null;
  };
  updatedAt: string;
  userId: number;
}

export interface TimeOffBalancesResponse {
  count: number;
  items: TimeOffBalance[];
  limit: number;
  page: number;
  totalPages: number;
}

export interface TimeOffRequestsResponse {
  count: number;
  items: TimeOffRequest[];
  limit: number;
  page: number;
  totalPages: number;
}
