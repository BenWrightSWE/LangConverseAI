import '../css/Settings.css'

/*
 * The component that controls the users settings regarding whether
 * the environment they are in is noisy, which native language they are,
 * and what language they are practicing.
 */
export default function Settings({isNoisy, setIsNoisy}) {
    return (
        <div className={"Settings_Container"}>
            <label className={"Settings_Label"}>Noisy Environment</label>
            <input
                type="checkbox"
                checked={isNoisy}
                onChange={() => setIsNoisy(!isNoisy)}
                className={"Settings_Toggle"}
            />
            <label className={"Settings_Label"}>Native Language</label>
            <select id={"Settings_NativeLanguage"}>
                <option value={"en"}>English</option>
                <option value={"es"}>Spanish</option>
            </select>
            <label className={"Settings_Label"}>Practice Language</label>
            <select id={"Settings_NativeLanguage"}>
                <option value={"en"}>English</option>
                <option value={"es"}>Spanish</option>
            </select>
        </div>
    );
}