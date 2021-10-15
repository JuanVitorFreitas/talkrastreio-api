const { Joi, Segments, celebrate } = require('celebrate');

module.exports = {
	fetchTracking: celebrate({
		[Segments.PARAMS]: Joi.object({
			code: Joi.string().length(13).uppercase().required(),
		})
	})
}
