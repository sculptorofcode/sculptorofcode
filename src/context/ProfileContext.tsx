"use client";

import React, { createContext, useContext, ReactNode } from 'react';

interface ProfileContextType {
  linkedIn: string;
  github: string;
  contactEmail: string;
}

const defaultProfileContext: ProfileContextType = {
  linkedIn: '',
  github: '',
  contactEmail: '',
};

const ProfileContext = createContext<ProfileContextType>(defaultProfileContext);

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const profileData: ProfileContextType = {
    linkedIn: 'https://www.linkedin.com/in/saikat-roy-358204294/',
    github: 'https://github.com/sculptorofcode',
    contactEmail: 'saikatroydot@gmail.com',
  };

  return (
    <ProfileContext.Provider value={profileData}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => useContext(ProfileContext);
