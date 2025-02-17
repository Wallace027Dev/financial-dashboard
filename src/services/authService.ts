import IUser from "@/interfaces/IUser";

const users: any = [];

async function authService(data: Partial<IUser>) {
  try {
    const newUser = {
      id: Math.round(1000 * Math.random()),
      name: data.name,
      email: data.email,
      password: data.password,
      createdAt: new Date(Date.now())
    };
    
    users.push(newUser);
    console.log(users);

    return newUser;
  } catch (error: any) {
    return error.message;
  }
}

export default authService;
