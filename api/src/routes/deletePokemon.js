const { Pokemon } = require('../db')

module.exports = async function (req, res) {
  const {ID} = req.body
  try {
    await Pokemon.destroy({where: {ID}})
    res.status(202).send("Eliminated Succesfully")
  } catch ({message}) {
    res.status(404).send(message)
  }
}