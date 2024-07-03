"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

type StateContextType = {
  state: string;
  setState: (value: string) => void;
};

const StateContext = createContext<StateContextType | undefined>(undefined);

const StateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<string>('home');  // Set initial state to "home"

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
};

const useGlobalState = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a StateProvider');
  }
  return context;
};

export { StateProvider, useGlobalState };
