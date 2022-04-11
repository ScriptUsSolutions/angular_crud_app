export interface Login {
  email: string;
  password: string;
}

export interface SignupUser {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}
