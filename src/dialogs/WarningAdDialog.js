class WarningAdDialog {
  constructor() {
    this.createBackground();
    this.createDescription();
  }

  createBackground() {
    const BACKGROUND_WIDTH = 370;
    const BACKGROUND_HEIGHT = 160;
    const BACKGROUND_POSITION_X = 500;
    const BACKGROUND_POSITION_Y = 300;
    const BACKGROUND_COLOR = "#FFA500";

    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(
      BACKGROUND_WIDTH,
      BACKGROUND_HEIGHT,
      BACKGROUND_POSITION_X,
      BACKGROUND_POSITION_Y
    );
  }

  createDescription() {
    const WARNING0 = "disable all";
    const WARNING1 = " AD BLOCKERS ";
    const WARNING2 = "to proceed";

    const WARNING_COLOR = "#FF0000";

    const WARNING0_POS_X = 550;
    const WARNING0_POS_Y =  260

    const WARNING1_POS_X = 495;
    const WARNING1_POS_Y =  310;

    const WARNING2_POS_X = 545;
    const WARNING2_POS_Y =  355;

    ctx.font = TITLE_FONT;
    ctx.fillStyle = TITLE_FONT_COLOR;

    ctx.fillText(WARNING0, WARNING0_POS_X, WARNING0_POS_Y);

    ctx.fillStyle = WARNING_COLOR;
    ctx.fillText(WARNING1, WARNING1_POS_X, WARNING1_POS_Y);

    ctx.fillStyle = TITLE_FONT_COLOR;
    ctx.fillText(WARNING2, WARNING2_POS_X, WARNING2_POS_Y);
  }
}