export class ModelUser {
    primaryKey: number;
    username: string;
    email: string;
    password: string;
    constructor(username: string, email: string, password: string) {
      this.primaryKey = Math.random();
      this.username = username;
      this.email = email;
      this.password = password;
    }
  }