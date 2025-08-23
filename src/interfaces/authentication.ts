export interface User {
  fullName: string;
  _id: string;
  phoneNumber: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isUserLoading: boolean;
}