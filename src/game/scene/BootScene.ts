import * as PixelUI from '@/game/pixelui';

export default class BootScene extends Phaser.Scene {
  public init(): void {
    this.scale.refresh();
  }

  public preload(): void {}

  public create(): void {
    PixelUI.theme.update({
      themeDark: false,
      textShadow: true,
      textStroke: true,
      textFontFamily: 'kiniro-ss',
      textSizeSmall: 30,
      textSizeNormal: 34,
      textSizeLarge: 46,
    });
    this.scene.start('PreloadScene');
  }
}
