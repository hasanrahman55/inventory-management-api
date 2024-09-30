const prisma = require('../models/prismaClient')


// create category
exports.createCategory = async(req, res) =>{
    const { name } = req.body;
    try {
        const category = await prisma.category.create({
            data: { name }
        });
        res.json(category)

    } catch (error) {
        res.status(400).json({ error: 'Error creating category' });
    }
}

//find all
exports.getCategoris =async (req, res) => {
    const categoris = await prisma.category.findMany();
    res.json(categoris);
}

//categoris by id
exports.getCategoryById = async (req,res) =>{
    const {id} = req.params;
    const category = await prisma.category.findUnique({
        where:{id: parseInt(id)}
    })
    res.json(category);
}


//categoris by id
exports.updateCategory = async (req,res) =>{
    const {id} = req.params;
    const {name} =req.body;

    const category = await prisma.category.update({
        where:{id: parseInt(id)},
        data:{name},
    })

    res.json(category)
}



//delete

exports.deleteCategory = async (req,res) =>{
    console.log("click");
    
    const {id} = req.params;
   await prisma.category.delete({
        where:{id: parseInt(id)}
    })

    res.json({message:'Category deleted' })
}