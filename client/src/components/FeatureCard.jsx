import { motion } from 'framer-motion';

export default function FeatureCard({ icon: Icon, title, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 shadow-inner">
        <Icon className="h-6 w-6 text-indigo-400" />
      </div>
      
      <h3 className="relative z-10 mt-5 text-lg font-semibold text-white">
        {title}
      </h3>
      
      <p className="relative z-10 mt-2 text-sm text-white/60 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
