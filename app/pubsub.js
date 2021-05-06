const PubNub = require('pubnub');

const credentials = {
    publishKey:'pub-c-6dedcb9c-94b4-4140-bd57-170f100f4b28',
    subscribeKey:'sub-c-eb674cfa-ade3-11eb-8772-0a8f76eab11b',
    secretKey:'sec-c-OTM2ZDc2YzMtZTdmZS00MmM3LTk5N2QtMDJhMjYxZGMzZjM0',
};

const CHANNELS = {
    TEST: 'TEST',
    BLOCKCHAIN: 'BLOCKCHAIN',
};

class PubSub {
    constructor({blockchain}) {
        this.blockchain = blockchain;
        this.pubnub = new PubNub (credentials);

        this.pubnub.subscribe({ channels: Object.values(CHANNELS) })

        this.pubnub.addListener(this.listener());
    }
    listener(){
        return {
            message: messageObject => {
                const { channel, message} = messageObject;

                console.log(`message received, Channel:${channel}, Message: ${message} `);

                const parsedMessage = JSON.parse(message);

                if (channel === CHANNELS.BLOCKCHAIN)
                this.blockchain.replaceChain(parsedMessage);
            }

        };
    }

    publish({channel, message}) {
        this.pubnub.unsubscribe({ channel })
        setTimeout(() => this.pubnub.publish({ channel, message }), 3000);
        setTimeout(() => this.pubnub.subscribe({ channels: [ Object.values(CHANNELS) ] }), 6000);
    }

    broadcastChain () {
        this.publish({
            channel: CHANNELS.BLOCKCHAIN, 
            message: JSON.stringify(this.blockchain.chain)
        })
    }
};

module.exports = PubSub;


