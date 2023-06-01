export type Institution = {
  id: number;
  name: string;
  phone?: string;
  photo?: string;
  description?: string;
  website?: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
};
