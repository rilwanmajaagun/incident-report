import { body } from 'express-validator';

const createIncidentSchema = [
  body('incident_desc').exists({ checkNull: true, checkFalsy: true }),
  body('city')
    .exists({ checkNull: true, checkFalsy: true })
    .notEmpty()
    .withMessage('city is not allowed to be empty')
    .toLowerCase(),
  body('country').notEmpty().withMessage('County is not allowed to be empty').toLowerCase(),
  body('date').isDate().withMessage('Must be a valid date'),
];
export default createIncidentSchema;
