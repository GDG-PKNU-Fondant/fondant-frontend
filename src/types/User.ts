export interface UserResponse {
  code: string;
  message: string;
  content: UserInfo;
}

export interface UserInfo {
  name: string;
  phoneNumber: string;
  verifiedPhone: boolean;
  email: string;
  birth: string;
  nickname: string;
  profileUrl: string;
  gender: string;
}
