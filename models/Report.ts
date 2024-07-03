import { ModelAd } from "./Ad";
import { ModelUser } from "./User";

export class ModelReport {
    primaryKey: number;
    referenceKeyAd: ModelAd["primaryKey"];
    referenceKeyUser: ModelUser["primaryKey"];
    title: string;
    description: string;
    condition: string;
    date: Date;
    constructor(referenceKeyAd: ModelAd["primaryKey"], referenceKeyUser: ModelUser["primaryKey"], title: string, description: string, condition: string) {
      this.primaryKey = Math.random();
      this.referenceKeyAd = referenceKeyAd;
      this.referenceKeyUser = referenceKeyUser;
      this.title = title;
      this.description = description;
      this.date = new Date();
      this.condition = condition;
    }
  }