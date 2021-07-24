const api = require("../services/linketrack");
const { DateTime } = require('luxon');
    
    
module.exports = {
    async fetchTracking(req, res){
        
        try {
            console.log(req.body);
            const { trackingCode } = req.body;
            const { data } = await api.get('/', { params: { codigo: trackingCode } });
            const { codigo: code, ultimo: updatedAt, servico: type, eventos: events } = data;
            return res.json({
                code,
                updatedAt,
                type,
                events: events.map(({ data: date, hora: time, local: location, status, subStatus }) => {
                    const [city, state] = location.split('/');
                    return {
                        date: DateTime.fromFormat( `${date} ${time}`,'dd/MM/yyyy HH:mm' ).toISO(),
                        city,
                        state,
                        status,
                        subStatus
                    }
                })
        });
        } catch (err) {
            console.error(err)
            return res.status(500).json({ status: 500 });
        }
    }
}
