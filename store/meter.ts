import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Meter } from "../types/Meter";

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Meter, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});
