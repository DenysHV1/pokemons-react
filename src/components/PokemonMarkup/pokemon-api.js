export const pokemonApi = async pokemon => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
    if (!response.ok) {
      throw new Error('Ошибка при получении данных');
    }
    if (response) {
      return response.json();
    }
  } catch (error) {
    console.error('Произошла ошибка:', error);
    throw error;
  }
};
