import { ModelUser } from "./User";

export class ModelAd {
    primaryKey: string;
    referenceKeyUser: ModelUser["primaryKey"];
    title: string;
    description: string;
    price: number;
    category: string;
    condition: string;
    URLimage: string;
    address: string;
    sold: string;
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
      this.primaryKey = Math.random().toString(16).slice(2);
      this.referenceKeyUser = referenceKeyUser;
      this.title = title;
      this.description = description;
      this.price = price;
      this.category = category;
      this.condition = condition;
      this.URLimage = URLimage;
      this.address = address;
      this.sold = "";
      this.createdAt = new Date();
    }
  }