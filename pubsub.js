const PubNub = require('pubnub');

const credentials = {
    publishKey:'pub-c-6dedcb9c-94b4-4140-bd57-170f100f4b28',
    subscribeKey:'sub-c-eb674cfa-ade3-11eb-8772-0a8f76eab11b',
    secretKey:'sec-c-OTM2ZDc2YzMtZTdmZS00MmM3LTk5N2QtMDJhMjYxZGMzZjM0',
};

const CHANNELS = {
    TEST: 'TEST',
};

class PubSub {
    constructor() {
        this.pubnub = new PubNub (credentials);

        this.pubnub.subscribe({ channels: Object.values(CHANNELS) })

        this.pubnub.addListener(this.listener());
    }
    listener(){
        return {
            message: messageObject => {
                const { channel, message} = messageObject;

                console.log(`message received, Channel:${channel}, Message: ${message} `);
            }

        };
    }

    publish({channel, message}) {
        this.pubnub.publish({channel, message});
    }
};

module.exports = PubSub;


