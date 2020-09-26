import query from "./query";

const SocketEvent = (io, socket) => {
    socket.on('join', (postId) => {
        socket.join(postId);
        io.to(socket.id).emit('messagelog', query.showMessageLog);
    });

    socket.on('comment', (postId, userId, comment, nickName) => {
        io.to(postId).emit('comment', comment);
        query.chatRecord(postId, userId, nickName, comment);
    });

    socket.on('likeUp', (commentId, userId) => {
        query.likeUp(commentId, userId);
    })

    socket.on('likeDown', (commentId, userId) => {
        query.likeDown(commentId, userId);
    })

    socket.on('disconnect', () => {
        console.log('disconnected');
    });
}

export = SocketEvent;