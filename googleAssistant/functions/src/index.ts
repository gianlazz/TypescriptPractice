import * as functions from 'firebase-functions';
// Google Assistant deps
import { dialogflow, SimpleResponse, BasicCard, Button, Image } from 'actions-on-google';
const app = dialogflow({ debug: true });

// Capture Intent
app.intent('Hello Lazztech', async (conv) => {
    const data = 'Hello World';

    // conv.ask();

    conv.close(new SimpleResponse({
        text: `${data}`,
        speech: `${data}`
    }));
    conv.close(new BasicCard({
        title: 'Lazztech Assistant',
        image: new Image({
            url: 'http://lazz.tech/images/workspace.png',
            alt: 'Lazztech workspace'
        }),
        buttons: new Button({
            title: 'lazz.tech',
            url: 'http://lazz.tech/',
        })
    }))
});

// Export the Cloud Functions
export const fulfillment = functions.https.onRequest(app);