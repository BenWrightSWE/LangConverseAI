import '../css/Settings.css'

export function Settings() {
    return (
        <div className={"Settings_Container"}>
            <label className={"Settings_Label"}>Noisy Environment</label>
            <input
                type="checkbox"
                className={"Settings_Toggle"}
            />
        </div>
    );
}

/*

                checked={}
                onChange={}

            <input
                type="checkbox"
                checked={isDarkMode}
                onChange={() => setDarkMode(!isDarkMode)}
                className={styles.toggle}
            />
            <label className={styles.label}>Dark Mode</label>
 */