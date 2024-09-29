import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primaryBackground text-white py-6 flex flex-col md:flex-row justify-between items-center px-4 w-full md:px-8">
      <div className="text-center md:text-left">
        <div className="text-white font-bold md:text-4xl mb-1">CVeezy</div>
        <div className="mt-4">
          <a href="/privacy" className="text-white hover:underline">Privacy Policy</a>
          <span className="mx-2">|</span>
          <a href="/terms" className="text-white hover:underline">Terms of Service</a>
        </div>
        <p className="mt-2 text-sm">&copy; Copyright © 2023 LitWords. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;