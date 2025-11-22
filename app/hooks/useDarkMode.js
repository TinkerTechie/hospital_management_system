// Reusable dark mode toggle function
export const useDarkMode = () => {
    const [dark, setDark] = React.useState(false);

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            const theme = localStorage.getItem("theme");
            setDark(theme === "dark");
        }
    }, []);

    const toggleDark = () => {
        const newTheme = !dark;
        setDark(newTheme);
        if (typeof window !== "undefined") {
            localStorage.setItem("theme", newTheme ? "dark" : "light");
            if (newTheme) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }
    };

    return { dark, toggleDark };
};
