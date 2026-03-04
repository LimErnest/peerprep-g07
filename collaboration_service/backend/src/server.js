const WebSocket = require('ws');
const crypto = require('crypto');
const PORT = 8080;

// Create a WebSocket server
const wss = new WebSocket.Server({ port: PORT}, () => {
    console.log(`WebSocket server is running on ws://localhost:${PORT}`);
})

// Trying to match users based on text written, if same text then matched and put into the same room
// { text : [client1, client2] }
const waitingUsers = {}; 

const rooms = {}; // { roomId: y.doc, (client1, client2) }

// Listening for connection events
wss.on('connection', (ws) => {
    console.log('New Client Connected');

    ws.on('message', (message) => {
        const { type, text } = JSON.parse(message);

        // Logic for handling matching of people now im only matching based on text input
        if (type === "find_match") {
            if (waitingUsers[text] && waitingUsers[text].length > 0) {
                // Match is found and there is a client to the text
                // Create a new room and redirect both clients into the coding space
                console.log('Match Found, creating room');

                const otherWs = waitingUsers[text].pop(); // Get the other client
                const roomId = crypto.randomUUID();// Unique room ID based on timestamp
                const question = `
                Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] 
                where nums[i] + nums[j] + nums[k] == 0, and the indices i, j and k are all distinct.
                The output should not contain any duplicate triplets. 
                You may return the output and the triplets in any order.
                `;

                // Notify both clients about the match and room ID
                ws.send(JSON.stringify({ type: 'match_found', roomId, question}));
                otherWs.send(JSON.stringify({ type: 'match_found', roomId, question}));
            } else {
                // No match found, add user to waiting list
                if (!waitingUsers[text]) {
                    waitingUsers[text] = [];
                    waitingUsers[text].push(ws);
                }
            }
        }
    });

    ws.on('close', () => {
        console.log('Client Disconnected');
    });
})