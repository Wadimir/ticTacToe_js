class AppMgr {
  constructor() {
    this.initCanvas();
  }

  initCanvas() {
    var canvas = document.getElementById("generalCanvas");
    canvas.width = SCENE_WIDTH;
    canvas.height = SCENE_HEIGHT;

    if (canvas.getContext) {
      ctx = canvas.getContext("2d");
      this.createBackground();

      this.createStartScreen();
    }

    this.addListeners();
  }

  addListeners() {
    var self = this;

    this._playGame = (event) => {
      self.playGame(event, this);
    };
    addEventListener(CLICK_PLAY_EVENT, this._playGame);

    this._gameOver = (event) => {
      self.gameOver(event, this);
    };
    addEventListener(GAME_WON_EVENT, this._gameOver);
    addEventListener(GAME_LOSE_EVENT, this._gameOver);
    addEventListener(GAME_DRAW_EVENT, this._gameOver);

    this._backToMenu = (event) => {
      self.backToMenu(event, this);
    };
    addEventListener(BACK_TO_MENU_EVENT, this._backToMenu);

    this._adComlete = (event) => {
      self.adComlete(event, this);
    };
    addEventListener(AD_COMPLETE_EVENT, this._adComlete);
  }

  createBackground() {
    const BACKROUND_COLOR = "#000000";

    ctx.fillStyle = BACKROUND_COLOR;
    ctx.fillRect(0, 0, SCENE_WIDTH, SCENE_HEIGHT);
  }

  createStartScreen() {
    this.startScreen = new StartScreen();
  }

  playGame() {
    this.clearScreen();
    this.startScreen = null;

    if (isAdAvailable) {
      initDesktopAutoplayExample();
    } else {
      this.createBackground();
      new WarningAdDialog();
    }
  }

  adComlete() {
    this.gameScreen = null;

    this.createBackground();
    this.gameScreen = new GameScreen();
  }

  gameOver(event) {
    new ResultDialog(event.detail);
  }

  backToMenu() {
    this.clearScreen();
    this.gameScreen = null;
    this.createBackground();
    this.createStartScreen();
  }

  clearScreen() {
    ctx.clearRect(0, 0, SCENE_WIDTH, SCENE_HEIGHT);
  }
}