import { ModelUser } from "./User";

export class ModelAuth {
    primaryKey: number;
    referenceKeyUser: ModelUser["primaryKey"];
    token: number;
    constructor(referenceKeyUser: ModelUser["primaryKey"]) {
      this.primaryKey = Math.random();
      this.referenceKeyUser = referenceKeyUser;
      this.token = Math.random();
    }
  }