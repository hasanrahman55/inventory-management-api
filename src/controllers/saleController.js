const prisma = require('../models/prismaClient')

exports.recordSale = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // Check if the product exists
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Decrement the product quantity
    await prisma.product.update({
      where: { id: parseInt(productId) },
      data: { quantity: { decrement: parseInt(quantity) } },
    });

    // Create a sale record
    const sale = await prisma.sale.create({
      data: {
        productId: parseInt(productId),
        quantity: parseInt(quantity),
      },
    });

    res.json(sale);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

exports.getSales = async (req, res) => {
  const sales = await prisma.sale.findMany({
    include: { product: true },
  });
  res.json(sales);
};