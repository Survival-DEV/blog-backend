export interface Contact {
  name: string;
  url: string;
  email: string;
}
export interface SwaggerConfig {
  title: string;
  description: string;
  version: string;
  tags: string[];
  contact: Contact;
}
