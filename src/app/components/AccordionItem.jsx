import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

function AccordionItem({ item, open, onToggle }) {
  return (
    <div className="faq-item">
      <button type="button" className="faq-question" onClick={onToggle}>
        <span>{item.question}</span>
        <ChevronDown
          size={18}
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </button>
      <AnimatePresence>
        {open ? (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="muted"
            style={{ margin: 0, overflow: "hidden", lineHeight: 1.7 }}
          >
            {item.answer}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default AccordionItem;
