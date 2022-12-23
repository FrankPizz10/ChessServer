export class Game {
    private gameId: string;
    private user1Id: string;
    private user2Id: string;
    private gameState: any;

    constructor(gameId: string, user1Id: string, user2Id: string, gameState: any) {
        this.gameId = gameId;
        this.user1Id = user1Id;
        this.user2Id = user2Id;
        this.gameState = gameState;
    }

    public getGameId() {
        return this.gameId;
    }

    public getUser1Id() {
        return this.user1Id;
    }

    public getUser2Id() {
        return this.user2Id;
    }

    public getGameState() {
        return this.gameState;
    }
}

export class Games {
    private games: Game[];

    constructor() {
        this.games = [];
    }

    public addGame(gameId: string, user1Id: string, user2Id: string, gameState: any) {
        this.games.push(new Game(gameId, user1Id, user2Id, gameState));
    }

    public removeGame(gameId: string) {
        this.games = this.games.filter((game) => game.getGameId() !== gameId);
    }

    public getGames() {
        return this.games;
    }

    public getGame(gameId: string) {
        return this.games.find((game) => game.getGameId() === gameId);
    }

    public getGameByUser(userId: string) {
        return this.games.find((game) => game.getUser1Id() === userId || game.getUser2Id() === userId);
    }

    public getGameByUserAndOpponent(userId: string, opponentId: string) {
        return this.games.find((game) => (game.getUser1Id() === userId && game.getUser2Id() === opponentId) || (game.getUser1Id() === opponentId && game.getUser2Id() === userId));
    }
}