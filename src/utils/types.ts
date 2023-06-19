export interface User {
  id: string;
  name: string;
  bio: string;
  email?: string;
  image: string;
  bannerImage: string;
  createdAt: string;
  // posts: Post[];
}

export enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

export interface IFormInput {
  displayName: string;
  gender: GenderEnum;
  bio: string;
  addressBTC: string;
  tier1?: string;
  tier2?: string;
  tier3?: string;
  tier4?: string;
  tier5?: string;
  language?: string;
  isCreator?: boolean;
  // tier: string;
}
