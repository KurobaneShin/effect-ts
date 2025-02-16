import { Schema } from "effect";

class Pokemon extends Schema.Class<Pokemon>("pokemon")({
  id: Schema.Number,
  order: Schema.Number,
  name: Schema.String,
  height: Schema.Number,
  weight: Schema.Number,
}) {
  public get formatHeight(): string {
    return `${this.height}cm`;
  }
}

export const decodePokemon = Schema.decodeUnknown(Pokemon);
