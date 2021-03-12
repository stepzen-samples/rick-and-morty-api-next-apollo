This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependencies and run development server

```bash
yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### index.js

```javascript
// pages/index.js

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
```

### Character.js

```javascript
// components/Character.js

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

### getCharacters.js

```javascript
// queries/getCharacters.js

import gql from "graphql-tag"

export const GET_CHARACTERS_QUERY = gql`
  query getCharacters{
    characters {
      results {
        name
        id
        image
      }
    }
  }
`
```

### client.js

```javascript
// utils/client.js

import {
  ApolloClient,
  InMemoryCache,
  HttpLink
} from "apollo-boost"

const uri = "https://rickandmortyapi.com/graphql/"
const link = new HttpLink({ uri })
const cache = new InMemoryCache()

export const client = new ApolloClient({
  cache,
  link
});
```

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/vz90ph9op7qtlwx4y1ud.jpg)