import {ErrorResponse} from '../models/errorResponse';

export default class ResponseUtil {
  static toResponse(error: any) {
    return error as ErrorResponse;
  }
}
