async function fetchData() {
  const respone = await fetch("http://localhost:5000/hotels");
  const data = await respone.json();
  return data;
}

export default fetchData;
