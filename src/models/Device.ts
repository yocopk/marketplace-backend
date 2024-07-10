import { ModelUser } from "./User";

export class ModelDevice {
    primaryKey: string;
    referenceKeyUser: ModelUser["primaryKey"];
    macAddress: string;
    constructor(referenceKeyUser: ModelUser["primaryKey"]) {
      this.primaryKey = Math.random().toString(16).slice(2);
      this.referenceKeyUser = referenceKeyUser;
      this.macAddress = Math.random().toString(16).slice(2);
    }
  }
  
  