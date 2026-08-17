export enum ApiErrorCode {
    
    NOT_AUTHENTICATED = 'NOT_AUTHENTICATED',
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN',
  
    BAD_REQUEST = 'BAD_REQUEST',
    INVALID_PARAMETERS = 'INVALID_PARAMETERS',
  
    NOT_FOUND = 'NOT_FOUND',
    CONFLICT = 'CONFLICT',
  
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    REQUIRED_FIELD_MISSING = 'REQUIRED_FIELD_MISSING'
  }
  
  const errorMessages = {
    [ApiErrorCode.NOT_AUTHENTICATED]: 'Not authenticated',
    [ApiErrorCode.UNAUTHORIZED]: 'You do not have permission to access this resource',
    [ApiErrorCode.BAD_REQUEST]: 'The request is malformed or invalid',
    [ApiErrorCode.INVALID_PARAMETERS]: 'One or more parameters are invalid',
    [ApiErrorCode.NOT_FOUND]: 'The requested resource was not found',
    [ApiErrorCode.CONFLICT]: 'The request could not be completed due to a conflict',
    [ApiErrorCode.INTERNAL_SERVER_ERROR]: 'An unexpected error occurred',
    [ApiErrorCode.SERVICE_UNAVAILABLE]: 'The service is currently unavailable',
    [ApiErrorCode.VALIDATION_ERROR]: 'Validation failed for one or more fields',
    [ApiErrorCode.REQUIRED_FIELD_MISSING]: 'A required field is missing',
  };
  
  export const getErrorMessage = (code: ApiErrorCode): string => errorMessages[code];
  