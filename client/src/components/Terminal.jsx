import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCommands, getCommandDetails } from '../redux/actions/commandActions';
import { listProjects, getProjectDetails } from '../redux/actions/projectActions';
import TypingEffect from './TypingEffect';

const Terminal = () => {
  const dispatch = useDispatch();
  const terminalEndRef = useRef(null);

  const inputRef = useRef(null);
  
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);

  const { commands } = useSelector((state) => state.commandList);
  const { projects } = useSelector((state) => state.projectList);

  useEffect(() => {
    dispatch(listCommands());
    dispatch(listProjects());
    
    // Welcome message
    setHistory([
      {
        type: 'output',
        content: 'Type "help" to see available commands and "clear" to clear terminal.',
        timestamp: new Date(),
      },
    ]);
  }, [dispatch]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = async (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (!trimmedCmd) return;

    // Add command to history
    setHistory((prev) => [
      ...prev,
      { type: 'command', content: cmd, timestamp: new Date() },
    ]);
    
    setCommandHistory((prev) => [...prev, cmd]);
    setIsTyping(true);

    // Built-in commands
    if (trimmedCmd === 'clear' || trimmedCmd === 'cls') {
      setHistory([]);
      setIsTyping(false);
      return;
    }

    if (trimmedCmd === 'help') {
      const helpText = commands
        .filter((c) => c.showInHeader)
        .map((c) => `  ${c.name.padEnd(15)} - ${c.description}`)
        .join('\n');
      
      addOutput(`Available commands:\n${helpText}\n\nType any command to see its output.`);
      return;
    }

    if (trimmedCmd === 'projects') {
      if (projects && projects.length > 0) {
        const projectList = projects
          .map((p, idx) => `  ${idx + 1}. ${p.title} - ${p.description}\n     Command: project ${p.terminalCommand}`)
          .join('\n\n');
        
        addOutput(`My Projects:\n\n${projectList}\n\nUse 'project <name>' to view details.`);
      } else {
        addOutput('No projects found. Check back soon!');
      }
      return;
    }

    if (trimmedCmd.startsWith('project ')) {
      const projectCmd = trimmedCmd.split(' ')[1];
      const project = projects.find((p) => p.terminalCommand.toLowerCase() === projectCmd);
      
      if (project) {
        let output = `╔═══════════════════════════════════════════╗\n`;
        output += `║  ${project.title.toUpperCase()}\n`;
        output += `╚═══════════════════════════════════════════╝\n\n`;
        output += `Description:\n  ${project.description}\n\n`;
        output += `Technologies:\n  ${project.technologies.join(', ')}\n\n`;
        if (project.liveUrl) output += `Live URL: ${project.liveUrl}\n`;
        if (project.repoUrl) output += `Repository: ${project.repoUrl}\n`;
        
        addOutput(output);
      } else {
        addOutput(`Project '${projectCmd}' not found. Type 'projects' to see all projects.`);
      }
      return;
    }

    // Check custom commands
    const command = commands.find((c) => c.name.toLowerCase() === trimmedCmd);
    
    if (command) {
      addOutput(command.output);
    } else {
      addOutput(`Command not found: ${trimmedCmd}\nType 'help' for available commands.`);
    }
  };

  const addOutput = (content) => {
    setHistory((prev) => [
      ...prev,
      { type: 'output', content, timestamp: new Date(), isTyping: true },
    ]);
  };

  const handleTypingComplete = (index) => {
    setHistory((prev) =>
      prev.map((item, i) => (i === index ? { ...item, isTyping: false } : item))
    );
    setIsTyping(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isTyping) {
      handleCommand(input);
      setInput('');
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="bg-terminal-bg border border-terminal-text/40 rounded-lg p-6 lg:min-h-[80vh] flex flex-col font-mono text-sm"
    onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-4 p-3! bg-black rounded-t-lg border-b border-terminal-text/40">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-2 text-terminal-text/70 text-xs font-bold">terminal@portfolio:~$</span>
        
      </div>

      {/* Terminal Content */}
      <div className="flex-1 overflow-y-auto mb-4! p-3! space-y-2">
        {history.map((item, index) => (
          <div key={index} className="leading-relaxed">
            {item.type === 'command' ? (
              <div className="flex items-start gap-2 my-6!">
                <span className="text-terminal-prompt shrink-0 ">lonnex@portfolio:~$</span>
                <span className="text-terminal-text">{item.content}</span>
              </div>
            ) : (
              <div className="text-terminal-text border-l border-terminal-text/40 pl-6!">
                {item.isTyping ? (
                  <TypingEffect
                    text={item.content}
                    speed={10}
                    onComplete={() => handleTypingComplete(index)}
                  />
                ) : (
                  <span className="whitespace-pre-wrap">{item.content}</span>
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <span className="text-terminal-prompt shrink-0 p-3!">lonnex@portfolio:~$</span>
        {/* Hidden real input (stores text + handles events) */}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isTyping}
          className="opacity-0 absolute pointer-events-none"
          autoFocus
        />

        {/* Visible fake input (what user actually sees) */}
        <div className="terminal-input-visual flex-1 text-terminal-text!" onClick={() => inputRef.current?.focus()}
        >
          {input}

          {/* Block cursor */}
          {!isTyping && (
            <span
              className="terminal-cursor"
              style={{
                left: `${input.length}ch`,
                top: 0,
              }}
            >
              █
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default Terminal;