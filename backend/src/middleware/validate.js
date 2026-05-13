import { AppError } from '../utils/AppError.js';

const formatIssues = (issues) => issues.map((issue) => ({ path: issue.path.join('.'), message: issue.message }));

export const validate = (schema) => (req, _res, next) => {
  const result = schema.safeParse({ body: req.body, params: req.params, query: req.query });
  if (!result.success) return next(new AppError('Validation failed', 400, formatIssues(result.error.issues)));

  req.body = result.data.body ?? req.body;
  req.params = result.data.params ?? req.params;
  req.query = result.data.query ?? req.query;
  return next();
};
