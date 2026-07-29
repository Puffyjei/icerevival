import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MinecraftButton } from '@/components/MinecraftButton';
import { SnowfallEffect } from '@/components/SnowfallEffect';
import { FeatureCard } from '@/components/FeatureCard';
import { Shield, DollarSign, Mic, MessageCircle, Copy, Check } from 'lucide-react';

const SERVER_IP = 'icerevival.aternos.me';

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [showSnow, setShowSnow] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const snowOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowSnow(false);
      } else {
        setShowSnow(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_IP);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Zone 1: Outside - Snowy Night */}
      <motion.section 
        className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, #0a0e1a 0%, #1a2540 50%, #2a3a60 100%)',
        }}
      >
        {showSnow && (
          <motion.div style={{ opacity: snowOpacity }}>
            <SnowfallEffect />
          </motion.div>
        )}

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 
              className="text-7xl md:text-9xl font-bold mb-6 text-white tracking-wider"
              style={{ 
                fontFamily: 'Minecraft, monospace',
                textShadow: '4px 4px 0px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)',
                imageRendering: 'pixelated',
              }}
            >
              IceRevival
            </h1>
          </motion.div>

          <motion.p 
            className="text-xl md:text-2xl mb-12 text-blue-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ fontFamily: 'Minecraft, monospace' }}
          >
            A survival server worth logging in for.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-black/40 backdrop-blur-sm border-4 border-white/20 p-8 mb-8 inline-block"
          >
            <p 
              className="text-sm text-blue-200 mb-3 uppercase tracking-wider"
              style={{ fontFamily: 'Minecraft, monospace' }}
            >
              Server IP
            </p>
            <p 
              className="text-3xl md:text-4xl font-bold text-white mb-6 select-all"
              style={{ fontFamily: 'Minecraft, monospace' }}
            >
              {SERVER_IP}
            </p>
            
            <MinecraftButton 
              onClick={copyToClipboard}
              variant="primary"
              testId="button-copy-ip-hero"
            >
              {copied ? (
                <span className="flex items-center gap-2">
                  <Check size={20} /> Copied!
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Copy size={20} /> Copy IP
                </span>
              )}
            </MinecraftButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="inline-block bg-accent/20 backdrop-blur-sm border-2 border-accent/40 px-6 py-3"
          >
            <p 
              className="text-accent font-bold text-lg"
              style={{ fontFamily: 'Minecraft, monospace' }}
            >
              Java 1.21.1+
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-16"
          >
            <p 
              className="text-blue-200 text-sm animate-bounce"
              style={{ fontFamily: 'Minecraft, monospace' }}
            >
              Scroll down to enter
            </p>
          </motion.div>
        </div>

        {/* Horizon glow effect */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(255, 200, 100, 0.1) 0%, transparent 100%)',
          }}
        />
      </motion.section>

      {/* Zone 2: Inside the Cabin - Warm Interior */}
      <section 
        className="relative min-h-[100dvh] py-20 px-4"
        style={{
          background: 'linear-gradient(to bottom, #2a1f15 0%, #3a2820 50%, #2a1f15 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 
              className="text-5xl md:text-6xl font-bold text-center mb-4 text-primary"
              style={{ 
                fontFamily: 'Minecraft, monospace',
                textShadow: '3px 3px 0px rgba(0, 0, 0, 0.5)',
              }}
            >
              Server Features
            </h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Everything you need for the perfect survival experience
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <FeatureCard
                icon={<Shield />}
                title="Land Claims"
                description="Protect your builds from griefers. Claim your territory and build with peace of mind. Your work is safe here."
              />
              <FeatureCard
                icon={<DollarSign />}
                title="Auction House"
                description="Trade with the community. Buy and sell items in a player-driven economy. Find rare treasures or sell your surplus."
              />
              <FeatureCard
                icon={<Mic />}
                title="Simple Voice Chat"
                description="Talk to your neighbors in-game. Proximity voice chat makes the world feel alive. Coordinate builds or just chat."
              />
              <FeatureCard
                icon={<MessageCircle />}
                title="Discord Community"
                description="Join the conversation outside the game. Share screenshots, coordinate events, and stay connected with the community."
              />
            </div>
          </motion.div>

          {/* How to Join Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 
              className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary"
              style={{ 
                fontFamily: 'Minecraft, monospace',
                textShadow: '3px 3px 0px rgba(0, 0, 0, 0.5)',
              }}
            >
              How to Join
            </h2>

            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-card border-4 border-[#3a2a1a] p-6" style={{
                borderTopColor: '#6a5a4a',
                borderLeftColor: '#6a5a4a',
                borderRightColor: '#2a1a0a',
                borderBottomColor: '#2a1a0a',
              }}>
                <div className="flex items-start gap-4">
                  <div 
                    className="text-4xl font-bold text-primary flex-shrink-0"
                    style={{ fontFamily: 'Minecraft, monospace' }}
                  >
                    1
                  </div>
                  <div>
                    <h3 
                      className="text-xl font-bold mb-2"
                      style={{ fontFamily: 'Minecraft, monospace' }}
                    >
                      Open Minecraft Java Edition
                    </h3>
                    <p className="text-muted-foreground">
                      Make sure you're running version 1.21.1 or higher. Update your game if needed.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border-4 border-[#3a2a1a] p-6" style={{
                borderTopColor: '#6a5a4a',
                borderLeftColor: '#6a5a4a',
                borderRightColor: '#2a1a0a',
                borderBottomColor: '#2a1a0a',
              }}>
                <div className="flex items-start gap-4">
                  <div 
                    className="text-4xl font-bold text-primary flex-shrink-0"
                    style={{ fontFamily: 'Minecraft, monospace' }}
                  >
                    2
                  </div>
                  <div>
                    <h3 
                      className="text-xl font-bold mb-2"
                      style={{ fontFamily: 'Minecraft, monospace' }}
                    >
                      Go to Multiplayer
                    </h3>
                    <p className="text-muted-foreground">
                      Click "Multiplayer" from the main menu, then "Add Server" or "Direct Connect".
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border-4 border-[#3a2a1a] p-6" style={{
                borderTopColor: '#6a5a4a',
                borderLeftColor: '#6a5a4a',
                borderRightColor: '#2a1a0a',
                borderBottomColor: '#2a1a0a',
              }}>
                <div className="flex items-start gap-4">
                  <div 
                    className="text-4xl font-bold text-primary flex-shrink-0"
                    style={{ fontFamily: 'Minecraft, monospace' }}
                  >
                    3
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="text-xl font-bold mb-3"
                      style={{ fontFamily: 'Minecraft, monospace' }}
                    >
                      Enter the Server IP
                    </h3>
                    <div className="bg-background/50 border-2 border-primary/30 p-4 mb-4">
                      <p 
                        className="text-2xl font-bold text-primary text-center select-all"
                        style={{ fontFamily: 'Minecraft, monospace' }}
                      >
                        {SERVER_IP}
                      </p>
                    </div>
                    <div className="text-center">
                      <MinecraftButton 
                        onClick={copyToClipboard}
                        variant="primary"
                        testId="button-copy-ip-steps"
                      >
                        {copied ? (
                          <span className="flex items-center gap-2">
                            <Check size={18} /> Copied!
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Copy size={18} /> Copy IP
                          </span>
                        )}
                      </MinecraftButton>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border-4 border-[#3a2a1a] p-6" style={{
                borderTopColor: '#6a5a4a',
                borderLeftColor: '#6a5a4a',
                borderRightColor: '#2a1a0a',
                borderBottomColor: '#2a1a0a',
              }}>
                <div className="flex items-start gap-4">
                  <div 
                    className="text-4xl font-bold text-primary flex-shrink-0"
                    style={{ fontFamily: 'Minecraft, monospace' }}
                  >
                    4
                  </div>
                  <div>
                    <h3 
                      className="text-xl font-bold mb-2"
                      style={{ fontFamily: 'Minecraft, monospace' }}
                    >
                      Join and Play!
                    </h3>
                    <p className="text-muted-foreground">
                      Click "Join Server" and start your adventure. Welcome to IceRevival.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center border-t-2 border-primary/20 pt-12"
          >
            <p 
              className="text-primary text-2xl font-bold mb-4"
              style={{ fontFamily: 'Minecraft, monospace' }}
            >
              {SERVER_IP}
            </p>
            <p className="text-muted-foreground text-sm mb-2">
              Java Edition 1.21.1+
            </p>
            <p className="text-muted-foreground text-xs">
              IceRevival &copy; {new Date().getFullYear()} - A community-driven survival experience
            </p>
          </motion.footer>
        </div>

        {/* Ambient warm glow effect */}
        <div 
          className="fixed top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, #ffa500 0%, transparent 70%)',
          }}
        />
      </section>
    </div>
  );
}
