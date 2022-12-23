import { WebSocketGateway } from "@nestjs/websockets";
import { MessageBody, SubscribeMessage, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { OnModuleInit } from "@nestjs/common";
import { Connection, Connections } from "./connections.model";
import { Games } from "./games.model";

@WebSocketGateway()
export class MyGateway implements OnModuleInit {
    @WebSocketServer()
    server: Server;

    connections: Connections = new Connections();
    games: Games = new Games();

    @SubscribeMessage('logConnection')
    onNewMessage(
        @MessageBody() data: any) {
        const connection = new Connection(data.userId, data.socketId);
        console.log('userId: ', connection.getUserId());
        console.log('socketId: ', connection.getSocketId());
        this.connections.addConnection(connection.getUserId(), connection.getSocketId());
        this.server.emit('onLogConnection', {
            message: 'Connected',
        })
        console.log(this.connections.getConnections());
    }

    @SubscribeMessage('createGame')
    onCreateGame(
        @MessageBody() data: any) {
            console.log(data);
    }

    onModuleInit() {
        this.server.on('connection', (socket) => {
            this.server.emit('onConnection', {
                socketId: socket.id,
            })
        });
    }
}
