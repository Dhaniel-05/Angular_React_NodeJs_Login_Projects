export const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
            <h2 className="text-lg font-bold mb-4">{title}</h2>
            <div>{children}</div>
            <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={onClose}
            >
            ✖
            </button>
        </div>
        </div>
    );
};
