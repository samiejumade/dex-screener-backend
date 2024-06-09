// Importing Prisma client for database operations
const prisma = require('../DBCon/db');

// Function to get swap transactions
exports.getSwaps = async (req, res) => {
  try {
    // Log the request query for debugging
    console.log(`Request Query: ${JSON.stringify(req.query)}`);
    
    // Get dex from the request query and trim any whitespace
    let { dex } = req.query;
    dex = dex.trim();

    // Log the dex for debugging
    console.log(`Dex: ${dex}`);
  
    // Find all swap transactions for the given dex
    const swaps = await prisma.swapTransaction.findMany({
      where: {
        dex: dex,
      },
    });
  
    // Log the found swaps for debugging
    console.log(`Swaps: ${JSON.stringify(swaps)}`);
  
    // If no swaps were found, return an error
    if (!swaps || swaps.length === 0) {
      return res.status(404).json({ error: 'No swaps found for this dex' });
    }
  
    // Return the found swaps
    res.json({ swaps });
  } catch (error) {
    // If there's an error, return it
    res.status(500).json({ error: error.message });
  }
};

// Function to create a new swap transaction
exports.createSwapTransaction = async (req, res) => {
  try {
    // Create a new swap transaction with hardcoded data
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

    // Return the created swap transaction with status code 201
    res.status(201).json(newSwapTransaction);
  } catch (e) {
    // If there's an error, return it with a custom message
    res.status(500).json({ error: 'An error occurred while creating the swap transaction', details: e.message });
  } finally {
    // Disconnect from the Prisma client
    await prisma.$disconnect();
  }
};