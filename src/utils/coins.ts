import axios from "axios";

export default async function getDolarCotation() {
  const { data } = await axios.get(
    "https://api.hgbrasil.com/finance?format=json-cors&key=b7b8b8f4"
  );
  return data.results.currencies.USD.buy;
}
