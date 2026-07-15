import { User } from "firebase/auth";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login(email: string, password: string): Promise<unknown>;
  register(name: string, email: string, password: string): Promise<unknown>;
  googleSignIn(): Promise<unknown>;
  logout(): Promise<void>;
}
