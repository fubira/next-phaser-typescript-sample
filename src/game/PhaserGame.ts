import * as Phaser from 'phaser';
import BootScene from './scene/BootScene';
import PreloadScene from './scene/PreloadScene';
import TitleScene from './scene/TitleScene';
import Settings from './GameDefinition';

class PhaserGame extends Phaser.Game {
  public static start(): PhaserGame {
    const gameConfig: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      render: {
        pixelArt: false,
        antialias: true,
        antialiasGL: true,
      },
      width: Settings.screenWidth,
      height: Settings.screenHeight,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      input: {
        gamepad: true,
      },
      physics: {
        default: 'arcade',
      },
      parent: '',
    };
    return new PhaserGame(gameConfig);
  }

  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
    this.scene.add('BootScene', BootScene);
    this.scene.add('PreloadScene', PreloadScene);
    this.scene.add('TitleScene', TitleScene);
    this.scene.start('BootScene');
  }
}

export default PhaserGame;
