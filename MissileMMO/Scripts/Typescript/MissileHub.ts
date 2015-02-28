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

        // Start the SignalR connection
        this.connection.hub.start()
    }

    public sayHello(str: string) {
        alert("Server says: " + str);
    }
}