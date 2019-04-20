import * as functions from 'firebase-functions';
import axios from "axios";
// Google Assistant deps
import { dialogflow, SimpleResponse, BasicCard, Button, Image } from 'actions-on-google';
const app = dialogflow({ debug: true });

// Capture Intent
app.intent('Hello Lazztech', async (conv) => {
    let data: any;

    axios({
        url: `https://lazztechvision.herokuapp.com/graphql`,
        method: 'post',
        data: {
            query: `
                query {
                    recognizedFaces()
                    {
                      id
                      name
                    }
                  }
            `
        }
    }).then((result) => {
        data = result.data.recognizedFaces;
    })
    .catch( ( err: any ) => {
        // tslint:disable-next-line:no-console
        console.log( err );
    });

    let names = "";
    
    if (data) {
        data.forEach((name: string)  => {
            names += `${name}, `;
        });
    }
        

    // conv.ask();

    conv.close(new SimpleResponse({
        text: `${data}`,
        speech: `Hello, I can recognize ${names}`
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