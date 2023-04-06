import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets/decorators';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;
  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('connected:', socket.id);
      console.log(this.server.sockets.sockets);
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onMessage', {
      msg: 'New Message',
      content: body,
    });
  }
}
