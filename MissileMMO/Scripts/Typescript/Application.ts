class Application {
    public static instance: Application;
    private _hub: HubController
    public get hub(): HubController {
        return this._hub;
    }

    public game: Phaser.Game;

    constructor() {
        Application.instance = this;
    }

    public start(): void {
        this._hub = new HubController();
        this._hub.init();

        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
    }

    public preload() {
        this.game.load.image('logo', '/Assets/Images/phaser-logo-small.png');
    }

    public create() {
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
    }
}

window.addEventListener("load",() => {
    var app = new Application();
    app.start();
});