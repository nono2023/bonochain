const { GENESIS_DATA, MINE_RATE} = require('./config');
const cryptoHash = require('./crypto-hash');

class Block {
     constructor( {timestamp, lastHash, hash, data, nonce, difficulty}) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty
     }
     
     static genesis() {
        return new Block({
            timestamp: GENESIS_DATA.timestamp,
            lastHash: GENESIS_DATA.lastHash,
            hash: GENESIS_DATA.hash,
            data: GENESIS_DATA.data,
            nonce: GENESIS_DATA.nonce,
            difficulty: GENESIS_DATA.difficulty
            
        })
    }

    static mineBlock({lastBlock, data}) {
        let hash, timestamp;
        const lastHash = lastBlock.hash;
        const {difficulty} = lastBlock;
        let nonce = 0;

        do{
            nonce++;
            timestamp = Date.now();
            hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this({ timestamp, lastHash, difficulty, nonce, hash, data})
    }

    static adjustDifficulty({originalBlock, timestamp}) {
        const { difficulty} = originalBlock;

        const difference = timestamp - originalBlock.timestamp;

        if (difference > MINE_RATE) return difficulty -1;

        return difficulty + 1;
    }
}



module.exports = Block
