import { ModelUser } from "./User";

export class ModelAuth {
    primaryKey: string;
    referenceKeyUser: ModelUser["primaryKey"];
    token: string;
    constructor(referenceKeyUser: ModelUser["primaryKey"]) {
      this.primaryKey = Math.random().toString(16).slice(2);
      this.referenceKeyUser = referenceKeyUser;
      this.token = Math.random().toString(16).slice(2);
    }
  }