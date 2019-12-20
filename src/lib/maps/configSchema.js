import * as yup from 'yup';
import MAPS from './const/map';

const WorldMapSeries = yup.object().shape({
    id: yup.string().required(),
    type: yup.string().required()
});

const WorldMapHeatSeries = yup.object().shape({
    id: yup.string().required(),
    type: yup.string().required()
});

export const schema = {
    isValid: (config) => {
        switch(config.type) {
            case MAPS.WORLD_MAP:
                return WorldMapSeries.isValidSync(config);
            case MAPS.WORLD_HEAT_MAP:
                return WorldMapHeatSeries.isValidSync(config);
            default:
                return WorldMapSeries.isValidSync(config);;   
        }
    }
}