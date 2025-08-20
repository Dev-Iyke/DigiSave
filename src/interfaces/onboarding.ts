export interface SignInProps {
  email?: string;
  password?: string;
}

export interface CreateNewPasswordProps {
  newPassword?: string;
}

export interface SignUpProps extends SignInProps {
  fullName?: string;
  phoneNumber?: string;
}