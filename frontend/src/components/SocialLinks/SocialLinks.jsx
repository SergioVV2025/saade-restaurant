import instagramIcon from "../../assets/icons/instagram.svg";
import tiktokIcon from "../../assets/icons/tiktok.svg";

const icons = {
  instagram: instagramIcon,
  tiktok: tiktokIcon,
};

function SocialLink({ platform, label, href }) {
  console.log(platform, icons[platform]);
  return (
    <a
      className="social-link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit Saade on ${label}`}
    >
      <span
        className="social-link__icon"
        style={{ "--social-icon": `url("${icons[platform]}")` }}
        aria-hidden="true"
      />

      <span>{label}</span>
    </a>
  );
}

export default SocialLink;
