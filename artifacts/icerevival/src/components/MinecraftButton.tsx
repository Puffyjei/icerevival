import { useState } from 'react';

interface MinecraftButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  testId?: string;
}

export function MinecraftButton({ 
  children, 
  onClick, 
  variant = 'primary',
  className = '',
  testId
}: MinecraftButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const baseStyles = "relative px-8 py-3 font-bold text-lg transition-all cursor-pointer select-none";
  const pixelBorder = "border-2 border-solid";
  
  const variantStyles = variant === 'primary' 
    ? "bg-primary text-primary-foreground border-t-[#ffd970] border-l-[#ffd970] border-r-[#a37e2c] border-b-[#a37e2c] hover:brightness-110 active:brightness-95"
    : "bg-secondary text-secondary-foreground border-t-[#4a5a6a] border-l-[#4a5a6a] border-r-[#1a2a3a] border-b-[#1a2a3a] hover:brightness-110 active:brightness-95";

  const pressedStyle = isPressed ? "translate-y-[2px]" : "";

  return (
    <button
      className={`${baseStyles} ${pixelBorder} ${variantStyles} ${pressedStyle} ${className}`}
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      data-testid={testId}
      style={{
        fontFamily: 'Minecraft, monospace',
        imageRendering: 'pixelated',
        textShadow: '2px 2px 0px rgba(0, 0, 0, 0.3)',
      }}
    >
      {children}
    </button>
  );
}
