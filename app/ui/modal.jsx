"use client";

const Modal = ({ children, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={onClose} // Close modal if overlay is clicked
    >
      <div 
        className="bg-bg-light p-6 rounded-xl shadow-2xl w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
      >
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-text-secondary hover:text-text-primary text-2xl"
        >
          &times; {/* A simple 'X' close button */}
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
