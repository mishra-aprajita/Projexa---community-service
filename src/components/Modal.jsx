import { useEffect } from "react";

export default function Modal({ children, onClose, title, size = "md" }) {
  useEffect(() => {
    const escape = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", escape);
    // stop the page behind the popup from scrolling
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", escape);
      document.body.style.overflow = old;
    };
  }, [onClose]);
  return (
    <div className="modal-backdrop" onMouseDown={onClose} role="presentation">
      <section
        className={`modal modal-${size}`}
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          ×
        </button>
        {children}
      </section>
    </div>
  );
}
