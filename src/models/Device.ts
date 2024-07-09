import { ModelUser } from "./User";

export class ModelDevice {
    primaryKey: number;
    referenceKeyUser: ModelUser["primaryKey"];
    macAddress: number;
    constructor(referenceKeyUser: ModelUser["primaryKey"]) {
      this.primaryKey = Math.random();
      this.referenceKeyUser = referenceKeyUser;
      this.macAddress = Math.random();
    }
  }
  
  