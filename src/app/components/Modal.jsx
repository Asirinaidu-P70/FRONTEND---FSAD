import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

function Modal({ open, onClose, title, children, footer }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-panel"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="chart-head">
              <div>
                <h3 style={{ margin: 0 }}>{title}</h3>
              </div>
              <button type="button" className="icon-button" onClick={onClose}>
                <X size={18} />
              </button>
            </div>
            <div>{children}</div>
            {footer ? <div style={{ marginTop: "1rem" }}>{footer}</div> : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default Modal;
