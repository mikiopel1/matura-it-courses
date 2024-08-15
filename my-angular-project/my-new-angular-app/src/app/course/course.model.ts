export class Course {
  id: number;
  title: string;
  description: string;
  price: number;
  videoUrl: string;
  allowedRoles: string[];  // Definicja właściwości allowedRoles

  constructor(id: number, title: string, description: string, price: number, videoUrl: string, allowedRoles: string[]) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.videoUrl = videoUrl;
    this.allowedRoles = allowedRoles;
  }
}
