import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { 
  Code2, Terminal, Cpu, Database, Globe, 
  Layers, Layout, MessageSquare, Monitor, 
  Smartphone, Zap, Github, Twitter, Linkedin,
  Grab,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ICONS = [
  { Icon: Code2, label: 'React' },
  { Icon: Terminal, label: 'Node.js' },
  { Icon: Cpu, label: 'System' },
  { Icon: Database, label: 'SQL' },
  { Icon: Globe, label: 'Web' },
  { Icon: Layers, label: 'Stack' },
  { Icon: Layout, label: 'UI/UX' },
  { Icon: MessageSquare, label: 'Chat' },
  { Icon: Monitor, label: 'Desktop' },
  { Icon: Smartphone, label: 'Mobile' },
  { Icon: Zap, label: 'Fast' },
  { Icon: Github, label: 'Git' },
  { Icon: Twitter, label: 'Social' },
  { Icon: Linkedin, label: 'Network' },
];

const AntigravityHero = () => {
  const containerRef = useRef(null);
  const engineRef = useRef(Matter.Engine.create());
  const [gravityEnabled, setGravityEnabled] = useState(true);
  const navigate = useNavigate();
  
  // Refs for elements to sync
  const headlineRef = useRef(null);
  const button1Ref = useRef(null);
  const button2Ref = useRef(null);
  const iconRefs = useRef([]);
  const bodiesRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter;
    const engine = engineRef.current;
    const world = engine.world;
    
    world.gravity.y = 1;

    const updateBoundaries = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Remove old boundaries
      const existingWalls = Composite.allBodies(world).filter(b => b.isStatic);
      Composite.remove(world, existingWalls);

      const wallOptions = { isStatic: true, render: { visible: false } };
      const ground = Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions);
      const leftWall = Bodies.rectangle(-50, height / 2, 100, height, wallOptions);
      const rightWall = Bodies.rectangle(width + 50, height / 2, 100, height, wallOptions);
      const ceiling = Bodies.rectangle(width / 2, -50, width, 100, wallOptions);

      Composite.add(world, [ground, leftWall, rightWall, ceiling]);
    };

    updateBoundaries();

    const createBodyFromElement = (element, options = {}) => {
      const rect = element.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const body = Bodies.rectangle(
        rect.left - containerRect.left + rect.width / 2,
        rect.top - containerRect.top + rect.height / 2,
        rect.width,
        rect.height,
        {
          restitution: 0.7,
          friction: 0.1,
          frictionAir: 0.02,
          ...options
        }
      );
      return { body, element };
    };

    const initPhysics = () => {
      const bodiesToSync = [];

      if (headlineRef.current) {
        bodiesToSync.push(createBodyFromElement(headlineRef.current, { chamfer: { radius: 20 } }));
      }

      if (button1Ref.current) {
        bodiesToSync.push(createBodyFromElement(button1Ref.current, { chamfer: { radius: 30 } }));
      }
      if (button2Ref.current) {
        bodiesToSync.push(createBodyFromElement(button2Ref.current, { chamfer: { radius: 30 } }));
      }

      iconRefs.current.forEach((el) => {
        if (el) {
          bodiesToSync.push(createBodyFromElement(el, { chamfer: { radius: 15 } }));
        }
      });

      bodiesRef.current = bodiesToSync;
      Composite.add(world, bodiesToSync.map(b => b.body));

      const mouse = Mouse.create(containerRef.current);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.1,
          render: { visible: false }
        }
      });

      Composite.add(world, mouseConstraint);

      const runner = Runner.create();
      Runner.run(runner, engine);

      Events.on(engine, 'afterUpdate', () => {
        const containerRect = containerRef.current.getBoundingClientRect();
        bodiesToSync.forEach(({ body, element }) => {
          const { x, y } = body.position;
          const angle = body.angle;
          // Position relative to the container
          element.style.position = 'absolute';
          element.style.top = '0';
          element.style.left = '0';
          element.style.transform = `translate(${x - element.offsetWidth / 2}px, ${y - element.offsetHeight / 2}px) rotate(${angle}rad)`;
          element.style.zIndex = '10';
        });
      });
    };

    const timer = setTimeout(initPhysics, 100);

    const handleResize = () => {
      updateBoundaries();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      Engine.clear(engine);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const engine = engineRef.current;
    engine.world.gravity.y = gravityEnabled ? 1 : 0;
    
    if (!gravityEnabled) {
      const bodies = Matter.Composite.allBodies(engine.world);
      bodies.forEach(body => {
        if (!body.isStatic) {
          Matter.Body.setVelocity(body, {
            x: (Math.random() - 0.5) * 8,
            y: (Math.random() - 0.5) * 8
          });
          Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.2);
        }
      });
    }
  }, [gravityEnabled]);

  const handleButtonClick = (path) => {
    // Check if the body is being dragged or moving fast
    const buttonBody = bodiesRef.current.find(b => b.element === (path === '/register/student' ? button1Ref.current : button2Ref.current))?.body;
    if (buttonBody && buttonBody.speed < 2) {
      navigate(path);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[100vh] overflow-hidden bg-white select-none transition-colors duration-1000"
    >
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Background Large Text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
        <h1 className="text-[25vw] font-black uppercase leading-none tracking-tighter">Gravity</h1>
      </div>

      {/* Control Panel */}
      <div className="absolute top-24 right-8 z-[100] flex items-center gap-4">
        <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md p-2 pl-4 rounded-full border border-gray-200 shadow-xl">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Physics Engine</span>
          <div className="h-4 w-[1px] bg-gray-200 mx-1" />
          <button 
            onClick={() => setGravityEnabled(!gravityEnabled)}
            className="flex items-center gap-2 group"
          >
            <span className={`text-xs font-bold transition-colors ${gravityEnabled ? 'text-blue-600' : 'text-gray-400'}`}>
              {gravityEnabled ? 'EARTH' : 'SPACE'}
            </span>
            <div className={`w-10 h-5 rounded-full transition-all duration-500 relative ${gravityEnabled ? 'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'bg-gray-300'}`}>
              <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-500 ${gravityEnabled ? 'left-6' : 'left-1'}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Falling Elements (Initially placed in center, physics takes over) */}
      <div className="relative z-10 w-full h-full">
        
        {/* Headline */}
        <div 
          ref={headlineRef}
          className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-[3px] border-black p-10 md:p-16 rounded-[40px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-4xl text-center cursor-grab active:cursor-grabbing hover:rotate-1 transition-transform duration-300"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest mb-6">
            New Era of Networking
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tight text-black leading-[0.9]">
            ANTIGRAVITY <br /> <span className="text-blue-600">WORKSPACE</span>
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
            A high-performance ecosystem where mentors and students collide. Drag anything, break the rules.
          </p>
        </div>

        {/* Buttons */}
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-8">
          <button 
            ref={button1Ref}
            onClick={() => handleButtonClick('/register/student')}
            className="bg-black text-white px-12 py-6 rounded-full font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group"
          >
            GET STARTED 
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            ref={button2Ref}
            onClick={() => handleButtonClick('/features')}
            className="bg-white text-black border-[3px] border-black px-12 py-6 rounded-full font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            EXPLORE
          </button>
        </div>

        {/* Icons */}
        {ICONS.map(({ Icon, label }, index) => (
          <div 
            key={index}
            ref={el => iconRefs.current[index] = el}
            style={{ 
              left: `${10 + (index * 7) % 80}%`, 
              top: `${15 + (index * 9) % 50}%` 
            }}
            className="absolute cursor-grab active:cursor-grabbing p-6 bg-white border-2 border-gray-100 rounded-3xl shadow-xl hover:shadow-2xl hover:border-blue-200 transition-all flex flex-col items-center gap-3 group"
          >
            <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-blue-50 transition-colors">
              <Icon className="w-8 h-8 text-black group-hover:text-blue-600 transition-colors" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-blue-400">{label}</span>
          </div>
        ))}
      </div>

      {/* Interaction Hint */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-black" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black">Drag to Interfere</span>
        <Grab className="w-5 h-5 text-black animate-bounce" />
      </div>

      {/* Decorative Corner Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-black/10 m-8 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-black/10 m-8 pointer-events-none" />
    </div>
  );
};

export default AntigravityHero;
