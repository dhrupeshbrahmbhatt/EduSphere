import { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <nav className="bg-black/5 backdrop-blur-lg">
        <div className="max-w-[1440px] mx-auto">
          {/* Desktop Navigation */}
          <div className="flex items-center justify-between h-20 px-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-black">LOGO</h1>
            </div>

            {/* Center Menu - Hidden on Mobile */}
            <div className="hidden lg:flex items-center space-x-6">
              <a href="#model-s" className="text-sm font-medium text-black hover:text-gray-600 transition-colors">
                Model S
              </a>
              <a href="#model-3" className="text-sm font-medium text-black hover:text-gray-600 transition-colors">
                Model 3
              </a>
              <a href="#model-x" className="text-sm font-medium text-black hover:text-gray-600 transition-colors">
                Model X
              </a>
              <a href="#model-y" className="text-sm font-medium text-black hover:text-gray-600 transition-colors">
                Model Y
              </a>
              <a href="#solar" className="text-sm font-medium text-black hover:text-gray-600 transition-colors">
                Solar
              </a>
            </div>

            {/* Right Menu */}
            <div className="hidden lg:flex items-center space-x-6">
              <a href="#shop" className="text-sm font-medium text-black hover:text-gray-600 transition-colors">
                Shop
              </a>
              <a href="#account" className="text-sm font-medium text-black hover:text-gray-600 transition-colors">
                Account
              </a>
              <button 
                onClick={() => setIsOpen(true)}
                className="text-sm font-medium text-black hover:text-gray-600 transition-colors"
              >
                Menu
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-black hover:text-gray-600"
              >
                <span className="sr-only">Open menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="fixed inset-0 bg-black/20" onClick={() => setIsOpen(false)} />
              <div className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white">
                <div className="flex justify-end p-4">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-gray-600 hover:text-black"
                  >
                    <span className="sr-only">Close menu</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="px-4 py-2 space-y-1">
                  <a href="#model-s" className="block py-2 text-base font-medium text-black hover:text-gray-600">
                    Model S
                  </a>
                  <a href="#model-3" className="block py-2 text-base font-medium text-black hover:text-gray-600">
                    Model 3
                  </a>
                  <a href="#model-x" className="block py-2 text-base font-medium text-black hover:text-gray-600">
                    Model X
                  </a>
                  <a href="#model-y" className="block py-2 text-base font-medium text-black hover:text-gray-600">
                    Model Y
                  </a>
                  <a href="#solar" className="block py-2 text-base font-medium text-black hover:text-gray-600">
                    Solar
                  </a>
                  <a href="#shop" className="block py-2 text-base font-medium text-black hover:text-gray-600">
                    Shop
                  </a>
                  <a href="#account" className="block py-2 text-base font-medium text-black hover:text-gray-600">
                    Account
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar 