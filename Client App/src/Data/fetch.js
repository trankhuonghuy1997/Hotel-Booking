async function fetchDataHotel(limit) {
  if (limit) {
    const respone = await fetch(`http://localhost:5000/hotels?limit=${limit}`);
    const data = await respone.json();
    return data;
  } else {
    const respone = await fetch(`http://localhost:5000/hotels`);
    const data = await respone.json();
    return data;
  }
}
export default fetchDataHotel;
