import { ModelUser } from "./User";

export class ModelAd {
    primaryKey: number;
    referenceKeyUser: ModelUser["primaryKey"];
    title: string;
    description: string;
    price: number;
    category: string;
    condition: string;
    URLimage: string;
    address: string;
    sold: number;
    createdAt: Date;
    constructor(
      referenceKeyUser: ModelUser["primaryKey"],
      title: string,
      description: string,
      price: number,
      category: string,
      condition: string,
      URLimage: string,
      address: string
    ) {
      this.primaryKey = Math.random();
      this.referenceKeyUser = referenceKeyUser;
      this.title = title;
      this.description = description;
      this.price = price;
      this.category = category;
      this.condition = condition;
      this.URLimage = URLimage;
      this.address = address;
      this.sold = 0;
      this.createdAt = new Date();
    }
  }