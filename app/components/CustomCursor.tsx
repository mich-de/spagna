'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 250 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    setMounted(true)
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer')
      
      setIsHovering(!!isInteractive)
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', checkHover)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', checkHover)
    }
  }, [cursorX, cursorY])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      <motion.div
        className="w-8 h-8 rounded-full border border-oro/40 flex items-center justify-center"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? 'rgba(255, 193, 74, 0.1)' : 'rgba(255, 193, 74, 0)',
          borderColor: isHovering ? 'rgba(224, 122, 95, 0.6)' : 'rgba(255, 193, 74, 0.4)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        <motion.div 
          className="w-1 h-1 bg-terracotta-500 rounded-full"
          animate={{
            scale: isHovering ? 0 : 1,
          }}
        />
      </motion.div>
    </div>
  )
}
