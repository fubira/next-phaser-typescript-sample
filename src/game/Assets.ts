import WebFontLoader from 'webfontloader';

export const loadWebFonts = (): Promise<void> => {
  return new Promise((resolve) => {
    resolve();
    WebFontLoader.load({
      custom: {
        families: ['kiniro-ss'],
        urls: ['/assets/fonts/kiniro-ss.css'],
      },
      active: (): void => {
        resolve();
      },
    });
  });
};

export const loadPhaserAssets = (loader: Phaser.Loader.LoaderPlugin) => {
  loader.audioSprite('sound', '/assets/audiosprites/sound.json', ['/assets/audiosprites/sound.mp3', '/assets/audiosprites/sound.ogg']);
  loader.audio('se_click', ['/assets/audio/click.ogg', '/assets/audio/click.mp3']);
  loader.glsl('shader', '/assets/shaders/shader.frag');
};
