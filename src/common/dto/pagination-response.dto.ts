export class PaginationResponseDto<T> {
  data: T[];
  totalCount: number;
  page: number;
  limit: number;
  hasMore: boolean;
  totalPages: number;

  constructor(
    data: T[],
    totalCount: number,
    page: number,
    limit: number,
  ) {
    this.data = data;
    this.totalCount = totalCount;
    this.page = page;
    this.limit = limit;
    this.hasMore = page * limit < totalCount;
    this.totalPages = Math.ceil(totalCount / limit);
  }
}
