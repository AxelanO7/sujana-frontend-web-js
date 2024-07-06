export interface AccountProps {
  id: string;
  username: string;
  password: string;
  role: string;
}

export interface UserProps {
  id: string;
  name: string;
  address: string;
  phone: string;
  id_account: number;
  account?: AccountProps;
}
