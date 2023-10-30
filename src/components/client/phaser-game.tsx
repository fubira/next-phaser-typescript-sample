'use client';
import React, { useEffect } from 'react';
import GameApp from '@/game/PhaserGame';

const PhaserGame = () => {
  useEffect(() => {
    const app: GameApp = GameApp.start();

    return () => {
      if (app) {
        app.destroy(true);
      }
    };
  }, []);

  return <></>;
};

export default PhaserGame;
