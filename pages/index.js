import { useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import Character from "../components/Character";

export default function Home(results) {
  const intialState = results;
  const [characters, setCharacters] = useState(intialState.characters);

  return (
    <>
      <h1>Rick and Morty</h1>
      <Character characters={characters} />
    </>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql/",
    cache: new InMemoryCache(),
  });
  
  const { data } = await client.query({
    query: gql`
      query {
        characters {
          results {
            name
            id
            image
          }
        }
      }
    `,
  });

  return {
    props: {
      characters: data.characters.results,
    },
  };
}
