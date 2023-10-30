
import * as PixelUI from '@/game/pixelui';
import GameDefinition from '@/game/GameDefinition';
import BgmPlayer from '@/game/utils/BgmPlayer';
import GalaxyBackground from '../components/GalaxyBackground';

export default class TitleScene extends Phaser.Scene {
  private tapToStartText?: Phaser.GameObjects.GameObject;
  private galaxyBackground?: GalaxyBackground;
  private shaderBackground?: Phaser.GameObjects.Shader;
  private debugInfo?: PixelUI.DebugInfo;

  public init(): void {
    this.sound.setVolume(GameDefinition.volumeSE);
    BgmPlayer.instance.volume = GameDefinition.volumeBGM;
  }

  public preload(): void {
    /**
     * Play BGM
     */
    BgmPlayer.instance.play([
      'assets/audio/bgm.mp3',
      'assets/audio/bgm.ogg'
    ]);
  }


  public create(): void {
    this.cameras.main.flash(400, 0, 0, 0);

    /**
     * initialize shader for background
     */
    const shaderWidth = this.cameras.main.width;
    const shaderHeight = this.cameras.main.height;
    this.shaderBackground = this.add.shader(
      'shader',
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      shaderWidth,
      shaderHeight
    );
    this.galaxyBackground = new GalaxyBackground(this);

    const spaceKey = this.input.keyboard?.addKey("SPACE");
    spaceKey?.on("down", () => {
      this.startGame();
    });
    this.input.on("pointerdown", () => {
      this.startGame();
    });

    /**
     * Debug info
     */
    this.debugInfo = PixelUI.add.debugInfo(this).setVisible(GameDefinition.isDebug);

    /**
     * UI
     */
    PixelUI.add.textLabel(
      this,
      0,
      0,
      ["Hello Phaser!", "Multi Line", "日本語メッセージ"],
      {
        textSize: "large",
        color: PixelUI.theme.styles.colorLightAccent,
        fixedWidth: GameDefinition.screenWidth,
        align: "right",
        padding: { x: 20, y: 20 },
      }
    );

    this.tapToStartText = PixelUI.add.textLabel(
      this,
      0,
      GameDefinition.screenHeight - 80,
      "Tap to Start",
      {
        textSize: "small",
        fixedWidth: GameDefinition.screenWidth,
        align: "center",
      }
    );

    this.tweens.add({
      targets: [this.tapToStartText],
      alpha: { from: 0, to: 1 },
      ease: "CubicOut",
      duration: 800,
      repeat: -1,
      yoyo: true,
    });

    PixelUI.add.button(
      this,
      this.cameras.main.centerX,
      350,
      "Information Dialog",
      async () => await this.showDialog()
    );
    PixelUI.add.button(
      this,
      this.cameras.main.centerX,
      450,
      "Small Dialog",
      async () => await this.showDialogSmall()
    );
    PixelUI.add.button(
      this,
      this.cameras.main.centerX,
      550,
      "Toast",
      async () => await this.showToast()
    );
    PixelUI.add.toggleButton(
      this,
      this.cameras.main.centerX,
      650,
      "ToggleButton",
      async (toggle: boolean) => await this.showToggleState(toggle),
      true
    );
  }

  private async showDialog(): Promise<void> {
    this.sound.play('se_click');
    const dialog = PixelUI.add.dialog(
      this,
      "ダイアログテスト",
      [
        "Hello world! The quick brown fox jumps over the lazy dog! 1234567890 ",
        "",
        "おはようございます。",
        "今日も一日頑張りましょう。",
        "",
        "どんぐりころころ ドンブリコ お池にはまって さあ大変 どじょうが出て来て 今日は 坊ちゃん一緒に 遊びましょう",
      ],
      {
        buttons: [
          { text: "Ok", value: "ok" },
          { text: "キャンセル", value: "cancel" },
          { text: "???", value: "???" },
        ],
        onSelect: (_value) => {
          this.sound.play('se_click');
        },
      }
    );
    await dialog.open();
  }

  private async showDialogSmall(): Promise<void> {
    this.sound.play('se_click');
    const dialog = PixelUI.add.dialog(this, '', "Are you Ok?", {
      buttons: [{ text: "Ok", value: "ok" }],
      backdropClose: true,
      onSelect: () => {
        this.sound.play('se_click');
      },
    });
    await dialog.open();
  }

  index = 0;
  private async showToast(): Promise<void> {
    this.sound.play('se_click');
    if (this.index % 3 === 0) {
      PixelUI.add.toast(
        this,
        undefined,
        `Hi! this is toast message! (${this.index})`,
        { verticalAlign: "top" }
      );
    }
    if (this.index % 3 === 1) {
      PixelUI.add.toast(
        this,
        "Success",
        `Hi! this is toast success! (${this.index})`,
        { verticalAlign: "top", type: "success" }
      );
    }
    if (this.index % 3 === 2) {
      PixelUI.add.toast(
        this,
        "Error",
        `Hi! this is toast danger! (${this.index})`,
        { verticalAlign: "top", type: "error" }
      );
    }
    this.index += 1;
    return Promise.resolve();
  }

  public update(): void {
    this.debugInfo?.update();
    this.galaxyBackground?.update();
  }

  private async showToggleState(toggle: boolean): Promise<void> {
    this.sound.play('se_click');
    PixelUI.add.toast(this, undefined, `Toggled! (${toggle})`, {
      verticalAlign: "top",
    });
    this.shaderBackground && (this.shaderBackground.setVisible(!toggle));
    return Promise.resolve();
  }

  private startGame(): void {
    if (this.tapToStartText) {
      this.tapToStartText.destroy();
      this.tapToStartText = undefined;
    }
  }
}
