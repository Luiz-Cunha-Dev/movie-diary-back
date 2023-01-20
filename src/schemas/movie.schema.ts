import Joi from "joi";

const movieSchemas = Joi.object({
    title: Joi.string().required(),
    platform: Joi.string().required(),
    genre: Joi.string().required()
})

export default movieSchemas;