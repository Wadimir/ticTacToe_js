class StartScreen {
  constructor() {
    this.ANY_URL = "https://www.google.com/";

    this.createTitle();
    this.createButtons();
    this.createInstructions();
  }

  createInstructions() {
    const INSTRUCTION0_POS_X = 100;
    const INSTRUCTION0_POS_Y = 550;
    const INSTRUCTION1_POS_X = 125;
    const INSTRUCTION1_POS_Y = 600;

    const INSTRUCTION0 = "use keyboard to control the application"
    const INSTRUCTION1 = "UP, DOWN, LEFT, RIGHT, ENTER"

    ctx.font = TITLE_FONT;
    ctx.fillStyle = TITLE_FONT_COLOR;
    ctx.fillText(INSTRUCTION0, INSTRUCTION0_POS_X, INSTRUCTION0_POS_Y);
    ctx.fillText(INSTRUCTION1, INSTRUCTION1_POS_X, INSTRUCTION1_POS_Y);
  }

  createTitle() {
    const TITLE_X = 420;
    const TITLE_Y = 100;

    const QUESTION = "Do you want to play game?";

    ctx.font = TITLE_FONT;
    ctx.fillStyle = TITLE_FONT_COLOR;
    ctx.fillText(QUESTION, TITLE_X, TITLE_Y);
  }

  createButtons() {
    const BUTTON_TRANS_X = 500;
    const BUTTON_YES_TRANS_Y = 200;
    const BUTTON_NO_TRANS_Y = 300;

    var dataYes = {
      activeImgPath: ACTIVE_BTN_Y_IMAGE,
      imgPath: BTN_Y_IMAGE,
      transX: BUTTON_TRANS_X,
      transY: BUTTON_YES_TRANS_Y,
    };
    var dataNo = {
      activeImgPath: ACTIVE_BTN_N_IMAGE,
      imgPath: BTN_N_IMAGE,
      transX: BUTTON_TRANS_X,
      transY: BUTTON_NO_TRANS_Y,
    };

    this.buttonYes = new Button(dataYes);
    this.buttonNo = new Button(dataNo);

    this.buttonYes.setActive(true);

    var self = this;

    this._keyDownListener = (event) => {
      self.keyDownListener(event, this);
    };
    addEventListener(KEYDOWN_EVENT, this._keyDownListener);
  }

  keyDownListener(event) {
    var code = event.keyCode;

    if (code === KEY_DOWN) {
      if (this.buttonYes.getActive()) {
        this.buttonYes.setActive(false);
        this.buttonNo.setActive(true);
      }
    } else if (code === KEY_UP) {
      if (this.buttonNo.getActive()) {
        this.buttonYes.setActive(true);
        this.buttonNo.setActive(false);
      }
    } else if (code === KEY_ENTER) {
      if (this.buttonNo.getActive()) {
        open(this.ANY_URL, "_self");
      }

      if (this.buttonYes.getActive()) {
        this.removeElements();
      }
    }
  }

  removeElements() {
    removeEventListener(KEYDOWN_EVENT, this._keyDownListener);

    var event = new Event(CLICK_PLAY_EVENT);
    dispatchEvent(event);

    this.buttonYes = null;
    this.buttonNo = null;
  }
}