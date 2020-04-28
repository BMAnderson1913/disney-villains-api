const models = require('../models')


const getAllVillains = async (request, response) => {
  const villains = await models.Villains.findAll({ attributes: ['name', 'movie', 'slug'] })

  return response.send(villains)
}

const getVillainBySlug = async (request, response) => {
  const { slug } = request.params

  const matchingVillain = await models.Villains.findOne({
    where: { slug: slug.toLowerCase() },
    attributes: ['name', 'movie', 'slug']
  })

  return matchingVillain
    ? response.status(200).send(matchingVillain)
    : response.status(404).send('Sorry, that villain doesn\'t exist!')
}

const saveNewVillain = async (request, response) => {
  const { name, movie, slug } = request.body

  if (!name || !movie || !slug) {
    return response.status(400).send('The following fields are required: name, movie, slug')
  }

  const newVillain = await models.Villains.create({ name, movie, slug })

  return response.status(201).send(newVillain)
}

module.exports = { getAllVillains, getVillainBySlug, saveNewVillain }

