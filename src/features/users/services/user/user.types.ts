export interface UpdateUserPayload {
  userId: string;
  firstname?: string;
  lastname?: string;
}

export interface ChangePasswordPayload {
  userId: string;
  currentPassword: string;
  oldPassword: string;
  newPassword: string;
}

export interface CreateUserPayload {
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
}
