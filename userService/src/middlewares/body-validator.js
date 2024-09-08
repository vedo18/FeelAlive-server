module.exports.validateBody = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        console.log('error', error);

        if (error) {
            return res.status(400).json({
                error: true,
                message: 'Invalid Request data',
                details: error.details.map((detail) => detail.message),
            });
        }

        next();
    };
};
