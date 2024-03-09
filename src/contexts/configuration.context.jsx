import { createContext, useState } from "react";

import { themeTokenName } from '../config';

export const ConfigurationContext = createContext({
    configuration: {},
    setConfiguration: () => null,
    theme: {},
    colors: {},
    setAppTheme: () => null
});

export const ConfigurationProvider = ({ children }) => {
    const themeToken = localStorage.getItem(themeTokenName);
    const [ configuration, setConfiguration ] = useState({});
    const [ theme, setTheme ] = useState(themeToken ? JSON.parse(themeToken) : {});
    const [ colors, setColors ] = useState(themeToken ? JSON.parse(themeToken).colors.primary : {});

    const setAppTheme = (theme, colors) => {
        localStorage.setItem(themeTokenName, JSON.stringify(theme));
        setTheme(theme);
        setColors(colors);
    }
    
    const value = { configuration, setConfiguration, theme, colors, setAppTheme };

    return <ConfigurationContext.Provider value={value}>{children}</ConfigurationContext.Provider>;
};