const Theme = () => {

    const defaultTheme = {
        name: "default",
        description: "default site theme",
        primary: "#000",
        primaryDark: "#333",
        primaryLight: "#fff",
        primaryAccent: "#fff",
        secondary: "#000",
        secondaryDark: "#333",
        secondaryLight: "#fff",
        secondaryAccent: "#fff",
        textPrimary: "#fff",
        textSecondary: "f4f4f4",
        textLight: "f4f4f4",
        textDark: "f4f4f4",
        backgroundColorPrimary: "#000",
        backgroundColorLight: "#000",
        backgroundColorDark: "#000",
        backgroundColorAccent: "#000",
        backgroundOpacityDark: "#000",
        backgroundOpacityLight: "#000",
        backgroundImageOn: true
    }

    return (
        <h2 defaultTheme={defaultTheme}>Theme</h2>
    )
}

export default Theme;