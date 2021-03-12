export const Character = ({ characters }) => {
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