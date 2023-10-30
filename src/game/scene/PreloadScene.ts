import logger from '@/logger';
import * as PixelUI from '@/game/pixelui';
import { loadWebFonts, loadPhaserAssets } from '@/game/Assets';

export default class PreloadScene extends Phaser.Scene {
  public init(): void {
    this.load.reset();
  }

  public preload(): void {
    this.load.image('progress_bar', '/assets/images/progress_bar.png');
    this.load.image('progress_frame', '/assets/images/progress_frame.png');
    loadWebFonts();
  }

  public create(): void {
    const progress = PixelUI.add.loadingProgerss(this, 'progress_bar', 'progress_frame');

    progress
      .start(() => {
        loadPhaserAssets(this.load);
        this.load.start();
      })
      .then(() => {
        this.onCompleteLoadAll();
      })
      .catch((err) => {
        logger.error(err);
      });
  }

  private onCompleteLoadAll(): void {
    const boot = this.startGame.bind(this);
    this.cameras.main.fade(250, 0, 0, 0, true, boot, this);
  }

  private startGame(): void {
    this.scene.start('TitleScene');
  }
}
