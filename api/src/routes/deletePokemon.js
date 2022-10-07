const { Pokemon } = require('../db')

module.exports =  async function (req, res) {
  const {ID} = req.body
  try {
    await Pokemon.destroy({where: {ID}})
    res.status(202).send()
  } catch (error) {
    res.status(404).send(error)
  }
}