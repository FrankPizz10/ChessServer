export class Connection {
    private userId: string;
    private socketId: string;

    constructor(userId: string, socketId: string) {
        this.userId = userId;
        this.socketId = socketId;
    }

    public getUserId() {
        return this.userId;
    }

    public getSocketId() {
        return this.socketId;
    }
}

export class Connections {
    private connections: Connection[];

    constructor() {
        this.connections = [];
    }

    public addConnection(userId: string, socketId: string) {
        this.connections.push(new Connection(userId, socketId));
    }

    public removeConnection(socketId: string) {
        this.connections = this.connections.filter((connection) => connection.getSocketId() !== socketId);
    }

    public getConnections() {
        return this.connections;
    }

    public getConnection(userId: string) {
        return this.connections.find((connection) => connection.getUserId() === userId);
    }
}