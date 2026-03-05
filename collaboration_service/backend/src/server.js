const WebSocket = require('ws');
const crypto = require('crypto');


const PORT = 8080;

// Create a WebSocket server
const wss = new WebSocket.Server({ port: PORT }, () => {
    console.log(`WebSocket server is running on ws://localhost:${PORT}`);
})

// Trying to match users based on text written, if same text then matched and put into the same room
// { text : [client1, client2] }
const waitingUsers = {};

// { roomId: [WebSocket, WebSocket] } 
// This is for tracking whoever is in the matching
const rooms = {}; 

// Yjs room tracking: { roomName: Set<WebSocket> } 
// This is to track who is still connected or not
const yjsRooms = {};

function handleYjsConnection(ws, roomId) {
    if (!yjsRooms[roomId]) {
        yjsRooms[roomId] = new Set();
    }

    const room = yjsRooms[roomId];
    room.add(ws);

    console.log(`Yjs client joined room: ${roomId} (${room.size} clients)`);

    ws.on('message', (message) => {
        // Yjs messages are binary — broadcast to all OTHER clients in the same room
        room.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        room.delete(ws);
        console.log(`Yjs client left room: ${roomId} (${room.size} remaining)`);
        if (room.size === 0) {
            delete yjsRooms[roomId];
        }
    });

    ws.on('error', (err) => {
        console.error(`Yjs WS error in room ${roomId}:`, err);
        room.delete(ws);
    });
}

// Listening for connection events
wss.on('connection', (ws, req) => {

    // If the connection is for Yjs syncing
    if (req.url.startsWith("/yjs")) {
        // get the uuid from the url
        const roomId = req.url.slice('/yjs/'.length) || 'default';
        handleYjsConnection(ws, roomId);
        return;
    }

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
                You may return the output and the triplets in any order.`;

                // Create a new room and store the clients
                rooms[roomId] = [ws, otherWs];

                // Notify both clients about the match and room ID
                ws.send(JSON.stringify({ type: 'match_found', roomId, question }));
                otherWs.send(JSON.stringify({ type: 'match_found', roomId, question }));

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