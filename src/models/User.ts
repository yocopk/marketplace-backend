export class ModelUser {
    primaryKey: string;
    username: string;
    email: string;
    password: string;
    constructor(username: string, email: string, password: string) {
      this.primaryKey = Math.random().toString(16).slice(2);
      this.username = username;
      this.email = email;
      this.password = password;
    }
  }