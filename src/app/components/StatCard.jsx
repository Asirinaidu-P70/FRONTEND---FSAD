import { motion } from "framer-motion";

function StatCard({ icon: Icon, label, value, delta }) {
  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      whileHover={{ y: -4 }}
    >
      <div className="icon-wrap">{Icon ? <Icon size={20} /> : null}</div>
      <div>
        <p className="muted" style={{ margin: 0 }}>
          {label}
        </p>
        <h3>{value}</h3>
      </div>
      {delta ? <span className="tag">{delta}</span> : null}
    </motion.div>
  );
}

export default StatCard;
