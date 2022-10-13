const { default: axios } = require("axios");

const fetchTypes = async () => {
  axios.get("https://henry-dex-bghw.onrender.com/types")
  .then(({data}) => {
    if (!data){
      return fetchTypes()
    }
    else {
      console.log(data)
      return data
    } 
  })
  .catch(({message}) => {
    console.log(message)
  })
}

fetchTypes()