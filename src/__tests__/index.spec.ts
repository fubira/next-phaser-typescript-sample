import * as Phaser from 'phaser';

/**
 * @note
 *   I have explored unit testing the phaser component in jest,
 *   but this attempt is currently unsuccessful as Phaser.HEADLESS
 *   does not transition to the running state on jsdom.
 */
describe('Phaser game', () => {
  it('Sould transition state of HEADLESS phaser', async () => {
    const testScene = { 
      preload: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    }

    const testCallback = {
      destroy: jest.fn(),
      ready: jest.fn(),
      focus: jest.fn(),
      prerender: jest.fn(),
    }

    await new Promise((resolve) => {
      const game = new Phaser.Game({
        type: Phaser.HEADLESS,
        audio: { noAudio: true },
        parent: 'game',
        width: 800,
        height: 600,
        scene: testScene,
      });
      game.events.on('destroy', testCallback.destroy);
      game.events.on('ready', testCallback.ready);
      game.events.on('focus', testCallback.focus);
      game.events.on('prerender', testCallback.prerender);

      setTimeout(() => {
        resolve(true);
      }, 2000)
    });

    expect(testScene.preload.mock.calls.length).toBeGreaterThan(0);
    expect(testScene.create.mock.calls.length).toBeGreaterThan(0);
    expect(testScene.update.mock.calls.length).toBeGreaterThan(0);
    expect(testCallback.destroy.mock.calls.length).toBeGreaterThan(0);
    expect(testCallback.ready.mock.calls.length).toBeGreaterThan(0);
    expect(testCallback.focus.mock.calls.length).toBeGreaterThan(0);
    expect(testCallback.prerender.mock.calls.length).toBeGreaterThan(0);
  })
})
