const prisma = require('../models/prismaClient')

exports.createProduct = async(req, res) => {
    const { name, price, quantity, categoryId } = req.body;
    try {
        console.log(name,price,quantity,categoryId);
        
        const product = await prisma.product.create({
          data: {
            name,
            price: parseFloat(price),  // Ensure price is a float
            quantity: parseInt(quantity), // Ensure quantity is an integer
            categoryId: parseInt(categoryId), // Ensure categoryId is an integer
          },
        });


      
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: 'Error creating product' });
    }
  };


//find all
exports.getProducts =async (req, res) => {
  const categoris = await prisma.product.findMany();
  res.json(categoris);
}


// exports.getProducts = (req,res)=>{
//     const {page = 1 , limit = 10} = req.query;

//   const product  =  prisma.product.findMany({
//     skip: (page - 1)* limit,
//     take: parseInt(limit),
//     include:{ category: true },
//   })
//   res.json(product)
// }


exports.getProductById = async (req, res) => {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { category: true },
    });
    res.json(product);
  };
  
  exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, quantity, categoryId } = req.body;
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, price, quantity, categoryId },
    });
    res.json(product);
  };
  
  exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    await prisma.product.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Product deleted' });
  };