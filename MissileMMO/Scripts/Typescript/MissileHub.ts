/// <reference path="../typings/signalr/signalr.d.ts" />

interface SignalR {
    missileHub: HubProxy;
}

interface HubProxy {
    client: IMissileHubClient;
    server: IMissileHubServer;
}

interface IMissileHubClient {
    sayHello(str: string);
    updateGameEntities(entities: Array<GameEntity>);
}

interface IMissileHubServer {

}

class HubController {
    private get connection(): SignalR {
        return $.connection;
    }

    private get hub(): HubProxy {
        return $.connection.missileHub;
    }

    private get hubClient(): IMissileHubClient {
        return $.connection.missileHub.client;
    }

    private get hubServer(): IMissileHubServer {
        return $.connection.missileHub.server;
    }

    public init(): void {
        // Link all proxy methods
        this.hubClient.sayHello = this.sayHello;
        this.hubClient.updateGameEntities = this.updateGameEntities;

        // Start the SignalR connection
        this.connection.hub.start()
    }

    public sayHello(str: string) {
        console.log("Server says: '" + str + "'");
    }

    public updateGameEntities(entities: Array<GameEntity>) {
        for (var i = 0; i < entities.length; i++) {
            Application.instance.updateEntity(entities[i]);
        }
    }
}