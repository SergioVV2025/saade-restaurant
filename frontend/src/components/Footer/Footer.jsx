import saadeLogoPink from "../../assets/saade-logo-pink.svg";

function Footer() {
  return (
    <footer className="footer">
      <img className="footer__logo" src={saadeLogoPink} alt="Saade" />

      <p className="footer__copyright">© 2026 SAADE</p>
    </footer>
  );
}

export default Footer;
