class GameScreen {
  constructor() {
    this.FIELD_IMAGE_PATH = "img/field.png";
    this.FRAME_IMAGE_PATH = "img/frame.png";

    this.TIC_IMAGE_PATH = "img/tic.png";
    this.TAC_IMAGE_PATH = "img/tac.png";

    this.PLAYER_TEXT_TRANSLATION = [650, 200];
    this.AI_TEXT_TRANSLATION = [741, 310];

    this.ELEMENTS_COLOR = "#FFFFFF";
    this.ELEMENTS_FONT = "48px Arial";

    this.TIC_LABEL = "tic";
    this.TAC_LABEL = "tac";

    this.PLAYER_NAME = "Player - ";
    this.AI_NAME = "AI - ";

    this.FIELD_SIZE = 3;

    this.PX = "px";

    this.MATRIX_COORDS = [
      [
        { posX: 62, posY: 58 },
        { posX: 200, posY: 58 },
        { posX: 335, posY: 58 },
      ],
      [
        { posX: 62, posY: 198 },
        { posX: 200, posY: 198 },
        { posX: 337, posY: 198 },
      ],
      [
        { posX: 62, posY: 338 },
        { posX: 200, posY: 338 },
        { posX: 335, posY: 338 },
      ],
    ];

    this.frameCurrentPosition = [0, 0];

    this.winner = "";

    this.framePositionX = 0;
    this.framePositionY = 0;

    this.moveMatrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    this.createField();
    this.createInstructions();
    this.chipSelection();
    this.initFrame();

    var self = this;

    this._keyDownListener = (event) => {
      self.keyDownListener(event, this);
    };
    addEventListener(KEYDOWN_EVENT, this._keyDownListener);
  }

  createField() {
    const FIELD_TRANSLATION = 50;

    var fieldImg = new Image();
    fieldImg.src = this.FIELD_IMAGE_PATH;

    fieldImg.onload = function () {
      ctx.drawImage(this, FIELD_TRANSLATION, FIELD_TRANSLATION);
    };
  }

  createInstructions() {
    ctx.font = this.ELEMENTS_FONT;
    ctx.fillStyle = this.ELEMENTS_COLOR;
    ctx.fillText(
      this.PLAYER_NAME,
      this.PLAYER_TEXT_TRANSLATION[0],
      this.PLAYER_TEXT_TRANSLATION[1]
    );

    ctx.font = this.ELEMENTS_FONT;
    ctx.fillStyle = this.ELEMENTS_COLOR;
    ctx.fillText(
      this.AI_NAME,
      this.AI_TEXT_TRANSLATION[0],
      this.AI_TEXT_TRANSLATION[1]
    );
  }

  chipSelection() {
    const PIC_SIZE = 50;
    const PIC_X = 830;
    const TIC_Y = 160;
    const TAC_Y = 270;

    this.rand = Boolean(Math.round(Math.random()));

    var ticX = 0;
    var ticY = 0;

    var tacX = 0;
    var tacY = 0;

    var ticImg = new Image();
    var tacImg = new Image();

    ticImg.src = this.TIC_IMAGE_PATH;
    tacImg.src = this.TAC_IMAGE_PATH;

    if (this.rand) {
      ticX = PIC_X;
      ticY = TIC_Y;

      tacX = PIC_X;
      tacY = TAC_Y;
    } else {
      ticX = PIC_X;
      ticY = TAC_Y;

      tacX = PIC_X;
      tacY = TIC_Y;

      this.aiStep();
    }

    ticImg.onload = function () {
      ctx.drawImage(this, ticX, ticY, PIC_SIZE, PIC_SIZE);
    };

    tacImg.onload = function () {
      ctx.drawImage(this, tacX, tacY, PIC_SIZE, PIC_SIZE);
    };
  }

  initFrame() {
    const FRAME_TRANSLATION = 60;

    this.imgFrame = document.createElement("img");
    this.imgFrame.src = this.FRAME_IMAGE_PATH;

    this.frame = document.getElementById("frame");

    this.frame.appendChild(this.imgFrame);

    this.frame.style.left = FRAME_TRANSLATION + this.PX;
    this.frame.style.top = FRAME_TRANSLATION + this.PX;
  }

  keyDownListener(event) {
    var code = event.keyCode;

    switch (code) {
      case KEY_RIGHT:
        this.moveFrameRight();
        break;

      case KEY_LEFT:
        this.moveFrameLeft();
        break;

      case KEY_UP:
        this.moveFrameUp();
        break;

      case KEY_DOWN:
        this.moveFrameDown();
        break;

      case KEY_ENTER:
        this.playerStep();
        break;
    }
  }

  moveFrameRight() {
    var xPos = this.frameCurrentPosition[0] + 1;
    var yPos = this.frameCurrentPosition[1];

    if (this.moveMatrix[xPos] != null && this.moveMatrix[yPos] != null) {
      this.frameCurrentPosition[0] = xPos;

      var coord = this.MATRIX_COORDS[yPos][xPos];

      this.framePositionX = coord.posX;
      this.frame.style.left = this.framePositionX + this.PX;
    }
  }

  moveFrameLeft() {
    var xPos = this.frameCurrentPosition[0] - 1;
    var yPos = this.frameCurrentPosition[1];

    if (this.moveMatrix[xPos] != null && this.moveMatrix[yPos] != null) {
      this.frameCurrentPosition[0] = xPos;

      var coord = this.MATRIX_COORDS[yPos][xPos];

      this.framePositionX = coord.posX;
      this.frame.style.left = this.framePositionX + this.PX;
    }
  }

  moveFrameUp() {
    var xPos = this.frameCurrentPosition[0];
    var yPos = this.frameCurrentPosition[1] - 1;

    if (this.moveMatrix[xPos] != null && this.moveMatrix[yPos] != null) {
      this.frameCurrentPosition[1] = yPos;

      var coord = this.MATRIX_COORDS[yPos][xPos];

      this.framePositionY = coord.posY;
      this.frame.style.top = this.framePositionY + this.PX;
    }
  }

  moveFrameDown() {
    var xPos = this.frameCurrentPosition[0];
    var yPos = this.frameCurrentPosition[1] + 1;

    if (this.moveMatrix[xPos] != null && this.moveMatrix[yPos] != null) {
      this.frameCurrentPosition[1] = yPos;

      var coord = this.MATRIX_COORDS[yPos][xPos];

      this.framePositionY = coord.posY;
      this.frame.style.top = this.framePositionY + this.PX;
    }
  }

  playerStep() {
    var value =
      this.moveMatrix[this.frameCurrentPosition[0]][
        this.frameCurrentPosition[1]
      ];

    if (value === 0) {
      if (this.rand) {
        this.moveMatrix[this.frameCurrentPosition[0]][
          this.frameCurrentPosition[1]
        ] = 1;
        this.addTicTac(
          this.TIC_IMAGE_PATH,
          this.frameCurrentPosition[0],
          this.frameCurrentPosition[1]
        );
      } else {
        this.moveMatrix[this.frameCurrentPosition[0]][
          this.frameCurrentPosition[1]
        ] = 2;
        this.addTicTac(
          this.TAC_IMAGE_PATH,
          this.frameCurrentPosition[0],
          this.frameCurrentPosition[1]
        );
      }

      if (!this.checkWinCombinations()) {
        if (this.isFreeField()) {
          this.aiStep();
        } else {
          this.gameOver();
        }
      } else {
        this.gameOver();
      }
    }
  }

  aiStep() {
    var step = true;
    var row = 0;
    var col = 0;

    while (step) {
      row = Math.floor(Math.random() * this.FIELD_SIZE);
      col = Math.floor(Math.random() * this.FIELD_SIZE);

      if (
        this.moveMatrix[row][col] != null &&
        this.moveMatrix[row][col] === 0
      ) {
        step = false;

        if (!this.rand) {
          this.moveMatrix[row][col] = 1;
          this.addTicTac(this.TIC_IMAGE_PATH, row, col);
        } else {
          this.moveMatrix[row][col] = 2;
          this.addTicTac(this.TAC_IMAGE_PATH, row, col);
        }
      }
    }

    if (!this.checkWinCombinations()) {
      if (!this.isFreeField()) {
        this.gameOver();
      }
    } else {
      this.gameOver();
    }
  }

  addTicTac(path, row, col) {
    var img = new Image();
    img.src = path;

    var coords = this.MATRIX_COORDS[col][row];

    var posX = coords.posX;
    var posY = coords.posY;

    img.onload = function () {
      ctx.drawImage(img, posX, posY);
    };
  }

  checkWinCombinations() {
    const TIC_WIN_VALUE = 1;
    const TAC_WIN_VALUE = 2;

    var len = this.moveMatrix.length;

    for (var i = 0; i < len; i++) {
      if (
        this.moveMatrix[i][0] == TIC_WIN_VALUE &&
        this.moveMatrix[i][1] == TIC_WIN_VALUE &&
        this.moveMatrix[i][2] == TIC_WIN_VALUE
      ) {
        this.winner = this.TIC_LABEL;
        return true;
      }

      if (
        this.moveMatrix[0][i] == TIC_WIN_VALUE &&
        this.moveMatrix[1][i] == TIC_WIN_VALUE &&
        this.moveMatrix[2][i] == TIC_WIN_VALUE
      ) {
        this.winner = this.TIC_LABEL;
        return true;
      }

      if (
        this.moveMatrix[i][0] == TAC_WIN_VALUE &&
        this.moveMatrix[i][1] == TAC_WIN_VALUE &&
        this.moveMatrix[i][2] == TAC_WIN_VALUE
      ) {
        this.winner = this.TAC_LABEL;
        return true;
      }

      if (
        this.moveMatrix[0][i] == TAC_WIN_VALUE &&
        this.moveMatrix[1][i] == TAC_WIN_VALUE &&
        this.moveMatrix[2][i] == TAC_WIN_VALUE
      ) {
        this.winner = this.TAC_LABEL;
        return true;
      }
    }

    if (
      this.moveMatrix[0][0] == TIC_WIN_VALUE &&
      this.moveMatrix[1][1] == TIC_WIN_VALUE &&
      this.moveMatrix[2][2] == TIC_WIN_VALUE
    ) {
      this.winner = this.TIC_LABEL;
      return true;
    }

    if (
      this.moveMatrix[0][2] == TIC_WIN_VALUE &&
      this.moveMatrix[1][1] == TIC_WIN_VALUE &&
      this.moveMatrix[2][0] == TIC_WIN_VALUE
    ) {
      this.winner = this.TIC_LABEL;
      return true;
    }

    if (
      this.moveMatrix[0][0] == TAC_WIN_VALUE &&
      this.moveMatrix[1][1] == TAC_WIN_VALUE &&
      this.moveMatrix[2][2] == TAC_WIN_VALUE
    ) {
      this.winner = this.TAC_LABEL;
      return true;
    }

    if (
      this.moveMatrix[0][2] == TAC_WIN_VALUE &&
      this.moveMatrix[1][1] == TAC_WIN_VALUE &&
      this.moveMatrix[2][0] == TAC_WIN_VALUE
    ) {
      this.winner = this.TAC_LABEL;
      return true;
    }

    return false;
  }

  isFreeField() {
    var len = this.moveMatrix.length;

    for (var i = 0; i < len; i++) {
      var insLen = this.moveMatrix[i].length;

      for (var j = 0; j < insLen; j++) {
        if (this.moveMatrix[i][j] == 0) {
          return true;
        }
      }
    }
    this.winner = LABEL_DRAW;
    return false;
  }

  gameOver() {
    if (this.winner == this.TIC_LABEL) {
      if (this.rand) {
        this.wonGame();
      } else {
        this.loseGame();
      }
    } else if (this.winner == this.TAC_LABEL) {
      if (this.rand) {
        this.loseGame();
      } else {
        this.wonGame();
      }
    } else if (this.winner == LABEL_DRAW) {
      this.drawGame();
    }
  }

  wonGame() {
    var event = new CustomEvent(GAME_WON_EVENT, { detail: LABEL_WON });
    dispatchEvent(event);
    this.removeElements();
  }

  loseGame() {
    var event = new CustomEvent(GAME_LOSE_EVENT, { detail: LABEL_LOSE });
    dispatchEvent(event);
    this.removeElements();
  }

  drawGame() {
    var event = new CustomEvent(GAME_DRAW_EVENT, { detail: LABEL_DRAW });
    dispatchEvent(event);
    this.removeElements();
  }

  removeElements() {
    removeEventListener(KEYDOWN_EVENT, this._keyDownListener);
    this.frame.removeChild(this.imgFrame);

    this.moveMatrix = null;
    this.frame = null;
    this.imgFrame = null;
  }
}