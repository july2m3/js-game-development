export default class Controller {
  left: boolean;

  right: boolean;

  up: boolean;

  constructor() {
    this.left = false;
    this.right = false;
    this.up = false;
  }

  keyListen = (event: any) => {
    const keyState = event.type === 'keydown';

    switch (event.keyCode) {
      case 37:
        this.left = keyState;
        break;
      case 32:
      case 38:
        this.up = keyState;
        break;
      case 39:
        this.right = keyState;
        break;
      default:
        break;
    }
  };
}
