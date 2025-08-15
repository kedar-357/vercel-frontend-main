
import { Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToHero = () => {
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <footer className="w-full py-12 bg-[#1E1B4B] text-white">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Branding Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white shadow-sm"></div>
              <span className="text-2xl font-bold">JobWise</span>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed max-w-xs">
              The intelligent job application tracker that helps you track your job applications better.
            </p>
          </div>
          
          {/* Quick Links Section */}
          <div className="space-y-4 md:ml-12">
            <h3 className="text-lg font-bold text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={scrollToHero} 
                  className="text-gray-300 hover:text-white transition-colors text-left text-sm hover:underline"
                >
                  Home
                </button>
              </li>
              <li>
                <a href="/#features" className="text-gray-300 hover:text-white transition-colors text-sm hover:underline">
                  Features
                </a>
              </li>
              <li>
                <a href="/#about" className="text-gray-300 hover:text-white transition-colors text-sm hover:underline">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Contact</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300">
                <span className="font-medium">Email:</span> jobtracker806@gmail.com
              </p>
              <p className="text-gray-300">
                <span className="font-medium">Location:</span> Bangalore, India
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-4 pt-2">
              <a 
                href="https://www.linkedin.com/in/jeevan-a-17b0172a9/" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn" 
                className="text-white hover:text-[#4ccb6c] transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/kedar-sainath-joshi-1aaa6529a" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn" 
                className="text-white hover:text-[#4ccb6c] transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="pt-6 border-t border-gray-700">
          <p className="text-center text-gray-400 text-sm">
            © {currentYear} JobWise. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
