interface GalaxyStars {
  x: number;
  y: number;
  speed: number;
  color: number;
  step: number;
}

class GalaxyBackground extends Phaser.GameObjects.Container {
  private stars: Array<GalaxyStars> = [];
  private graphics: Phaser.GameObjects.Graphics;

  public static add(scene: Phaser.Scene) {
    const object = new GalaxyBackground(scene);
    object.addToUpdateList();
    scene.children.add(object)
    return object;
  }

  constructor(scene: Phaser.Scene) {
    super(scene);
    this.graphics = scene.add.graphics();

    /**
     * Background Stars
     */
    const stars = (this.scene.scale.width + this.scene.scale.height) / 8;
    for (let count = 0; count < stars; count += 1) {
      const colors = [0xff8080, 0x80ff80, 0x8080ff, 0xffff80, 0xff80ff, 0x80ffff, 0xffffff];
      this.stars.push({
        x: Math.random() * this.scene.scale.width,
        y: Math.random() * this.scene.scale.height,
        speed: Math.random() * 0.5 + 0.5,
        color: colors[Math.floor(colors.length * Math.random())],
        step: Math.floor(Math.random() * 360),
      });
    }
  }

  public update() {
    this.graphics?.clear();
    this.stars.forEach((star: GalaxyStars) => {
      star.step = (star.step + 1) % 360;
      star.y += star.speed;

      if (star.y > this.scene.scale.height) {
        star.x = Math.random() * this.scene.scale.width;
        star.y = 0;
      }

      const alpha = Math.sin(Math.PI * (star.step / 360));

      this.graphics?.fillStyle(star.color, alpha * 0.8);
      this.graphics?.fillPoint(star.x, star.y, 2);
    });
  }
}

export default GalaxyBackground;
