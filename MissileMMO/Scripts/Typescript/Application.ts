class Application {
    public static instance: Application;
    private _hub: HubController
    public get hub(): HubController {
        return this._hub;
    }

    private stage: createjs.Stage;
    private gameEntities: { [entityId: string]: GameEntity; } = {};

    constructor() {
        Application.instance = this;
    }

    public start(): void {
        this._hub = new HubController();
        this._hub.init();

        this.stage = new createjs.Stage(document.getElementById("game"));
        this.stage.autoClear = true;
        createjs.Ticker.setFPS(60);
        var tick_bind = this.tick.bind(this);
        createjs.Ticker.addEventListener("tick", tick_bind);
    }

    public updateEntity(entity: GameEntity): void {
        if (typeof this.gameEntities[entity.entityId] !== 'undefined') {
            // Update properties
            for (var prop in entity) {
                this.gameEntities[entity.entityId][prop] = entity[prop];
            }
        } else {
            // Instantiate new object and update properties
            var newEntity = new window[entity.entityName]();
            for (var prop in entity) {
                newEntity[prop] = entity[prop];
            }
            this.gameEntities[entity.entityId] = newEntity;
            this.stage.addChild(newEntity);
        }
    }

    public tick(): void {
        this.stage.update();
    }
}

window.addEventListener("load",() => {
    var app = new Application();
    app.start();
});