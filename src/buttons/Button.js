class Button {
  constructor(data) {
    this.allocationData(data);
    this.drawElement();
  }

  allocationData(data) {
    this.activeImgPath = data.activeImgPath;
    this.imgPath = data.imgPath;
    this.transX = data.transX;
    this.transY = data.transY;

    this.isActive = false;
  }

  drawElement() {
    this.img = new Image();
    this.setImage(this.imgPath);
  }

  setImage(path) {
    this.img.src = path;
    var transX = this.transX;
    var transY = this.transY;

    this.img.onload = function () {
      ctx.drawImage(this, transX, transY);
    };
  }

  setActive(param) {
    if (param) {
      this.setImage(this.activeImgPath);
      this.isActive = true;
    } else {
      this.setImage(this.imgPath);
      this.isActive = false;
    }
  }

  getActive() {
    return this.isActive;
  }
}