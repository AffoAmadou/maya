import { useMachine } from '@xstate/react';
import { machine } from '../config/gameMachine';
import { useEffect } from 'react';

// Create a store to hold the state machine instance
let sendFunction = null;
let currentState = null;

export const useGameState = () => {
  const [state, send] = useMachine(machine);
  
  // Store the send function and current state for external use
  sendFunction = send;
  currentState = state;

  // Add effect to log state changes
  useEffect(() => {
    console.log('Nuovo stato del gioco:', state.value);
  }, [state]);

  const addFlowers = () => {
    send({ type: 'FlowersAdded' });
  };

  return {
    state,
    addFlowers,
    isIntroduction: state.matches('Introduction'),
    isDansingMoon: state.matches('DansingMoon'),
  };
};

// Export a function to trigger Assembling from anywhere
export const triggerAssembling = () => {
  if (sendFunction && currentState) {
    console.log('Stato attuale:', currentState.value);
    if (currentState.matches('Prelaunch')) {
      console.log('Inviando evento Assembling...');
      sendFunction({ type: 'Assembling' });
    } else {
      console.log('Non posso inviare Assembling: non sono in Prelaunch');
    }
  }
};

// Export a function to trigger FlowersAdded from anywhere
export const triggerFlowersAdded = () => {
  if (sendFunction && currentState) {
    console.log('Stato attuale:', currentState.value);
    if (currentState.matches('Introduction')) {
      console.log('Inviando evento FlowersAdded...');
      sendFunction({ type: 'FlowersAdded' });
    } else {
      console.log('Non posso inviare FlowersAdded: non sono in Introduction');
    }
  }
}; 