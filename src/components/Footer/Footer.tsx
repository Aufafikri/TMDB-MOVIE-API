import React from 'react'

const Footer = () => {
  return (
    <div className='shadow-2xl shadow-black dark:shadow-white mt-3'>
         <footer className="py-8">
        <div className="container mx-auto px-4">
            <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
                    <h3 className="text-lg font-semibold mb-4">About Us</h3>
                    <p>We are passionate about movies and bringing you the latest and greatest in film entertainment. Stay tuned for reviews, trailers, and more!</p>
                </div>
                <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
                    <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                    <ul>
                        <li>Email: info@moviesite.com</li>
                        <li>Phone: +123 456 7890</li>
                        <li>Address: 123 Movie Street, Film City, FC 12345</li>
                    </ul>
                </div>
                <div className="w-full md:w-1/3 px-4">
                    <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="#" className="text-white hover:text-gray-400"><i className="ph-facebook-logo text-2xl"></i></a>
                        <a href="#" className="text-white hover:text-gray-400"><i className="ph-twitter-logo text-2xl"></i></a>
                        <a href="#" className="text-white hover:text-gray-400"><i className="ph-instagram-logo text-2xl"></i></a>
                        <a href="#" className="text-white hover:text-gray-400"><i className="ph-youtube-logo text-2xl"></i></a>
                    </div>
                </div>
            </div>
            <div className="text-center mt-8">
                <p>&copy; 2024 Movie Site. All rights reserved.</p>
            </div>
        </div>
    </footer>
    </div>
  )
}

export default Footer