'use client'

import { motion } from 'framer-motion'

export default function AmbientGradients() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0], x: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0], x: [0, -40, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[20%] -left-[15%] w-[50%] h-[70%] bg-secondary/10 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], y: [0, 60, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-[10%] right-[5%] w-[45%] h-[50%] bg-tertiary/10 rounded-full blur-[140px]"
      />
    </div>
  )
}
