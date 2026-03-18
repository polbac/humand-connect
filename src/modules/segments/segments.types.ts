export interface Segment {
  id: number;
  name: string;
  description: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  memberCount: number;
}

export interface PaginatedSegmentList {
  count: number;
  items: Segment[];
  limit: number;
  page: number;
  totalPages: number;
}

export interface CreateSegmentDto {
  name: string;
  description?: string;
}

export interface UpdateSegmentDto {
  name?: string;
  description?: string;
}