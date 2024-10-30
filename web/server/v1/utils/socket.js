// const appChatService = require('../service/appChat.service');

// function setupSocket(server) {
//     const io = require('socket.io')(server);

//     io.on('connection', (socket) => {
//         console.log('User connected');

//         socket.on('join', (room) => {
//             // Join the specified room
//             console.log('########################Join Room#######################');
//             socket.join(room);
//         });


//         //  get current sender and receiver history
//         socket.on('currentHistory', async (messagePost) => {
//             console.log(messagePost, '########################Message Post#######################');
//             if (messagePost.sender && messagePost.receiver) {
//                 const history = await appChatService.getCurrentSenderAndReceiverHistory(messagePost.sender, messagePost.receiver)
//                 io.to(messagePost.room).emit('currentHistory', history);
//             }
//         });

//         // get users list
//         socket.on('usersList', async (loginUser) => {
//             console.log('login user id', loginUser);
//             const usersList = await appChatService.getUsersList(loginUser.id)
//             io.to(loginUser.room).emit('usersList', usersList);
//         });

//         // add new message 
//         socket.on('addNewMessage', async (messageDetails) => {
//             console.log(messageDetails, '########################New Message#######################');
//             const result = await appChatService.addChat(messageDetails)
//             io.to(messageDetails.room).emit('addNewMessage', result);
//         });

//         // update message 
//         socket.on('updateMessage', async (messageDetails) => {
//             console.log(messageDetails, '########################Update Message#######################');
//             const result = await appChatService.updateChat(messageDetails)
//             io.to(messageDetails.room).emit('updateMessage', result);
//         });

//         // delete message 
//         socket.on('deleteMessage', async (messageDetails) => {
//             console.log(messageDetails, '########################Delete Message#######################');
//             const result = await appChatService.deleteChat(messageDetails)
//             io.to(messageDetails.room).emit('deleteMessage', result);
//         });

//         // delete message 
//         socket.on('searchMessage', async (messageDetails) => {
//             console.log(messageDetails, '########################Search Message#######################');
//             const result = await appChatService.search(messageDetails)
//             io.to(messageDetails.room).emit('searchMessage', result);
//         });

//         // disconnect socket
//         socket.on('disconnect', () => {
//             console.log('User disconnected');
//         });

//     });

//     io.on('error', (error) => {
//         console.error('Socket.IO server error:', error);
//     });
//     return io;
// }

// module.exports = { setupSocket };
