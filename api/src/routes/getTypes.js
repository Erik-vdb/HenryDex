const { Type } = require('../db')

module.exports = async function (req, res) {
  axios.get('https://pokeapi.co/api/v2/type')
  .then(({data}) => Type.bulkCreate(data.results.map(el => { return {id: el.id, name: el.name}})))
  .catch(({message}) => {
    console.log(message)
  })
  const types = await Type.findAll()
  res.send(types)
}