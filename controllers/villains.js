const models = require('../models')


const getAllVillains = async (request, response) => {
  try {
    const villains = await models.Villains.findAll({ attributes: ['name', 'movie', 'slug'] })

    return response.send(villains)
  } catch (error) {
    return response.status(500).send('Unable to retrieve list of villians, please try again.')
  }
}

const getVillainBySlug = async (request, response) => {
  try {
    const { slug } = request.params

    const matchingVillain = await models.Villains.findOne({ where: { slug }, attributes: ['name', 'movie', 'slug'] })

    return matchingVillain
      ? response.status(200).send(matchingVillain)
      : response.status(404).send('Sorry, that isn\'t a Disney villain, try again!')
  } catch (error) {
    return response.status(500).send('Unable to retrieve villain, please try again.')
  }
}

const saveNewVillain = async (request, response) => {
  try {
    const { name, movie, slug } = request.body

    if (!name || !movie || !slug) {
      return response.status(400).send('The following fields are required: name, movie, slug')
    }

    const newVillain = await models.Villains.create({ name, movie, slug })

    return response.status(201).send(newVillain)
  } catch (error) {
    return response.status(500).send('Unable to save new villain, please try again.')
  }
}

module.exports = { getAllVillains, getVillainBySlug, saveNewVillain }

