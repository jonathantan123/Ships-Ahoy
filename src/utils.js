



export default function filterByZip(array, zipcode) { 
  return array.filter(location => location.address.includes(zipcode))
}