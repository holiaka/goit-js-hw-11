// Fetch func.
export async function fetchCountries(name) {
  const response = await fetch(
    `https://pixabay.com/api/?key=30951903-ffa881e7e59a7b1cacd7ea887&q=yellow+flowers&image_type=photo`
  );
  if (!response.ok) {
    throw new Error(response.status);
  }
  console.dir(response);
  return await response.json();
}
