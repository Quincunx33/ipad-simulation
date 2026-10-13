import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import {
  Wrench, RotateCcw, ChevronRight, AlertTriangle,
  Cpu, Battery, Speaker, Camera, Home as HomeIcon,
  Zap, Thermometer, Activity,
} from 'lucide-react';

const COMPONENTS = [
  { id: 'display', name: 'Display Assembly', partNumber: 'A2133', difficulty: 'Hard' as const, cost: '$149', description: '7.9-inch laminated Retina display with True Tone', zOffset: 70 },
  { id: 'battery', name: 'Battery', partNumber: 'A1484', difficulty: 'Medium' as const, cost: '$39', description: '19.1Wh lithium-polymer battery', zOffset: 20 },
  { id: 'motherboard', name: 'Logic Board', partNumber: 'A2134', difficulty: 'Hard' as const, cost: '$299', description: 'A12 Bionic chip with Neural Engine', zOffset: 40 },
  { id: 'speakers', name: 'Stereo Speakers', partNumber: 'A2135', difficulty: 'Easy' as const, cost: '$25', description: 'Dual stereo speakers', zOffset: 50 },
  { id: 'lightning', name: 'Lightning Connector', partNumber: 'A2136', difficulty: 'Medium' as const, cost: '$19', description: 'Lightning port and flex cable', zOffset: 55 },
  { id: 'touchid', name: 'Touch ID Sensor', partNumber: 'A2137', difficulty: 'Hard' as const, cost: '$45', description: 'Home button with Touch ID', zOffset: 55 },
  { id: 'camera', name: 'Rear Camera', partNumber: 'A2138', difficulty: 'Medium' as const, cost: '$59', description: '8MP camera with HDR', zOffset: 75 },
  { id: 'housing', name: 'Rear Housing', partNumber: 'A2139', difficulty: 'Medium' as const, cost: '$89', description: 'Aluminum unibody rear case', zOffset: 0 },
];

const REPAIR_STEPS = [
  'Power off device completely',
  'Heat display edges with heat gun (4 sides)',
  'Apply suction cups to screen',
  'Gently lift display with pry tool',
  'Disconnect battery connector first',
  'Remove display bracket screws (4x)',
  'Disconnect display flex cables',
  'Remove logic board shields (5x screws)',
  'Disconnect cameras and sensors',
  'Remove Lightning connector assembly',
  'Remove speaker modules',
  'Remove logic board carefully',
  'Remove battery (pull adhesive strips)',
  'Replace damaged component',
  'Reassemble in reverse order',
];

const TOOLS = [
  { id: 'heatgun', name: 'Heat Gun', icon: Thermometer },
  { id: 'suction', name: 'Suction Cup', icon: Activity },
  { id: 'spudger', name: 'Spudger', icon: Wrench },
  { id: 'screwdriver', name: 'Screwdriver', icon: Wrench },
  { id: 'tweezers', name: 'Tweezers', icon: Zap },
];

export default function RepairSimulator() {
  const [view, setView] = useState<'menu' | 'teardown' | 'guide' | 'diagnostics'>('menu');
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [exploded, setExploded] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [damageLog, setDamageLog] = useState<string[]>([]);
  const [screwsLeft, setScrewsLeft] = useState(28);
  const exitRepairMode = useStore((s) => s.exitRepairMode);
  const goHome = useStore((s) => s.goHome);

  const handleExit = () => {
    exitRepairMode();
    goHome();
  };

  const handleComponentClick = (id: string) => {
    setSelectedComponent(selectedComponent === id ? null : id);
    if (selectedTool === 'spudger' && id === 'motherboard') {
      setDamageLog([...damageLog, 'Warning: Handle logic board with care - static sensitive']);
    }
  };

  const handleToolUse = (toolId: string) => {
    setSelectedTool(toolId);
    if (toolId === 'screwdriver' && exploded) {
      setScrewsLeft(Math.max(0, screwsLeft - 1));
    }
    if (toolId === 'heatgun') {
      setDamageLog([...damageLog, 'Heating display edges... adhesive softening']);
    }
  };

  // Menu View
  if (view === 'menu') {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] to-[#0f0f23] flex flex-col p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[28px] font-bold text-white">Repair Lab</h1>
          <button onClick={handleExit} className="text-[14px] text-[#007aff]">Exit</button>
        </div>

        <div className="space-y-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setView('teardown')}
            className="w-full rounded-[16px] p-4 text-left"
            style={{ background: 'linear-gradient(135deg, rgba(0,122,255,0.2), rgba(88,86,214,0.2))', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-[48px] h-[48px] rounded-[12px] bg-[#007aff] flex items-center justify-center">
                <Wrench size={24} color="white" />
              </div>
              <div className="flex-1">
                <div className="text-[17px] font-semibold text-white">3D Teardown</div>
                <div className="text-[13px] text-white/60">Explore exploded view of iPad components</div>
              </div>
              <ChevronRight size={18} color="white" />
            </div>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setView('guide')}
            className="w-full rounded-[16px] p-4 text-left"
            style={{ background: 'linear-gradient(135deg, rgba(52,199,89,0.2), rgba(48,209,88,0.2))', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-[48px] h-[48px] rounded-[12px] bg-[#34c759] flex items-center justify-center">
                <RotateCcw size={24} color="white" />
              </div>
              <div className="flex-1">
                <div className="text-[17px] font-semibold text-white">Step-by-Step Guide</div>
                <div className="text-[13px] text-white/60">Follow repair procedures safely</div>
              </div>
              <ChevronRight size={18} color="white" />
            </div>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setView('diagnostics')}
            className="w-full rounded-[16px] p-4 text-left"
            style={{ background: 'linear-gradient(135deg, rgba(255,149,0,0.2), rgba(255,204,0,0.2))', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-[48px] h-[48px] rounded-[12px] bg-[#ff9500] flex items-center justify-center">
                <Activity size={24} color="white" />
              </div>
              <div className="flex-1">
                <div className="text-[17px] font-semibold text-white">Diagnostics</div>
                <div className="text-[13px] text-white/60">Run hardware diagnostic tests</div>
              </div>
              <ChevronRight size={18} color="white" />
            </div>
          </motion.button>
        </div>

        {/* Device Info Card */}
        <div className="mt-6 rounded-[14px] p-4" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <div className="text-[13px] text-white/40 uppercase mb-2">Device Info</div>
          <div className="grid grid-cols-2 gap-2 text-[13px]">
            <span className="text-white/50">Model:</span><span className="text-white/80">iPad mini 5</span>
            <span className="text-white/50">Chip:</span><span className="text-white/80">A12 Bionic</span>
            <span className="text-white/50">Display:</span><span className="text-white/80">7.9" Retina</span>
            <span className="text-white/50">Screws:</span><span className="text-white/80">{screwsLeft}/28</span>
          </div>
        </div>
      </div>
    );
  }

  // Teardown View
  if (view === 'teardown') {
    const activeComp = COMPONENTS.find((c) => c.id === selectedComponent);

    return (
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] to-[#0f0f23] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 shrink-0">
          <button onClick={() => { setView('menu'); setExploded(false); }} className="text-[#007aff] text-[17px]">Back</button>
          <span className="text-[17px] font-semibold text-white">3D Teardown</span>
          <button onClick={() => setExploded(!exploded)} className="text-[#007aff] text-[14px]">
            {exploded ? 'Assemble' : 'Explode'}
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Component Info Panel */}
          <div className="w-[200px] shrink-0 p-3 overflow-y-auto">
            <div className="text-[11px] text-white/40 uppercase mb-2">Tools</div>
            <div className="flex flex-wrap gap-1 mb-4">
              {TOOLS.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => handleToolUse(tool.id)}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                    selectedTool === tool.id ? 'bg-[#007aff]' : 'bg-white/10 hover:bg-white/20'
                  }`}
                  title={tool.name}
                >
                  <tool.icon size={16} color="white" />
                </button>
              ))}
            </div>

            {activeComp ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-[10px] p-3"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <div className="text-[14px] font-semibold text-white">{activeComp.name}</div>
                <div className="text-[11px] text-white/50 mt-1">{activeComp.partNumber}</div>
                <div className="text-[12px] text-white/70 mt-2">{activeComp.description}</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                    activeComp.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                    activeComp.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>{activeComp.difficulty}</span>
                  <span className="text-[12px] text-white/60">{activeComp.cost}</span>
                </div>
              </motion.div>
            ) : (
              <div className="text-[12px] text-white/40">Click a component to inspect</div>
            )}

            {/* Damage Log */}
            {damageLog.length > 0 && (
              <div className="mt-4">
                <div className="text-[11px] text-white/40 uppercase mb-1">Log</div>
                {damageLog.slice(-5).map((log, i) => (
                  <div key={i} className="text-[11px] text-white/60 py-0.5 border-b border-white/5">{log}</div>
                ))}
              </div>
            )}
          </div>

          {/* Exploded View */}
          <div className="flex-1 flex items-center justify-center" style={{ perspective: '800px' }}>
            <div className="relative" style={{ transformStyle: 'preserve-3d', width: '200px', height: '280px' }}>
              {COMPONENTS.map((comp) => {
                const isSelected = selectedComponent === comp.id;
                return (
                  <motion.div
                    key={comp.id}
                    onClick={() => handleComponentClick(comp.id)}
                    className="absolute inset-0 rounded-[12px] cursor-pointer flex items-center justify-center border-2 transition-colors"
                    style={{
                      background: isSelected ? 'rgba(0,122,255,0.3)' : 'rgba(255,255,255,0.05)',
                      borderColor: isSelected ? '#007aff' : 'rgba(255,255,255,0.1)',
                    }}
                    animate={{
                      translateZ: exploded ? comp.zOffset : 0,
                      scale: isSelected ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                  >
                    <span className="text-[10px] text-white/60 text-center px-2">{comp.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Guide View
  if (view === 'guide') {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] to-[#0f0f23] flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 shrink-0">
          <button onClick={() => setView('menu')} className="text-[#007aff] text-[17px]">Back</button>
          <span className="text-[17px] font-semibold text-white">Repair Guide</span>
          <div className="w-[50px]" />
        </div>

        {/* Progress */}
        <div className="px-4 mb-3">
          <div className="w-full h-[4px] rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-[#34c759]"
              animate={{ width: `${(currentStep / REPAIR_STEPS.length) * 100}%` }}
            />
          </div>
          <div className="text-[12px] text-white/50 mt-1">Step {currentStep + 1} of {REPAIR_STEPS.length}</div>
        </div>

        {/* Current Step */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-[80px] h-[80px] rounded-full bg-[#34c759]/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-[32px] font-bold text-[#34c759]">{currentStep + 1}</span>
            </div>
            <div className="text-[22px] font-semibold text-white mb-2">{REPAIR_STEPS[currentStep]}</div>
            <div className="text-[14px] text-white/50">
              {currentStep < 4 ? 'Use heat gun and suction tool' :
               currentStep < 7 ? 'Carefully disconnect cables' :
               currentStep < 12 ? 'Remove screws and components' :
               'Replace and reassemble'}
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            className="text-[17px] text-white/50 disabled:opacity-30"
            disabled={currentStep === 0}
          >
            Previous
          </button>
          <button
            onClick={() => {
              if (currentStep >= REPAIR_STEPS.length - 1) {
                setView('menu');
                setCurrentStep(0);
              } else {
                setCurrentStep(currentStep + 1);
              }
            }}
            className="px-6 py-2 rounded-full bg-[#007aff] text-white text-[17px] font-medium"
          >
            {currentStep >= REPAIR_STEPS.length - 1 ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    );
  }

  // Diagnostics View
  if (view === 'diagnostics') {
    const tests = [
      { name: 'Display', status: 'passed', icon: Cpu },
      { name: 'Touch ID', status: 'passed', icon: HomeIcon },
      { name: 'Battery', status: 'warning', icon: Battery, detail: '85% health' },
      { name: 'Camera', status: 'passed', icon: Camera },
      { name: 'Speakers', status: 'passed', icon: Speaker },
      { name: 'Lightning Port', status: 'passed', icon: Zap },
    ];

    return (
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] to-[#0f0f23] flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 shrink-0">
          <button onClick={() => setView('menu')} className="text-[#007aff] text-[17px]">Back</button>
          <span className="text-[17px] font-semibold text-white">Diagnostics</span>
          <div className="w-[50px]" />
        </div>

        <div className="flex-1 overflow-y-auto px-4">
          {tests.map((test, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 py-3 border-b border-white/5"
            >
              <div className={`w-[36px] h-[36px] rounded-full flex items-center justify-center ${
                test.status === 'passed' ? 'bg-green-500/20' : test.status === 'warning' ? 'bg-yellow-500/20' : 'bg-red-500/20'
              }`}>
                <test.icon size={18} color={
                  test.status === 'passed' ? '#34c759' : test.status === 'warning' ? '#ff9500' : '#ff3b30'
                } />
              </div>
              <div className="flex-1">
                <div className="text-[15px] text-white">{test.name}</div>
                {test.detail && <div className="text-[12px] text-white/50">{test.detail}</div>}
              </div>
              <span className={`text-[13px] px-2 py-0.5 rounded-full ${
                test.status === 'passed' ? 'text-green-400 bg-green-500/10' :
                test.status === 'warning' ? 'text-yellow-400 bg-yellow-500/10' :
                'text-red-400 bg-red-500/10'
              }`}>
                {test.status === 'passed' ? 'OK' : test.status === 'warning' ? 'Warning' : 'Failed'}
              </span>
            </motion.div>
          ))}

          {/* Warning Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-4 rounded-[12px] p-3 flex items-start gap-2"
            style={{ background: 'rgba(255,149,0,0.1)', border: '1px solid rgba(255,149,0,0.2)' }}
          >
            <AlertTriangle size={18} color="#ff9500" className="mt-0.5 shrink-0" />
            <div>
              <div className="text-[14px] font-medium text-[#ff9500]">Battery Health at 85%</div>
              <div className="text-[12px] text-white/60 mt-1">Consider replacement soon for optimal performance.</div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
}
