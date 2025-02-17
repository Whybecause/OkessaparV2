"use client";

import { motion } from "framer-motion";
import React from "react";

const MotionUl = ({
  className = "",
  duration = 0.6,
  children
}: {
  className?: string;
  duration?: number;
  children: React.ReactNode;
}) => {
  return (
    <motion.ul
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration }}
    >
      {children}
    </motion.ul>
  );
};

export default MotionUl;
