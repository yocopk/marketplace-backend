import { ModelAd } from "./Ad";
import { ModelUser } from "./User";

export class ModelReport {
    primaryKey: string;
    referenceKeyAd: ModelAd["primaryKey"];
    referenceKeyUser: ModelUser["primaryKey"];
    title: string;
    description: string;
    condition: string;
    date: Date;
    constructor(referenceKeyAd: ModelAd["primaryKey"], referenceKeyUser: ModelUser["primaryKey"], title: string, description: string, condition: string) {
      this.primaryKey = Math.random().toString(16).slice(2);
      this.referenceKeyAd = referenceKeyAd;
      this.referenceKeyUser = referenceKeyUser;
      this.title = title;
      this.description = description;
      this.date = new Date();
      this.condition = condition;
    }
  }