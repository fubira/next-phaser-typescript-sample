class GameDefinition {
  /**
   * DebugMode
   */
  public static isDebug = false;

  /**
   * Screen Size
   */
  public static screenWidth = 960;
  public static screenHeight = 960;

  /**
   * Audio Volume
   *
   */
  public static volumeBGM = 0.4;
  public static volumeSE = 0.6;

  /**
   * Position definition 
   */
  private static calcGameCoords = (): RefernecePoints => {
    const screenLeft = 0;
    const screenTop = 0;
    const screenRight = GameDefinition.screenWidth;
    const screenBottom = GameDefinition.screenHeight;
    const screenWidth = screenRight - screenLeft;
    const screenHeight = screenBottom - screenTop;
    const screenCenterX = screenLeft + screenWidth / 2;
    const screenCenterY = screenTop + screenHeight / 2;
  
    const playerX = screenWidth / 2;
    const playerY = screenHeight - screenHeight / 6;
  
    const enemyX = screenWidth / 2;
    const enemyY = screenCenterY - 8 * 32;
  
    return {
      screenLeft,
      screenTop,
      screenRight,
      screenBottom,
      screenWidth,
      screenHeight,
      screenCenterX,
      screenCenterY,
  
      playerX,
      playerY,
      enemyX,
      enemyY,
    }
  }
  public static referencePoints: RefernecePoints = GameDefinition.calcGameCoords();
}

/**
 * ゲームに関する基準座標の定義
 */
export interface RefernecePoints {
  screenLeft: number;
  screenTop: number;
  screenRight: number;
  screenBottom: number;
  screenCenterX: number;
  screenCenterY: number;
  screenWidth: number;
  screenHeight: number;

  playerX: number;
  playerY: number;
  enemyX: number;
  enemyY: number;
}

export default GameDefinition;