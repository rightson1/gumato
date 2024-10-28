export type TRole = "farmer" | "vet";

export interface IuserValues {
  displayName?: string;
  email: string;
  uid: string;
  role: TRole;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  photoURL?: string;
}

export interface IUser extends IuserValues {}
export interface IUserIdentity {
  uid: string;
  email: string;
}
