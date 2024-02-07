import React, { useState, useEffect } from "react";
import "./toggler.css";
import { MdLightMode, MdDarkMode } from "react-icons/md";

function Toggler() {
    // Set initial state based on values in localStorage
    useEffect(() => {
        const storedIsToggled = localStorage.getItem("isToggled") === "true";
        const storedTitle = localStorage.getItem("title") || "Change to Dark Mode";
        setIsToggled(storedIsToggled);
        setTitle(storedTitle);
    }, []);

    const [isToggled, setIsToggled] = useState(false);
    const [title, setTitle] = useState("Change to Dark Mode");

    const handleToggle = () => {
        setIsToggled((prev) => !prev);
        setTitle((prev) => (prev === "Change to Dark Mode" ? "Change to Light Mode" : "Change to Dark Mode"));
    };

    useEffect(() => {
        localStorage.setItem("isToggled", isToggled);
        localStorage.setItem("title", title);
    }, [isToggled, title]);

    useEffect(() => {
        const body = document.body;
        if (isToggled) {
            body.classList.remove("dark-theme");
        } else {
            body.classList.add("dark-theme");
        }
    }, [isToggled]);

    return (
        <div className="toggle-switch" onClick={handleToggle}>
            <span className={`toggle-slider ${isToggled ? 'light-mode' : 'dark-mode'}`}>
                {!isToggled ? <MdDarkMode className="dark-icon" /> : <MdLightMode className="light-icon" />}
            </span>
        </div>
    );
}

export default Toggler;
