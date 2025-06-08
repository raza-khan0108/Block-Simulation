# Blockchain Simulation

A simple JavaScript implementation demonstrating core blockchain concepts: block structure, cryptographic hashing, and chain immutability.

![Blockchain Visualization](https://miro.medium.com/v2/resize:fit:720/format:webp/1*8w4u_knU6l4Tv1REo-d7BQ.png)

## Features
- Creates a blockchain with genesis block
- Adds new blocks with cryptographic linking
- Demonstrates tamper detection
- Validates chain integrity
- SHA-256 hashing implementation

## Code Explanation

### Block Structure
Each block contains:
- `index`: Position in chain
- `timestamp`: Creation time
- `data`: Transaction content
- `previousHash`: Link to prior block
- `nonce`: Proof-of-work variable
- `hash`: Digital fingerprint of block contents

### Key Functions
1. `calculateHash()`: Generates SHA-256 hash from block components
2. `addBlock()`: Links new blocks to chain
3. `isChainValid()`: Verifies blockchain integrity

### Tampering Demonstration
The simulation:
1. Creates valid blockchain
2. Modifies data in Block 1
3. Shows hash mismatch
4. Demonstrates broken chain links

## How to Run

### Prerequisites
- Node.js (v18+)

### Installation
```bash
git clone https://github.com/your-username/blockchain-simulation.git
cd blockchain-simulation
