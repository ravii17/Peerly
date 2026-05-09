import { motion } from 'framer-motion';

export default function FeatureCard({ icon: Icon, title, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-[32px] p-8 glass-card"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0071E3]/5 via-transparent to-[#BF40BF]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-inner transition-transform duration-500 group-hover:scale-110">
        <Icon className="h-7 w-7 text-[#0071E3]" />
      </div>
      
      <h3 className="relative z-10 mt-6 text-xl font-bold text-white tracking-tight">
        {title}
      </h3>
      
      <p className="relative z-10 mt-3 text-base text-[#86868B] leading-relaxed font-medium">
        {description}
      </p>
    </motion.div>
  );
}
