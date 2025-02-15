import { Effect, pipe } from "effect";

interface FetchError {
  readonly _tag: "FetchError";
}
interface JsonError {
  readonly _tag: "JsonError";
}

const fetchRequest = Effect.tryPromise({
  try: () => fetch("https://pokeapi.co/api/v2/psadokemon/garchomp/"),
  catch: (): FetchError => ({ _tag: "FetchError" }),
});
const jsonResponse = (response: Response) =>
  Effect.tryPromise({
    try: () => response.json(),
    catch: (): JsonError => ({ _tag: "JsonError" }),
  });

const savePokemon = (pokemon: unknown) =>
  Effect.tryPromise({
    try: () => fetch("/api/pokemon", { body: JSON.stringify(pokemon) }),
    catch: (): FetchError => ({ _tag: "FetchError" }),
  });

const main = fetchRequest.pipe(
  Effect.flatMap(jsonResponse),
  Effect.flatMap(savePokemon),
);

Effect.runPromise(main).then(console.log);
