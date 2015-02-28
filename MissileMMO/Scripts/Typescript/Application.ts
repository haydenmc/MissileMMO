class Application {
    public static instance: Application;
    private _hub: HubController
    public get hub(): HubController {
        return this._hub;
    }

    private stage: createjs.Stage;

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

    public tick(): void {
        this.stage.update();
    }
}

window.addEventListener("load",() => {
    var app = new Application();
    app.start();
});