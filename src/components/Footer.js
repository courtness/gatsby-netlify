import React from "react";
import { Link } from "gatsby";
import FacebookIcon from "~components/svg/FacebookIcon";
import InstagramIcon from "~components/svg/InstagramIcon";
import TwitterIcon from "~components/svg/TwitterIcon";
import LinkedInIcon from "~components/svg/LinkedInIcon";
import YouTubeIcon from "~components/svg/YouTubeIcon";

const Footer = () => (
  <footer className="footer w-full relative pt-12 pb-12 bg-black text-white">
    <div className="grid">
      <ul className="grid-end-3 xs:grid-end-12 relative">
        <h3 className="f5 italic">
          <Link to="/" className="inline-block py-1 hover-underline">
            logo™
          </Link>
        </h3>
      </ul>

      <div className="grid-end-3 xs:grid-end-6 relative xs:mt-12">
        <h4 className="mb-4 b2">Story</h4>

        <ul>
          <li className="caption uppercase">
            <Link to="/about" className="inline-block py-1 hover-underline">
              About
            </Link>
          </li>

          <li className="caption uppercase">
            <Link to="/blog" className="inline-block py-1 hover-underline">
              Blog
            </Link>
          </li>
        </ul>
      </div>

      <div className="grid-end-3 xs:grid-end-12 relative xs:mt-6">
        <h4 className="mb-4 b2">Help</h4>

        <ul className="xs:flex flex-wrap">
          <li className="xs:w-1/2 caption uppercase">
            <Link to="/contact" className="inline-block py-1 hover-underline">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <div className="grid-end-12 flex justify-between mt-6 xs:mt-12">
        <ul className="flex">
          <li>
            <a
              href="https://www.facebook.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FacebookIcon className="w-5 mr-3" color="white" />
            </a>
          </li>

          <li>
            <a
              href="https://www.instagram.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <InstagramIcon className="w-5 mr-3" color="white" />
            </a>
          </li>

          <li>
            <a
              href="https://www.twitter.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <TwitterIcon className="w-5 mr-3" color="white" />
            </a>
          </li>

          <li>
            <a
              href="https://www.linkedin.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <LinkedInIcon className="w-5 mr-3" color="white" />
            </a>
          </li>

          <li>
            <a
              href="https://www.youtube.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <YouTubeIcon className="w-5 mr-3" color="white" />
            </a>
          </li>
        </ul>

        <h4 className="b2">© 2020</h4>
      </div>
    </div>
  </footer>
);

export default Footer;
