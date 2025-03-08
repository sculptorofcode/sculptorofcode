"use client";

import React, { createContext, useState, useCallback, useContext, useEffect, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface PageTransitionContextType {
    isTransitioning: boolean;
    navigateWithTransition: (path: string) => void;
    completeTransition: (path: string) => void;
    targetPath: string;
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined);

export const usePageTransition = (): PageTransitionContextType => {
    const context = useContext(PageTransitionContext);
    if (!context) {
        throw new Error('usePageTransition must be used within a PageTransitionProvider');
    }
    return context;
};

export const PageTransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [targetPath, setTargetPath] = useState<string>('');

    const completeTransition = function (targetPath: string) {
        if (targetPath) {
            router.push(targetPath);
            console.log('Navigating to:', targetPath);
            setTargetPath(targetPath.split('#')[0]);
            console.log('Target path:', targetPath.split('#')[0]);
        }
    };

    const navigateWithTransition = useCallback((path: string) => {
        if (path === pathname) return;

        if (!isTransitioning) {
            setIsTransitioning(true);
            setTargetPath(path);
            completeTransition(path);
        }
    }, [pathname, isTransitioning]);

    useEffect(() => {
        if (pathname === targetPath) {
            setIsTransitioning(false);
        }
    }, [pathname, targetPath]);

    const contextValue = useMemo(() => ({
        isTransitioning,
        navigateWithTransition,
        completeTransition,
        targetPath
    }), [isTransitioning, navigateWithTransition, completeTransition, targetPath]);

    return (
        <PageTransitionContext.Provider value={contextValue}>
            {children}
        </PageTransitionContext.Provider>
    );
};