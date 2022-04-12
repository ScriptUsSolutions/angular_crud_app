export interface AdminLogin {
  email: string;
  password: string;
}

export interface AdminRegister {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}
