//swapController.js
const prisma = require('../DBCon/db');

exports.getSwaps = async (req, res) => {
  try {
    console.log(`Request Query: ${JSON.stringify(req.query)}`); // Debugging line
    let { dex } = req.query;
    dex = dex.trim(); // Remove whitespace and newline characters

    console.log(`Dex: ${dex}`); // Debugging line
  
    const swaps = await prisma.swapTransaction.findMany({
      where: {
        dex: dex,
      },
    });
  
    console.log(`Swaps: ${JSON.stringify(swaps)}`); // Debugging line
  
    if (!swaps || swaps.length === 0) {
      return res.status(404).json({ error: 'No swaps found for this dex' });
    }
  
    res.json({ swaps });
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

