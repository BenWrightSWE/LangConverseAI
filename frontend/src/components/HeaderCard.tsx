import '../css/HeaderCard.css'
import logo from '../../public/LCAI-Panel.png'

/*
 * The header card that includes the logo and app name
 */

export default function HeaderCard() {
    return (
        <div className={"HeaderCard_HeaderContainer"}>
            <h1>Lang Converse AI</h1>
            <img src={logo} alt={'Lang Converse AI logo'}/>
        </div>
    );
}

