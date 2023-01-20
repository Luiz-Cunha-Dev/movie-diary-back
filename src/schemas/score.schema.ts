import Joi from "joi";

const scoreSchema = Joi.object({
    score: Joi.number().greater(0).less(6)
});

export default scoreSchema;