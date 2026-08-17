import { ApiErrorCode, getErrorMessage } from './api-error.enum';

export class ApiResponse<T> {
  data: T;

  constructor(data: T) {
    this.data = data;
  }
}

export class ApiDeleteResponse<T> {
  id: T;
  message?: string;

  constructor(id: T, message?: string) {
    this.id = id;
    this.message = message;
  }
}

export class ApiErrorResponse {
  code: ApiErrorCode;
  messages: string[];

  constructor(code: ApiErrorCode, messages: string[] = []) {
    this.code = code;
    this.messages = messages.length ? messages : [getErrorMessage(code)];
  }
}
