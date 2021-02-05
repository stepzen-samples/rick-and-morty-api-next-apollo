This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### index.js

```javascript
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
```

### Character.js

```javascript
import React from "react";

const Character = ({ characters }) => {
  return (
    <>
      {characters.map((character) => {
        return (
          <div key={character.id}>
            <h2>{character.name}</h2>
            <img src={character.image} />
          </div>
        );
      })}
    </>
  );
};

export default Character;
```

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/vz90ph9op7qtlwx4y1ud.jpg)