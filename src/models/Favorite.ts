import { ModelAd } from "./Ad";
import { ModelUser } from "./User";

export class ModelFavorite {
    primaryKey: string;
    referenceKeyAd: ModelAd["primaryKey"];
    referenceKeyUser: ModelUser["primaryKey"];
    constructor(referenceKeyAd: ModelAd["primaryKey"], referenceKeyUser: ModelUser["primaryKey"]) {
      this.primaryKey = Math.random().toString(16).slice(2);
      this.referenceKeyAd = referenceKeyAd;
      this.referenceKeyUser = referenceKeyUser;
    }
  }