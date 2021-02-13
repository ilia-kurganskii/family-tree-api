// increase the id after adding new code
export const MAX_APPLICATION_ERROR_ID = 7;
export enum ApplicationErrorCode {
  // USER
  AUTH_LOGIN_INCORRECT = 1,
  AUTH_PASSWORD_INCORRECT = 2,
  AUTH_TOKEN_INVALID = 4,
  USER_ALREADY_EXISTS = 3,
  USER_PASSWORD_DOES_NOT_MATCH = 5,

  //NODE
  NODE_NOT_FOUND = 6,
  NODE_IN_DIFF_TREE_EXCEPTION = 7,
}
