//swapController.js
const prisma = require('../DBCon/db');
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();


// async function getSwaps(req, res) {
//   const swaps = await prisma.swaps.findMany({
//     where: {
//       dex: 'uniswap'
//     }
//   });

//   res.json(swaps);
// }


//http://localhost:3000/api/swaps?dex=uniswap


exports.getSwaps = async (req, res) => {
  const { dex } = req.query;

  if (!dex) {
    return res.status(400).json({ error: 'DEX parameter is required' });
  }

  try {
    const swaps = await prisma.swapTransaction.findMany({
      where: { dex }
    });
    res.status(200).json({ swaps });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.createSwapTransaction = async (req, res) => {
  try {
    const newSwapTransaction = await prisma.swapTransaction.create({
      data: {
        dex: 'uniswap',
        transactionHash: '0x1737d6e131366bf15bf54fb6160e00373615439af187165b46c3fbea0d914669',
        timestamp: new Date(),
        sender: '0x0bb6A0a5b8A05a98D0dc50838716a59Ca4b57901',
        receiver: '0x4A859F03f3DF73041Ee8EACe087828E7272CE96A',
        amount:  0.002,
        token: '0x779877A7B0D9E8603169DdbD7836e478b4624789 ',
      },
    });
    res.status(201).json(newSwapTransaction);
  } catch (e) {
    res.status(500).json({ error: 'An error occurred while creating the swap transaction', details: e.message });
  } finally {
    await prisma.$disconnect();
  }
};

