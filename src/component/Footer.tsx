import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-8 px-16">
      <div className="max-w-6xl mx-auto">
        {/* Icons mạng xã hội */}
        <div className="flex space-x-6 mb-6">
          <FaFacebookF className="text-xl cursor-pointer hover:text-white" />
          <FaInstagram className="text-xl cursor-pointer hover:text-white" />
          <FaTwitter className="text-xl cursor-pointer hover:text-white" />
          <FaYoutube className="text-xl cursor-pointer hover:text-white" />
        </div>

        {/* Grid 4 cột */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
          <div className="space-y-2">
            <p>Audio Description</p>
            <p>Investor Relations</p>
            <p>Legal Notices</p>
          </div>
          <div className="space-y-2">
            <p>Help Centre</p>
            <p>Jobs</p>
            <p>Cookie Preferences</p>
          </div>
          <div className="space-y-2">
            <p>Gift Cards</p>
            <p>Terms of Use</p>
            <p>Corporate Information</p>
          </div>
          <div className="space-y-2">
            <p>Media Centre</p>
            <p>Privacy</p>
            <p>Contact Us</p>
          </div>
        </div>

        {/* Nút Service Code */}
        <button className="border border-gray-500 px-4 py-2 text-sm hover:bg-gray-700">
          Service Code
        </button>

        {/* Bản quyền */}
      </div>
    </footer>
  );
};

export default Footer;
