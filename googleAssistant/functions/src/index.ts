import * as functions from 'firebase-functions';
// Google Assistant deps
import { dialogflow, SimpleResponse, BasicCard, Button, Image } from 'actions-on-google';
const app = dialogflow({ debug: true });

// Capture Intent
app.intent('Get Latest Episode', (conv) => {
    
});


