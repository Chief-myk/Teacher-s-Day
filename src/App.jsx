import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Star, Sparkles, Gift, BookOpen, Award, 
  Quote, Users, Lightbulb, BookMarked, School, GraduationCap,
  Apple, Trophy, Palette, Music
} from 'lucide-react';

// Enhanced Confetti component with better effects
const Confetti = ({ isActive }) => {
  const particles = Array.from({ length: 150 }, (_, i) => i);

  return (
    <AnimatePresence>
      {isActive && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {particles.map((particle) => {
            const randomHue = Math.random() * 360;
            const size = Math.random() * 16 + 6;
            const shapes = ['circle', 'square', 'star', 'heart'];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            
            return (
              <motion.div
                key={particle}
                className={`absolute ${shape === 'circle' ? 'rounded-full' : shape === 'square' ? 'rounded-sm' : 'rounded-full'}`}
                style={{
                  background: shape === 'star' ? 
                    `linear-gradient(45deg, hsl(${randomHue}, 90%, 60%), hsl(${randomHue + 60}, 90%, 70%))` :
                    `hsl(${randomHue}, 90%, 60%)`,
                  left: `${Math.random() * 100}%`,
                  top: '-10%',
                  width: `${size}px`,
                  height: `${size}px`,
                  boxShadow: `0 0 ${size}px rgba(255, 255, 255, 0.3)`,
                }}
                initial={{ 
                  y: -20, 
                  rotate: 0, 
                  opacity: 1,
                  x: Math.random() * 40 - 20,
                  scale: 0
                }}
                animate={{
                  y: window.innerHeight + 100,
                  rotate: Math.random() > 0.5 ? 720 : -720,
                  opacity: 0,
                  x: Math.random() * 300 - 150,
                  scale: [0, 1, 0.8, 0]
                }}
                transition={{
                  duration: Math.random() * 4 + 3,
                  ease: 'easeOut',
                  delay: Math.random() * 1,
                }}
              />
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
};

// Enhanced Floating Elements with more variety
const FloatingElements = () => {
  const elements = Array.from({ length: 20 }, (_, i) => i);
  const iconComponents = [Heart, Star, BookOpen, GraduationCap, Apple, Trophy, Palette, Music];
  const colors = ['text-pink-300', 'text-yellow-300', 'text-blue-300', 'text-purple-300', 'text-green-300', 'text-red-300'];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {elements.map((element) => {
        const IconComponent = iconComponents[Math.floor(Math.random() * iconComponents.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 16 + 20;
        
        return (
          <motion.div
            key={element}
            className={`absolute ${color} opacity-40`}
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${size}px`,
            }}
            animate={{
              y: [-100, window.innerHeight + 100],
              x: [0, Math.random() * 400 - 200],
              rotate: [0, Math.random() * 720],
              scale: [0.5, 1.2, 0.8],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 10,
            }}
          >
            <IconComponent 
              fill={Math.random() > 0.7 ? "currentColor" : "none"} 
              strokeWidth={1.5}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

// Enhanced Rope component with better physics
const Rope = ({ onPull, isPulled, isVisible }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [ropeLength, setRopeLength] = useState(0);
  const [hasBeenPulled, setHasBeenPulled] = useState(false);

  const handleDrag = (event, info) => {
    const newLength = Math.max(0, Math.min(info.point.y, 250));
    setRopeLength(newLength);
    
    if (newLength > 180 && !hasBeenPulled) {
      setHasBeenPulled(true);
      onPull();
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div 
      className="absolute top-0 left-1/2 transform -translate-x-1/2 z-40"
      exit={{ opacity: 0, y: -100, scale: 0.5 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="flex flex-col items-center cursor-grab active:cursor-grabbing select-none"
        drag="y"
        dragConstraints={{ top: 0, bottom: 250 }}
        dragElastic={0.3}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        onDrag={handleDrag}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Enhanced Bell */}
        <motion.div
          className="relative w-12 h-12 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 rounded-full mb-2 flex items-center justify-center shadow-2xl"
          animate={{ 
            scale: isDragging ? 1.3 : [1, 1.1, 1],
            rotateZ: isDragging ? [0, -8, 8, 0] : [0, -2, 2, 0],
            boxShadow: isDragging ? 
              "0 20px 40px rgba(255, 215, 0, 0.6)" : 
              "0 10px 20px rgba(255, 215, 0, 0.4)"
          }}
          transition={{ 
            duration: isDragging ? 0.2 : 3, 
            repeat: isDragging ? Infinity : Infinity 
          }}
        >
          <motion.div 
            className="w-2 h-6 bg-gradient-to-b from-yellow-700 to-yellow-800 rounded-full"
            animate={{ scaleY: isDragging ? 0.8 : 1 }}
          />
          {/* Bell shine effect */}
          <div className="absolute inset-1 bg-gradient-to-br from-white/30 to-transparent rounded-full"></div>
        </motion.div>
        
        {/* Enhanced Rope with texture */}
        <motion.div
          className="relative bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 shadow-inner"
          style={{ 
            width: isDragging ? '10px' : '8px',
            height: `${180 + ropeLength}px`,
            borderRadius: '4px'
          }}
          animate={{ 
            scaleX: isDragging ? 1.3 : 1,
            boxShadow: isDragging ? 
              "inset 0 0 20px rgba(120, 53, 15, 0.8)" : 
              "inset 0 0 10px rgba(120, 53, 15, 0.6)"
          }}
        >
          {/* Rope texture lines */}
          {Array.from({ length: Math.floor((180 + ropeLength) / 20) }).map((_, i) => (
            <div 
              key={i}
              className="absolute left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-amber-600/30"
              style={{ top: `${i * 20 + 10}px` }}
            />
          ))}
        </motion.div>
        
        {/* Enhanced Pull indicator */}
        {!hasBeenPulled && (
          <motion.div
            className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-white text-sm sm:text-base font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 px-4 sm:px-8 py-2 sm:py-3 rounded-full shadow-2xl border border-white/20 backdrop-blur-sm whitespace-nowrap"
            animate={{ 
              opacity: [0.8, 1, 0.8],
              scale: [1, 1.05, 1],
              y: [0, -5, 0]
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <span className="hidden sm:inline">✨ Pull down the rope for a surprise! ✨</span>
            <span className="sm:hidden">✨ Pull the rope! ✨</span>
          </motion.div>
        )}

        {/* Pull progress indicator */}
        {isDragging && ropeLength > 50 && (
          <motion.div
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-white text-xs font-medium bg-black/50 px-4 py-2 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {ropeLength > 180 ? "Release to reveal! 🎉" : `Keep pulling... ${Math.round((ropeLength/180) * 100)}%`}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

// Enhanced Quote Card with better responsive design
const QuoteCard = ({ quote, author, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 60, scale: 0.8 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.8, delay, type: "spring", bounce: 0.3 }}
    viewport={{ once: true, margin: "-50px" }}
    className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-white/30 relative overflow-hidden group"
    whileHover={{ scale: 1.02, y: -5, rotateY: 5 }}
  >
    {/* Animated background glow */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-pink-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      animate={{ 
        background: [
          "linear-gradient(45deg, rgba(255,215,0,0.1), rgba(255,20,147,0.1), rgba(128,0,128,0.1))",
          "linear-gradient(45deg, rgba(255,20,147,0.1), rgba(128,0,128,0.1), rgba(255,215,0,0.1))",
          "linear-gradient(45deg, rgba(128,0,128,0.1), rgba(255,215,0,0.1), rgba(255,20,147,0.1))"
        ]
      }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    
    <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 text-yellow-400/40 z-0">
      <Quote size={60} className="sm:w-20 sm:h-20" />
    </div>
    
    <div className="text-white/95 text-base sm:text-lg lg:text-xl italic mb-4 sm:mb-6 leading-relaxed z-10 relative">
      "{quote}"
    </div>
    <div className="text-amber-200 font-semibold text-right text-sm sm:text-base">— {author}</div>
    
    {/* Decorative corner elements */}
    <div className="absolute top-4 right-4 opacity-20">
      <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400" />
    </div>
  </motion.div>
);

// Enhanced Appreciation Card with better mobile layout
const AppreciationCard = ({ title, message, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.7, y: 60 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.7, delay, type: "spring", bounce: 0.4 }}
    viewport={{ once: true, margin: "-50px" }}
    className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden group"
    whileHover={{ y: -12, scale: 1.02 }}
  >
    {/* Animated background gradient */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-pink-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      animate={{ 
        background: [
          "linear-gradient(135deg, rgba(255,215,0,0.05), rgba(255,20,147,0.05))",
          "linear-gradient(135deg, rgba(255,20,147,0.05), rgba(128,0,128,0.05))",
          "linear-gradient(135deg, rgba(128,0,128,0.05), rgba(255,215,0,0.05))"
        ]
      }}
      transition={{ duration: 6, repeat: Infinity }}
    />
    
    <motion.div
      className={`${color} w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto shadow-lg relative z-10`}
      whileHover={{ rotate: 360, scale: 1.1 }}
      transition={{ duration: 0.6 }}
    >
      <Icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
      {/* Icon glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl sm:rounded-2xl"
        animate={{ 
          boxShadow: [
            "0 0 20px rgba(255, 255, 255, 0.2)",
            "0 0 30px rgba(255, 255, 255, 0.4)",
            "0 0 20px rgba(255, 255, 255, 0.2)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
    
    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-3 sm:mb-4 text-center relative z-10">{title}</h3>
    <p className="text-gray-600 leading-relaxed text-center text-sm sm:text-base lg:text-lg relative z-10">{message}</p>
  </motion.div>
);

// Enhanced Teacher Tribute with better styling
const TeacherTribute = ({ name, role, message, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, x: -20 }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true, margin: "-50px" }}
    className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-white/30 overflow-hidden group hover:from-white/25 hover:to-white/15 transition-all duration-500"
    whileHover={{ scale: 1.02, y: -5 }}
  >
    <div className="flex items-start gap-3 sm:gap-4">
      <motion.div 
        className="flex-shrink-0"
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-600 flex items-center justify-center text-white text-lg sm:text-xl font-bold shadow-lg">
          {name.charAt(0)}
        </div>
      </motion.div>
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-semibold text-base sm:text-lg lg:text-xl">{name}</h4>
        <p className="text-amber-200 text-xs sm:text-sm mb-2 sm:mb-3">{role}</p>
        <p className="text-white/85 italic text-sm sm:text-base leading-relaxed">"{message}"</p>
      </div>
    </div>
  </motion.div>
);

// New Interactive Stats Counter
const StatsCounter = ({ number, label, icon: Icon, delay }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCount(prev => {
          if (prev >= number) {
            clearInterval(interval);
            return number;
          }
          return prev + Math.ceil(number / 50);
        });
      }, 50);
      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [number, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="text-center"
    >
      <motion.div
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20"
        whileHover={{ scale: 1.05, y: -5 }}
      >
        <Icon className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-400 mx-auto mb-2 sm:mb-4" />
        <motion.div
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2"
          animate={{ scale: count === number ? [1, 1.1, 1] : 1 }}
        >
          {count.toLocaleString()}+
        </motion.div>
        <div className="text-white/80 text-xs sm:text-sm font-medium">{label}</div>
      </motion.div>
    </motion.div>
  );
};

function App() {
  const [isRopePulled, setIsRopePulled] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hideRope, setHideRope] = useState(false);

  const handleRopePull = () => {
    setIsRopePulled(true);
    setShowConfetti(true);
    
    // Hide rope after 2 seconds
    setTimeout(() => {
      setHideRope(true);
    }, 2000);
    
    // Stop confetti after 6 seconds
    setTimeout(() => setShowConfetti(false), 6000);
  };

  const quotes = [
    {
      quote: "A teacher affects eternity; they can never tell where their influence stops.",
      author: "Henry Adams"
    },
    {
      quote: "Teaching is the profession that teaches all the other professions.",
      author: "Unknown"
    },
    {
      quote: "The best teachers are those who show you where to look but don't tell you what to see.",
      author: "Alexandra K. Trenfor"
    },
    {
      quote: "It is the supreme art of the teacher to awaken joy in creative expression and knowledge.",
      author: "Albert Einstein"
    },
    {
      quote: "Those who know, do. Those that understand, teach.",
      author: "Aristotle"
    },
    {
      quote: "Education is not the filling of a pail, but the lighting of a fire.",
      author: "William Butler Yeats"
    }
  ];

  const appreciationCards = [
    {
      title: "Patience & Understanding",
      message: "Thank you for your endless patience and for seeing potential in every student, even when we couldn't see it ourselves.",
      icon: Heart,
      color: "bg-gradient-to-br from-pink-500 to-rose-600"
    },
    {
      title: "Inspiration & Motivation",
      message: "You inspire us to dream bigger, reach higher, and never give up on our goals and aspirations.",
      icon: Star,
      color: "bg-gradient-to-br from-amber-500 to-orange-600"
    },
    {
      title: "Knowledge & Wisdom",
      message: "Your dedication to sharing knowledge and wisdom has opened countless doors and illuminated paths to success.",
      icon: BookOpen,
      color: "bg-gradient-to-br from-blue-500 to-indigo-600"
    },
    {
      title: "Care & Dedication",
      message: "Your genuine care and unwavering dedication create a nurturing environment where learning flourishes.",
      icon: Users,
      color: "bg-gradient-to-br from-emerald-500 to-teal-600"
    }
  ];

  const teacherTributes = [
    {
      name: "Ms. Johnson",
      role: "Mathematics Teacher",
      message: "Thank you for making calculus understandable and even enjoyable! Your patience with every question never went unnoticed."
    },
    {
      name: "Mr. Williams",
      role: "Science Department",
      message: "Your passion for chemistry was contagious. I'll never forget the excitement of our lab experiments."
    },
    {
      name: "Dr. Garcia",
      role: "Literature Professor",
      message: "You opened my eyes to the beauty of poetry and taught me to appreciate words in a whole new way."
    },
    {
      name: "Coach Davis",
      role: "Physical Education",
      message: "You taught us that winning isn't everything, but trying our best is. Lessons I've carried into adulthood."
    }
  ];

  const impactStats = [
    { number: 1000000, label: "Students Inspired", icon: Users },
    { number: 50000, label: "Minds Shaped", icon: Lightbulb },
    { number: 25000, label: "Dreams Nurtured", icon: Star },
    { number: 365, label: "Days of Dedication", icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        {/* Large floating orbs */}
        <motion.div 
          className="absolute top-10 sm:top-20 left-5 sm:left-10 w-24 sm:w-32 h-24 sm:h-32 bg-pink-400/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 20, 0],
            y: [0, -10, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-40 sm:top-60 right-10 sm:right-20 w-36 sm:w-48 h-36 sm:h-48 bg-yellow-400/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.3, 0.1],
            x: [0, -30, 0],
            y: [0, 15, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
        <motion.div 
          className="absolute bottom-32 sm:bottom-40 left-1/4 w-28 sm:w-40 h-28 sm:h-40 bg-green-400/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 25, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 1 }}
        />
        <motion.div 
          className="absolute bottom-10 sm:bottom-20 right-1/4 w-32 sm:w-36 h-32 sm:h-36 bg-blue-400/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.1, 0.3, 0.1],
            x: [0, -20, 0],
            y: [0, 10, 0]
          }}
          transition={{ duration: 9, repeat: Infinity, delay: 3 }}
        />
      </div>

      <FloatingElements />
      <Confetti isActive={showConfetti} />

      {/* Rope - only show when not hidden */}
      <AnimatePresence>
        {!hideRope && (
          <Rope onPull={handleRopePull} isPulled={isRopePulled} isVisible={!hideRope} />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {!isRopePulled ? (
              <motion.div
                key="initial-state"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 1, type: "spring", bounce: 0.3 }}
                className="text-white"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1], 
                    rotate: [0, 5, -5, 0],
                    filter: [
                      "drop-shadow(0 0 20px rgba(255,215,0,0.5))",
                      "drop-shadow(0 0 40px rgba(255,215,0,0.8))",
                      "drop-shadow(0 0 20px rgba(255,215,0,0.5))"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="mb-6 sm:mb-8"
                >
                  <Sparkles className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto text-yellow-400 mb-4 sm:mb-6" />
                </motion.div>
                
                <motion.h1
                  className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  Happy Teachers' Day!
                </motion.h1>
                
                <motion.p
                  className="text-lg sm:text-xl lg:text-2xl text-white/80 leading-relaxed mb-8 sm:mb-12 px-4 max-w-4xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  Celebrating the extraordinary educators who shape minds, inspire hearts, and build the foundation of our future.
                </motion.p>
                
                <motion.div
                  className="flex justify-center gap-3 sm:gap-6 flex-wrap"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  {[BookOpen, GraduationCap, School, Apple].map((Icon, index) => (
                    <motion.div
                      key={index}
                      animate={{ 
                        y: [0, -12, 0],
                        rotate: [0, 8, -8, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                      className="bg-white/20 p-3 sm:p-4 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 15 }}
                    >
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="celebration"
                initial={{ opacity: 0, scale: 0.3, y: 100 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 1.5,
                  type: "spring",
                  bounce: 0.5
                }}
                className="text-center"
              >
                <motion.h1
                  className="text-4xl sm:text-6xl lg:text-8xl xl:text-9xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent leading-tight"
                  animate={{ 
                    scale: [1, 1.02, 1],
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ 
                    scale: { duration: 3, repeat: Infinity },
                    backgroundPosition: { duration: 5, repeat: Infinity }
                  }}
                >
                  Thank You, Teachers!
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-white space-y-6 sm:space-y-8"
                >
                  <p className="text-xl sm:text-2xl lg:text-3xl mb-6 sm:mb-8 leading-relaxed max-w-4xl mx-auto px-4">
                    Every lesson taught, every moment of guidance, and every act of kindness shapes the leaders of tomorrow.
                  </p>
                  
                  <motion.div
                    className="flex justify-center gap-3 sm:gap-6 flex-wrap mb-8 sm:mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                  >
                    {[Gift, Heart, Star, Award, Trophy, Sparkles].map((Icon, index) => (
                      <motion.div
                        key={index}
                        animate={{ 
                          y: [0, -15, 0],
                          rotate: [0, 12, -12, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.2
                        }}
                        className="bg-white/20 p-3 sm:p-5 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                      >
                        <Icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-yellow-400" />
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="inline-block bg-gradient-to-r from-yellow-400/20 via-pink-400/20 to-purple-400/20 backdrop-blur-lg rounded-full px-6 sm:px-8 py-3 sm:py-4 border border-white/30 shadow-xl"
                  >
                    <span className="text-lg sm:text-xl text-white/90 font-medium">Continue scrolling to explore the celebration</span>
                    <motion.div
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mt-2 text-2xl sm:text-3xl"
                    >
                      ↓
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Impact Statistics Section */}
      {isRopePulled && (
        <section className="relative z-10 py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                The <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">Power</span> of Teaching
              </h2>
              <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto px-4">
                Every teacher's impact ripples through generations
              </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {impactStats.map((stat, index) => (
                <StatsCounter
                  key={index}
                  number={stat.number}
                  label={stat.label}
                  icon={stat.icon}
                  delay={index * 0.2}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What We Appreciate Section */}
      {isRopePulled && (
        <section className="relative z-10 py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                What We <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">Appreciate</span>
              </h2>
              <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto px-4">
                The countless ways you make a difference in our lives
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">
              {appreciationCards.map((card, index) => (
                <AppreciationCard
                  key={index}
                  title={card.title}
                  message={card.message}
                  icon={card.icon}
                  color={card.color}
                  delay={index * 0.15}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quotes Section */}
      {isRopePulled && (
        <section className="relative z-10 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                Words of <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">Wisdom</span>
              </h2>
              <p className="text-lg sm:text-xl text-white/80 px-4">Celebrating the impact of great educators through time</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
              {quotes.map((quote, index) => (
                <QuoteCard
                  key={index}
                  quote={quote.quote}
                  author={quote.author}
                  delay={index * 0.2}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Teacher Tributes Section */}
      {isRopePulled && (
        <section className="relative z-10 py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                From Our <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">Hearts</span> to Yours
              </h2>
              <p className="text-lg sm:text-xl text-white/80 px-4">Personal tributes to our amazing educators</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              {teacherTributes.map((tribute, index) => (
                <TeacherTribute
                  key={index}
                  name={tribute.name}
                  role={tribute.role}
                  message={tribute.message}
                  delay={index * 0.2}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Interactive Thank You Section */}
      {isRopePulled && (
        <section className="relative z-10 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/50 via-pink-900/50 to-purple-900/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-5xl mx-auto text-center"
          >
            <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/30 relative overflow-hidden group">
              {/* Animated background pattern */}
              <motion.div
                className="absolute inset-0 opacity-10"
                animate={{ 
                  background: [
                    "radial-gradient(circle at 20% 50%, rgba(255,215,0,0.3) 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 50%, rgba(255,20,147,0.3) 0%, transparent 50%)",
                    "radial-gradient(circle at 50% 80%, rgba(128,0,128,0.3) 0%, transparent 50%)",
                    "radial-gradient(circle at 20% 50%, rgba(255,215,0,0.3) 0%, transparent 50%)"
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0], 
                  scale: [1, 1.1, 1],
                  filter: [
                    "drop-shadow(0 0 30px rgba(255,20,147,0.6))",
                    "drop-shadow(0 0 50px rgba(255,215,0,0.8))",
                    "drop-shadow(0 0 30px rgba(128,0,128,0.6))"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="mb-4 sm:mb-6 relative z-10"
              >
                <Heart className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto text-red-400" fill="currentColor" />
              </motion.div>
              
              <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 relative z-10">
                Dear Teachers,
              </h3>
              
              <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-white/95 leading-relaxed mb-6 sm:mb-8 relative z-10 px-2 sm:px-4">
                Your impact extends far beyond the classroom. You are mentors, inspirers, and life-changers. 
                Today and every day, we celebrate you and the incredible difference you make.
              </p>
              
              <motion.div
                className="text-4xl sm:text-6xl lg:text-8xl relative z-10"
                animate={{ 
                  scale: [1, 1.2, 1], 
                  rotate: [0, 10, -10, 0],
                  filter: [
                    "drop-shadow(0 0 20px rgba(255,182,193,0.8))",
                    "drop-shadow(0 0 40px rgba(255,105,180,1))",
                    "drop-shadow(0 0 20px rgba(255,182,193,0.8))"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                💖
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
                className="mt-6 sm:mt-8 relative z-10"
              >
                <motion.div
                  className="inline-block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white text-lg sm:text-xl lg:text-2xl font-bold px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 rounded-full shadow-2xl border border-white/20"
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 20px 40px rgba(255,215,0,0.4)",
                    y: -3
                  }}
                  animate={{
                    boxShadow: [
                      "0 10px 30px rgba(255,215,0,0.3)",
                      "0 15px 40px rgba(255,20,147,0.4)",
                      "0 10px 30px rgba(128,0,128,0.3)",
                      "0 10px 30px rgba(255,215,0,0.3)"
                    ]
                  }}
                  transition={{ 
                    boxShadow: { duration: 4, repeat: Infinity }
                  }}
                >
                  <span className="hidden sm:inline">🌟 Thank You for Everything! 🌟</span>
                  <span className="sm:hidden">🌟 Thank You! 🌟</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Enhanced Footer */}
      <footer className="relative z-10 py-8 sm:py-12 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-4"
        >
          <motion.p
            className="text-white/70 text-base sm:text-lg px-4"
            animate={{ 
              textShadow: [
                "0 0 10px rgba(255,255,255,0.3)",
                "0 0 20px rgba(255,215,0,0.4)",
                "0 0 10px rgba(255,255,255,0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Made with ❤️ for all the amazing teachers who make a difference every day
          </motion.p>
          
          <motion.div
            className="flex justify-center gap-4 text-white/50"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
            <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
            <Star className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.div>
        </motion.div>
      </footer>
    </div>
  );
}

export default App;