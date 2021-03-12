import { useState } from "react"
import Character from "../components/Character";
import { GET_CHARACTERS_QUERY } from "../queries/getCharacters.js"
import { client } from "../utils/client.js"

export default function Home(results) {
  const [characters] = useState(results.characters);

  return (
    <>
      <h1>Rick and Morty</h1>
      <Character characters={characters} />
    </>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_CHARACTERS_QUERY,
  });

  return {
    props: {
      characters: data.characters.results,
    },
  };
}
