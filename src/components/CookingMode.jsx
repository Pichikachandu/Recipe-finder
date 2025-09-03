import { useState, useEffect, useRef } from 'react';
import { 
  FiPlay, 
  FiPause, 
  FiCheck, 
  FiChevronLeft, 
  FiChevronRight, 
  FiRotateCw,
  FiX
} from 'react-icons/fi';

const CookingMode = ({ 
  instructions, 
  onExit,
  initialStep = 0,
  onStepChange = () => {}
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const timerRef = useRef(null);

  // Timer functions
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    
    return () => clearInterval(timerRef.current);
  }, [isTimerRunning]);
  
  const startTimer = (seconds) => {
    setTimer(seconds);
    setIsTimerRunning(true);
  };
  
  const toggleTimer = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (timer > 0) {
      setIsTimerRunning(prev => !prev);
    } else {
      startTimer(instructions[currentStep]?.timer || 0);
    }
  };
  
  const resetTimer = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsTimerRunning(false);
    setTimer(instructions[currentStep]?.timer || 0);
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const toggleStepCompletion = (index, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCompletedSteps(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };
  
  const prevStep = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentStep > 0) {
      setCurrentStep(prev => {
        const newStep = prev - 1;
        onStepChange(newStep);
        return newStep;
      });
    }
  };

  const nextStep = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentStep < instructions.length - 1) {
      setCurrentStep(prev => {
        const newStep = prev + 1;
        onStepChange(newStep);
        return newStep;
      });
    }
  };

  const progress = instructions.length > 0 
    ? ((currentStep + 1) / instructions.length) * 100 
    : 0;

  if (!instructions || instructions.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground mb-4">No cooking instructions available.</p>
        <button
          onClick={onExit}
          className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
        >
          Exit Cooking Mode
        </button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border/30 overflow-hidden relative z-10" onClick={(e) => e.stopPropagation()}>
      {/* Progress Bar */}
      <div className="h-2 bg-accent/20">
        <div 
          className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            Step {currentStep + 1} of {instructions.length}
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              {completedSteps.includes(currentStep) ? '✓ Completed' : 'In Progress'}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onExit(e);
              }}
              className="p-2 rounded-lg hover:bg-accent/20 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Exit cooking mode"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>
        
        <div className="bg-accent/10 rounded-xl p-6 mb-6 min-h-[200px] flex items-center justify-center">
          <p className="text-lg text-center leading-relaxed">
            {instructions[currentStep]?.text}
          </p>
        </div>
        
        {/* Timer */}
        {instructions[currentStep]?.timer > 0 && (
          <div className="mb-6 bg-background rounded-xl p-4 border border-border/30">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Step Timer</h3>
              <span className="text-2xl font-mono font-bold">
                {formatTime(timer || instructions[currentStep]?.timer)}
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={toggleTimer}
                className="flex-1 flex items-center justify-center py-2 px-4 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                {isTimerRunning ? <FiPause className="mr-2" /> : <FiPlay className="mr-2" />}
                {isTimerRunning ? 'Pause' : 'Start'} Timer
              </button>
              <button
                onClick={resetTimer}
                className="p-2 rounded-lg bg-accent/30 text-foreground/70 hover:bg-accent/40 transition-colors"
                title="Reset Timer"
              >
                <FiRotateCw size={18} />
              </button>
            </div>
          </div>
        )}
        
        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center px-4 py-2 rounded-lg ${
              currentStep === 0 
                ? 'text-muted-foreground cursor-not-allowed' 
                : 'text-foreground hover:bg-accent/20'
            }`}
          >
            <FiChevronLeft className="mr-1" />
            Previous
          </button>
          
          <button
            onClick={(e) => toggleStepCompletion(currentStep, e)}
            className={`flex items-center px-6 py-2.5 rounded-full font-medium ${
              completedSteps.includes(currentStep)
                ? 'bg-green-500/10 text-green-600 hover:bg-green-500/20'
                : 'bg-primary/10 text-primary hover:bg-primary/20'
            }`}
          >
            <FiCheck className="mr-2" />
            {completedSteps.includes(currentStep) ? 'Completed' : 'Mark as Complete'}
          </button>
          
          <button
            onClick={nextStep}
            disabled={currentStep === instructions.length - 1}
            className={`flex items-center px-4 py-2 rounded-lg ${
              currentStep === instructions.length - 1
                ? 'text-muted-foreground cursor-not-allowed' 
                : 'text-foreground hover:bg-accent/20'
            }`}
          >
            Next
            <FiChevronRight className="ml-1" />
          </button>
        </div>
      </div>
      
      {/* Steps Overview */}
      <div className="border-t border-border/30 p-4 bg-accent/5">
        <h3 className="font-medium mb-3 px-2">Recipe Steps</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {instructions.map((step, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentStep(index);
                setTimer(0);
                setIsTimerRunning(false);
                onStepChange(index);
              }}
              className={`p-3 rounded-lg text-left text-sm transition-colors ${
                currentStep === index
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : completedSteps.includes(index)
                  ? 'bg-green-500/10 text-green-600 border border-green-500/20'
                  : 'bg-accent/10 hover:bg-accent/20'
              }`}
            >
              <div className="font-medium mb-1">Step {index + 1}</div>
              <div className="text-xs text-muted-foreground">
                {step.timer > 0 ? formatTime(step.timer) : 'No timer'}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CookingMode;
 