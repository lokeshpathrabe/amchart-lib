import * as yup from 'yup';
import CHARTS from './const/chart';

const stackedColumnSeriesSchema = yup.object().shape({
    id: yup.string().required(),
    type: yup.string().required(),
    yAxis: yup.object().shape({
        min: yup.number().required(),
        max: yup.number().required(),
    }),
    series: yup.object().shape({
        type: yup.string().required(),
        list: yup.array().required().of(yup.object().shape({
            color: yup.string().required(),
            name: yup.string().required(),
            value: yup.string().required(),
        }))
    }),
    legend: yup.object().required().shape({
        type: yup.string().required()
    })
});

const columnSeriesSchema = yup.object().shape({
    id: yup.string().required(),
    type: yup.string().required(),
    series: yup.object().shape({
        type: yup.string().required(),
        list: yup.array().required().of(yup.object().shape({
            color: yup.string().required(),
            name: yup.string().required(),
            value: yup.string().required(),
        }))
    })
});

export const schema = {
    isValid: (config) => {
        switch(config.type) {
            case CHARTS.STACKED_COLUMN_SERIES_CHART:
                return stackedColumnSeriesSchema.isValidSync(config);
            case CHARTS.COLUMN_SERIES_CHART:
                return columnSeriesSchema.isValidSync(config);
            default:
                return stackedColumnSeriesSchema;   
        }
    }
}