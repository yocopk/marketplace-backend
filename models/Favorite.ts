import { ModelAd } from "./Ad";
import { ModelUser } from "./User";

export class ModelFavorite {
    primaryKey: number;
    referenceKeyAd: ModelAd["primaryKey"];
    referenceKeyUser: ModelUser["primaryKey"];
    constructor(referenceKeyAd: ModelAd["primaryKey"], referenceKeyUser: ModelUser["primaryKey"]) {
      this.primaryKey = Math.random();
      this.referenceKeyAd = referenceKeyAd;
      this.referenceKeyUser = referenceKeyUser;
    }
  }