const { getDietsDb } = require('../controllers/dietController');

const getDietHandler = async (req, res) => {
    
    try {
        const diets = await getDietsDb();

        res.status(200).json(diets);
    } 
    
    catch (error) {
        res.status(404).json(error);
    }
};

const getDietIdHandler = async (req, res) => {

    try {
        const { id } = req.params;

        const allDiets = await getDietsDb();

        const diets = allDiets.find(diet => diet.id.toString() === id);
        
        if(!diets){
            res.status(404).json(`The diet with the id ${id} does not exist`);
        } else {
            res.status(200).json(diets);
        }
    } 
    
    catch (error) {
        res.status(400).json(error);
    }
};

module.exports = { 
    getDietHandler, 
    getDietIdHandler,
};