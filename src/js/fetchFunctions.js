// Fetch func.
export async function fetchCountries(name) {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages,area,latlng,capitalInfo`
  );
  if (!response.ok) {
    throw new Error(response.status);
  }
  console.dir(response);
  return await response.json();
}
