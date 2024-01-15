type UserType = {
  id: number;
  email: string;
};

type MovieType = {
  id?: number;
  img: string | undefined;
  title: string;
  year: number;
};

type ErrorType = {
  message: string;
};
