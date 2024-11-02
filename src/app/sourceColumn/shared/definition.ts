import { Editorial } from './editorial.enum';

export class Definition {
  id: number;
  name: string;
  editorial: Editorial;
  image: string;

  constructor(id: number, name: string, editorial: Editorial, image: string) {
    this.id = id;
    this.name = name;
    this.editorial = editorial;
    this.image = image;
  }
}