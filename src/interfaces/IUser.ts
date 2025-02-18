interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export default IUser;
