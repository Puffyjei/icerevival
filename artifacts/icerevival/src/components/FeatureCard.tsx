interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div 
      className="bg-card border-4 border-[#3a2a1a] p-6 relative"
      style={{
        borderTopColor: '#6a5a4a',
        borderLeftColor: '#6a5a4a',
        borderRightColor: '#2a1a0a',
        borderBottomColor: '#2a1a0a',
      }}
    >
      <div className="flex items-start gap-4">
        <div className="text-primary text-3xl flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 
            className="text-xl font-bold mb-2 text-foreground"
            style={{ fontFamily: 'Minecraft, monospace' }}
          >
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
