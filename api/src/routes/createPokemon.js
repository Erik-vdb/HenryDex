const { Pokemon, Type } = require('../db')

export default async function (req, res) {
  const { nombre, vida, fuerza, defensa, velocidad, altura, peso, types, img } = req.body

  try {
    const newPoke = await Pokemon.create({ nombre, vida, fuerza, defensa, velocidad, altura, peso, img, createdInDB: true })
    const tipo = await Type.findAll({where: {name: types}})
    
    await newPoke.addType(tipo)

    const confirm = await Pokemon.findOne({ where: {nombre: nombre}, include:{model:Type}})

    res.status(200).send(confirm)
  } catch (err) {
    res.status(400).send(err.message)
  }
}