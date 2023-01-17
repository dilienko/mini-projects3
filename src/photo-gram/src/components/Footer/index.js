import "./index.css";

function Footer() {
    return (
        <footer>
            <div className='footer__content'>
                <div className='footer__text'>Created using</div>
                <div className='footer__logo'>
                    <a href='https://pixabay.com/' target='_blank'>
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/images/pixabay.png`}
                            alt='logo'
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
