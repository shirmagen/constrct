import EventEmitter from 'events';

export const emitter = new EventEmitter();

export default getSockets => {
  emitter.on('save', doc => {
    getSockets(_id => doc.user.equals(_id)).forEach(socket => {
      socket.emit('TODO_SAVE', doc);
    });
  });

  emitter.on('findOneAndUpdate', doc => {
    getSockets(_id => doc.user.equals(_id)).forEach(socket => {
      socket.emit('TODO_UPDATE', doc);
    });
  });

  emitter.on('findOneAndRemove', doc => {
    getSockets(_id => doc.user.equals(_id)).forEach(socket => {
      socket.emit('TODO_DELETE', doc);
    });
  });
};
