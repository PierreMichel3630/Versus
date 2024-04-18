import { JsonLanguage } from "./Language";

export interface Value {
  id: number;
  name: JsonLanguage;
  image: null;
  win: number;
  lose: number;
  dontknow: number;
}

export interface ValueUpdate {
  id: number;
  win: boolean;
  lose: boolean;
  dontknow: boolean;
}
