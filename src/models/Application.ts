import { JsonLanguage } from "./Language";

export interface Application {
  id: number;
  name: string;
  logo: string;
  background: string;
  description: JsonLanguage;
  link: string;
  googleplay: null | string;
}
