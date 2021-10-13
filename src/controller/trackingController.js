const api = require("../services/linketrack");
const { DateTime } = require('luxon');
const Bottleneck = require('bottleneck');



const limiter = new Bottleneck({
	maxConcurrent: 1,
	minTime: 1500,
	highWater: 10,
	strategy: Bottleneck.strategy.OVERFLOW
});

module.exports = {
	async fetchTracking(req, res) {

		const counts = limiter.counts();
		console.log(counts);

		try {
			const { trackingCode } = req.body;
			if (!trackingCode) {
				console.log("Tracking code is null or invalid");
				return res.status(400).send();
			}
			const { data } = await limiter.schedule({ expiration: 1500 }, () => api.get('/', { params: { codigo: trackingCode } }));
			const { codigo: code, ultimo: updatedAt, servico: type, eventos: events } = data;
			return res.json({
				code,
				updatedAt,
				type,
				events: events.map(({ data: date, hora: time, local: location, status, subStatus }) => {
					const [unity, city, state,] = location.split('/');
					return {
						date: DateTime.fromFormat(`${date} ${time}`, 'dd/MM/yyyy HH:mm').toISO(),
						unity,
						city,
						state,
						status,
						subStatus
					}
				})
			});
		} catch (err) {
			if (err instanceof Bottleneck.BottleneckError) {
				return res.status(503).send();
			}
			console.error(err.stack)
			return res.status(500).json({ status: 500 });
		}
	}
}
