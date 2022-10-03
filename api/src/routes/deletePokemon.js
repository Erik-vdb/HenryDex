export default async function (req, res) {
  const {ID} = req.body
  try {
    await Pokemon.destroy({where: {ID:ID}})
    res.status(202).send()
  } catch (error) {
    res.status(404).send(error)
  }
}