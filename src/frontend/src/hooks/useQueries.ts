import { useQuery } from "@tanstack/react-query";
import type { Game, Meme, Movie } from "../backend.d";
import { useActor } from "./useActor";

export function useGetGames() {
  const { actor, isFetching } = useActor();
  return useQuery<Game[]>({
    queryKey: ["games"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGames();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetMovies() {
  const { actor, isFetching } = useActor();
  return useQuery<Movie[]>({
    queryKey: ["movies"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMovies();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetMemes() {
  const { actor, isFetching } = useActor();
  return useQuery<Meme[]>({
    queryKey: ["memes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMemes();
    },
    enabled: !!actor && !isFetching,
  });
}
