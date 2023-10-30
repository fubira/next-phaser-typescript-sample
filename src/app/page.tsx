import React from 'react';
import dynamic from 'next/dynamic';

const ClientPhaserGame = dynamic(() => import('@/components/client/phaser-game'), { ssr: false });

export default function Page() {
  return <ClientPhaserGame />;
}
