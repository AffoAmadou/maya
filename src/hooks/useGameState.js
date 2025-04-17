import { useMachine } from '@xstate/react';
import { machine } from '../config/gameMachine';
import { useEffect } from 'react';

export const useGameState = () => {
  const [state, send] = useMachine(machine);

  // Monitora i cambiamenti di stato
  useEffect(() => {
    console.log('Stato attuale:', state.value);
    console.log('Contesto:', state.context);
  }, [state]);

  const checkAssembling = (objects) => {
    const sun = objects.find(obj => obj.id === 'sun');
    const moon = objects.find(obj => obj.id === 'moon');

    if (sun && moon) {
      const distance = Math.sqrt(
        Math.pow(sun.x - moon.x, 2) + 
        Math.pow(sun.y - moon.y, 2)
      );

      console.log('Distanza:', distance); // Debug

      if (distance < 0.1) {
        console.log('Invio evento Assembling'); // Debug
        send({ type: 'Assembling' });
      }
    }
  };

  return {
    state,
    checkAssembling,
    isPrelaunch: state.matches('Prelaunch'),
    isIntroduction: state.matches('Introduction')
  };
}; 