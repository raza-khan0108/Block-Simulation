// Import Node.js crypto module for SHA-256 hashing
const crypto = require('crypto');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;  // Not used in basic simulation
        this.hash = this.calculateHash();
    }

    calculateHash() {
        // Create hash using block components
        return crypto.createHash('sha256')
            .update(
                this.index +
                this.timestamp +
                JSON.stringify(this.data) +
                this.previousHash +
                this.nonce
            )
            .digest('hex');
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        // First block with hardcoded values
        return new Block(0, '2023-01-01', 'Genesis Block', '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // Verify current block's hash
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            // Verify link to previous block
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

// Create blockchain and add blocks
const myChain = new Blockchain();
myChain.addBlock(new Block(1, '2023-01-02', { amount: 4 }));
myChain.addBlock(new Block(2, '2023-01-03', { amount: 8 }));

// Display original chain
console.log('----- ORIGINAL BLOCKCHAIN -----');
console.log(JSON.stringify(myChain.chain, null, 2));
console.log('Blockchain valid?', myChain.isChainValid());

// Tamper with Block 1
console.log('\n----- TAMPERING WITH BLOCK 1 -----');
myChain.chain[1].data = { amount: 100 };  // Alter data
console.log('Recalculated Block 1 hash:', myChain.chain[1].calculateHash());
console.log('Actual Block 1 hash:', myChain.chain[1].hash);

// Verify chain integrity
console.log('\nBlockchain valid after tampering?', myChain.isChainValid());

// Show why chain is invalid
console.log('\nBlock 2 expects previous hash:', myChain.chain[1].hash);
console.log('Actual previous hash in Block 2:', myChain.chain[2].previousHash);