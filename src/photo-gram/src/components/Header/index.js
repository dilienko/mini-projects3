import './index.css'

function Header(){
    return (
        <header>
            <a href='/'>
                <div className="header__content">
                    <div className="header__logo">
                        <img src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} alt="logo"/>
                    </div>
                    <div className="header__brand-name">PhotoGram</div>
                </div>
            </a>
        </header>
    )
}

export default Header;