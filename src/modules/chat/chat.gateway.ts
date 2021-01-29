import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway(3030)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  handleConnection(client: any, ...args: any[]) {
    console.log(`${client.id} conectado...`);
    client.broadcast.emit('users', {
      user: client.id,
      action: 'connected',
    });
  }

  handleDisconnect(client: any) {
    console.log(`${client.id} desconectado...`);
    client.broadcast.emit('users', {
      user: client.id,
      action: 'disconnected',
    });
  }

  @SubscribeMessage('chat')
  chat(cliente: any, data: any) {
    console.log(data);
    cliente.broadcast.emit('chat', data);
    return data;
  }

  @SubscribeMessage('users')
  users(cliente: any, data: any) {
    console.log(data);
    return data;
  }
}
