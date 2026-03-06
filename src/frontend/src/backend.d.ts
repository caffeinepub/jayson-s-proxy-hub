import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Movie {
    id: bigint;
    url: string;
    title: string;
    description: string;
    genre: string;
}
export interface Game {
    id: bigint;
    url: string;
    name: string;
    description: string;
    category: string;
}
export interface Meme {
    id: bigint;
    name: string;
    audioUrl: string;
    emoji: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addGame(game: Game): Promise<void>;
    addMeme(meme: Meme): Promise<void>;
    addMovie(movie: Movie): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getGames(): Promise<Array<Game>>;
    getMemes(): Promise<Array<Meme>>;
    getMovies(): Promise<Array<Movie>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setPassword(oldPassword: string, newPassword: string): Promise<boolean>;
    verifyPassword(passwordAttempt: string): Promise<boolean>;
}
