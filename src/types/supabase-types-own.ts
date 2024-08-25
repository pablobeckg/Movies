import { Tables } from "./supabase-types-gen";

export type Movie = Tables<"movies">;
export type Director = Tables<"directors">;
export type Profile = Tables<'profiles'>;

export type MoviesComplete = Movie & { directors: Director | null};

