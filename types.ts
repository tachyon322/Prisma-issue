interface UserProfileType {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
}

interface PagePropsType {
  params: {
    user: string;
  };
}

interface UserSession {
  user: {
    id: string;
    name: string;
    image: string;
  } | null; // user может быть null
}
