'use client';

import { Button } from './ui/button';
import { motion } from 'framer-motion';

interface OptionButtonsProps {
  options: Array<string>;
  onSelect: (value: string) => void;
}

export function OptionButtons({ options, onSelect }: OptionButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option, index) => (
        <motion.div
          key={option}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.05 * index } }}
        >
          <Button variant="outline" onClick={() => onSelect(option)}>
            {option}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
