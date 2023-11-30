export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
  };
  phone: string;
  website: string;
};
