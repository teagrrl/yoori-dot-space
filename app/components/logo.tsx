"use client"

import { motion } from "motion/react"

export function Logo() {
  return (
    <motion.svg className="w-full h-full select-none" viewBox="0 0 110 110">
      <filter id="glow">
        <feFlood floodColor="white" floodOpacity="0.2" in="SourceGraphic" />
        <feComposite operator="in" in2="SourceGraphic" />
        <feGaussianBlur stdDeviation="5" />
        <feComponentTransfer result="glow1">
          <feFuncA type="linear" slope="5" intercept="0" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode in="glow1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="glow-ring">
        <feFlood floodColor="var(--color-logo-ring)" floodOpacity="0.2" in="SourceGraphic" />
        <feComposite operator="in" in2="SourceGraphic" />
        <feGaussianBlur stdDeviation="2" />
        <feComponentTransfer result="glow1">
          <feFuncA type="linear" slope="6" intercept="0" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode in="glow1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="glow-swoop">
        <feFlood floodColor="var(--color-logo-swoop)" floodOpacity="0.3" in="SourceGraphic" />
        <feComposite operator="in" in2="SourceGraphic" />
        <feGaussianBlur stdDeviation="2" />
        <feComponentTransfer result="glow1">
          <feFuncA type="linear" slope="4" intercept="0" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode in="glow1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      {/* <circle cx="55" cy="55" r="50" strokeWidth="2" stroke="grey" fill="none" /> */}
      <g filter="url(#glow-ring)" stroke="var(--color-logo-ring)" fill="none" strokeWidth="2.5" strokeLinecap="round">
        <motion.path
          d="M 5 55 A 50 50 0 0 1 93 22.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.95, duration: 0.25, ease: "linear" }}
        />
        <motion.path
          d="M 101.65 37 A 50 50 0 0 1 23.5 93.8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 1.25, duration: 0.3, ease: "linear" }}
        />
        <motion.path
          d="M 18 88.7 A 50 50 0 0 1 5.6 63"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 1.55, duration: 0.15, ease: "linear" }}
        />
      </g>
      <motion.path
        d="M 2 60.3 Q 18 53 90 28.2 Q 98.5 25.2 103 18 Q 105 15 102 28 Q 98.5 44 51.8 69 Q 24 85 18 95"
        filter="url(#glow-swoop)"
        stroke="var(--color-logo-swoop)"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 0.25, duration: 1.2, ease: "easeInOut" }}
      />
      <g filter="url(#glow)">
        <g
          transform="translate(3 -4) rotate(-35 55 55)"
          stroke="white"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          {/* <ellipse cx="55" cy="55" rx="18" ry="35" stroke="grey" fill="none" strokeWidth="2" /> */}
          <motion.path
            d="M 44 82.7 Q 59.1 99.8 68.6 78"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.2, ease: "linear" }}
          />
          <motion.path
            d="M 72.7 60.1 C 73 14 48.2 7.8 39.7 36.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.4, ease: "linear" }}
          />
          <motion.path
            d="M 37 55.5 Q 37 66.5 39.4 72.7"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.2, ease: "linear" }}
          />
          <motion.g
            transform="rotate(-15.7 39.4 72.7)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.4, ease: "easeInOut" }}
          >
            <ellipse cx="39.4" cy="72.7" rx="2" ry="4" stroke="none" fill="white" />
          </motion.g>
        </g>
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.4, ease: "easeInOut" }}
        >
          <text
            fill="white"
            x="54"
            y="60"
            
            textAnchor="middle"
            fontSize="1.7em"
            fontStyle="italic"
            fontFamily="var(--font-pacifico)"
          >
            &nbsp;&nbsp;yooori&nbsp;&nbsp;
          </text>
        </motion.g>
      </g>
    </motion.svg>
  )
}