'use client'
import PlasmaBackground from './components/PlasmaBackground'
import { PlayerControl } from './components/PlayerControl'
import { useState } from 'react'

export default function Home() {
  const [id, setId] = useState<string>('');

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <PlasmaBackground />
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <h1 className="text-4xl font-bold text-white">Bem-vindo ao Plasma</h1>
      </div>
      <div className='min-h-[100px] w-full flex items-center justify-center flex-col'>
      <PlayerControl id={id} setId={setId}/>
      </div>
    </div>
    );
}