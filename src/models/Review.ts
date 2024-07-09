import { ModelAd } from "./Ad";
import { ModelUser } from "./User";

export class ModelReview {
    primaryKey: number;
    referenceKeyAd: ModelAd["primaryKey"];
    referenceKeyUser: ModelUser["primaryKey"];
    title: string;
    description: string;
    rating: number;
    date: Date;
    constructor(referenceKeyAd: ModelAd["primaryKey"], referenceKeyUser: ModelUser["primaryKey"], title: string, description: string, rating: number) {
      this.primaryKey = Math.random();
      this.referenceKeyAd = referenceKeyAd;
      this.referenceKeyUser = referenceKeyUser;
      this.title = title;
      this.description = description;
      this.rating = rating;
      this.date = new Date();
    }
  }