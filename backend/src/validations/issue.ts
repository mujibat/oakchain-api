import joi from './imports';

const issue = {
  async validateCreateIssue(payload: any) {
    const schema = joi.object({
      title: joi.string().required().label('Invalid Title'),
      description: joi.string().required().label('Invalid Description'),
      thumbnail: joi.string().label('Invalid Thumbnail'),
      issueType: joi.string().required().label('Invalid Issue Type'),
      priority: joi.string().required().label('Invalid Priority'),
      assignee: joi.string().required().label('Invalid Assignee'),
      reporter: joi.string().required().label('Invalid Reporter'),
      comments: joi.array().items(
        joi.object({
          text: joi.string().required().label('Invalid Comment Text'),
          user: joi.string().required().label('Invalid Comment User'),
        })
      ),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  },

  async validateUpdateIssue(payload: any) {
    const schema = joi.object({
      title: joi.string().optional().label('Invalid Title'),
      description: joi.string().optional().label('Invalid Description'),
      thumbnail: joi.string().label('Invalid Thumbnail'),
      issueType: joi.string().optional().label('Invalid Issue Type'),
      status: joi.string().valid('open', 'closed').optional().label('Invalid Status'),
      priority: joi.string().optional().label('Invalid Priority'),
      assignee: joi.string().optional().label('Invalid Assignee'),
      reporter: joi.string().optional().label('Invalid Reporter'),
      comments: joi.array().items(
        joi.object({
          text: joi.string().optional().label('Invalid Comment Text'),
          user: joi.string().optional().label('Invalid Comment User'),
        })
      ),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  },
};

export default issue;
