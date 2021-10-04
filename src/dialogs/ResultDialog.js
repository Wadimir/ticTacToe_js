class ResultDialog {
  constructor(label) {
    this.TITLE_X = 830;
    this.TITLE_Y = 250;

    this.DESCRIPTION_X = 700;
    this.DESCRIPTION_Y = 320;

    this.QUESTION = "Do you want to play again?";
    this.DESCRIPTION = "You ";

    this.createBackground();
    this.createTitle(label);
    this.createButtons();
  }

  createBackground() {
    const BACKGROUND_WIDTH = 540;
    const BACKGROUND_HEIGHT = 160;
    const BACKGROUND_POSITION_X = 700;
    const BACKGROUND_POSITION_Y = 400;
    const BACKGROUND_COLOR = "#FFA500";

    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(
      BACKGROUND_WIDTH,
      BACKGROUND_HEIGHT,
      BACKGROUND_POSITION_X,
      BACKGROUND_POSITION_Y
    );
  }

  createTitle(label) {
    ctx.font = TITLE_FONT;
    ctx.fillStyle = TITLE_FONT_COLOR;

    if (label == LABEL_DRAW) {
      ctx.fillText(label, this.TITLE_X, this.TITLE_Y);
    } else {
      ctx.fillText(this.DESCRIPTION + label, this.TITLE_X, this.TITLE_Y);
    }
    ctx.fillText(
      this.QUESTION,
      this.DESCRIPTION_X,
      this.DESCRIPTION_Y
    );
  }

  createButtons() {
    const BUTTON_TRANS_X = 800;
    const BUTTON_YES_TRANS_Y = 400;
    const BUTTON_NO_TRANS_Y = 480;

    var dataYes = {
      activeImgPath:ACTIVE_BTN_Y_IMAGE,
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
        this.removeElements(false);
      }

      if (this.buttonYes != null && this.buttonYes.getActive()) {
        this.removeElements(true);
      }
    }
  }

  removeElements(param) {
    removeEventListener(KEYDOWN_EVENT, this._keyDownListener);

    var event;

    if (param) {
      event = new Event(CLICK_PLAY_EVENT);
    } else {
      event = new Event(BACK_TO_MENU_EVENT);
    }

    dispatchEvent(event);

    this.buttonYes = null;
    this.buttonNo = null;
  }
}