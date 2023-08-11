const luhnAlgorithm = require("../../utils/luhnAlgorithm");

const cardValidatorController={
    validateCardNumber: async (req, res) => {
        try {
        const {cardNumber} = req.body
        const isValid = luhnAlgorithm(cardNumber);
    
        res.status(200).json({ validate:isValid });
        } catch (error) {
        res.status(500).send({
            message: error.message,
        });
        }
    }
}

module.exports = cardValidatorController;