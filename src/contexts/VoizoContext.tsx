"use client";

import React, { createContext, useContext, useState } from "react";

type VoizoState = {};

const initialState: VoizoState = {};

const VoizoContext = createContext<VoizoState>(initialState);

export const VoizoContextProvider: any = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<VoizoState>(initialState);
  const store: VoizoState = {};

  return (
    <VoizoContext.Provider value={store}> {children}</VoizoContext.Provider>
  );
};

export const useVoizoContext = () => useContext(VoizoContext);
