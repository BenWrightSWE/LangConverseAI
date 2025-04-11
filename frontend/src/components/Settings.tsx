import '../css/Settings.css'
import { useRef } from "react";

/*
 * The component that controls the users settings regarding whether
 * the environment they are in is noisy, which native language they are,
 * and what language they are practicing.
 */

export default function Settings({ isNoisy, setIsNoisy, practiceLangRef }) {

    // Sets the reference for the practice language so that the correct language can be used in translation.
    const setPracLang = () => {
        practiceLangRef.current = document.getElementById("Settings_PracticeLanguage").value;
    }

    return (
        <div className={"Settings_Container"}>
            <label className={"Settings_Label"}>Noisy Environment</label>
            <input
                type="checkbox"
                checked={isNoisy}
                onChange={() => setIsNoisy(!isNoisy)}
                className={"Settings_Toggle"}
            />
            <label className={"Settings_Label"}>Practice Language</label>
            <select id={"Settings_PracticeLanguage"} onChange={setPracLang}>
                <option value={"en-US"}>English</option>
                <option value={"es-MX"}>Spanish</option>
            </select>
        </div>
    );
}