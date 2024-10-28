import React from "react";
import logo from "../../assets/images/logo.png";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12">
      <div className="mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Logo and Description (Taking Half the Space) */}
        <div className="col-span-1 md:col-span-1 pr-8">
          <img src={logo} alt="ArenaSync Esports Logo" className="w-32 mb-4" />
          <p className="text-sm text-gray-300">
            ArenaSync by ArenaSync Esports is a tournament platform for all South
            Asian Esports athletes. The platform will host events across many
            Esports titles, and cater to both small-scale community tournaments
            and large-scale national-level championships. Current countries
            supported: Bangladesh, India, Maldives, Nepal, Pakistan, Sri Lanka.
          </p>
          <p className="text-sm text-gray-300 mt-2">
            For support join our Discord at
            <a
              href="https://arenasync.com/discord"
              className="text-blue-500 hover:underline"
            >
              {" "}
              https://arenasync.com/discord
            </a>
          </p>
        </div>

        {/* Main Menu, Useful Links, and Contact (Taking Remaining Space) */}
        <div className="col-span-1 grid grid-cols-3 gap-8">
          {/* Main Menu */}
          <div>
            <h4 className="text-blue-500 border-l-4 border-blue-500 pl-2 mb-4 font-bold">
              MAIN MENU
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-300 hover:text-white hover:underline"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-300 hover:text-white hover:underline"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-300 hover:text-white hover:underline"
                >
                  Organisations & Clans
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-300 hover:text-white hover:underline"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-300 hover:text-white hover:underline"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-300 hover:text-white hover:underline"
                >
                  Help & Support
                </a>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-blue-500 border-l-4 border-blue-500 pl-2 mb-4 font-bold">
              USEFUL LINKS
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-300 hover:text-white hover:underline"
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-300 hover:text-white hover:underline"
                >
                  Sign Up
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-blue-500 border-l-4 border-blue-500 pl-2 mb-4 font-bold">
              CONTACT
            </h4>
            <p className="text-sm text-gray-300 mb-2">e: support@arenasync.com</p>
            <p className="text-sm text-gray-300">T: +94 76 404 7529</p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex bg-gray-800 text-center justify-between items-center w-full py-4 mt-8 px-8">
        <p className="text-sm text-gray-400">
          ArenaSync.com © 2024 | Your home for eSports and Digital Entertainment |
          v0.0.1
        </p>
        {/* <p className="text-sm text-gray-400 mt-1">
          Solution by{" "}
          <a href="https://teamr.gg" className="text-blue-500 hover:underline">
            weyora
          </a>
        </p> */}
      </div>
    </footer>
  );
}

export default Footer;
