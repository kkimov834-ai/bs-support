import { useState, useRef, useEffect } from "react";

const MiniTerminal = () => {
	const [history, setHistory] = useState([
		"Welcome to Terminal",
		"Type 'help' for commands",
		"$ ",
	]);
	const [input, setInput] = useState("");
	const [commandHistory, setCommandHistory] = useState([]);
	const [historyIndex, setHistoryIndex] = useState(-1);
	const terminalRef = useRef(null);

	const terminalStyle = {
		backgroundColor: "#1e1e1e",
		color: "#00ff00",
		padding: "15px",
		borderRadius: "8px",
		fontFamily: "Courier New, monospace",
		fontSize: "14px",
		width: "100%",
		maxWidth: "600px",
		height: "300px",
		overflowY: "auto",
		border: "1px solid #333",
		boxShadow: "0 10px 20px rgba(0,0,0,0.5)",
	};

	const inputStyle = {
		backgroundColor: "transparent",
		color: "#00ff00",
		border: "none",
		outline: "none",
		fontFamily: "Courier New, monospace",
		fontSize: "14px",
		width: "calc(100% - 20px)",
		marginTop: "5px",
	};

	const commands = {
		help: "Available commands: help, clear, echo, date, time, whoami",
		clear: () => {
			setHistory(["$ "]);
			setInput("");
		},
		echo: (args) => args.join(" "),
		date: () => new Date().toLocaleDateString(),
		time: () => new Date().toLocaleTimeString(),
		whoami: () => "user@terminal",
	};

	const executeCommand = (cmd) => {
		const trimmed = cmd.trim();
		if (!trimmed) return;

		const [command, ...args] = trimmed.split(" ");
		const lowerCmd = command.toLowerCase();

		let output = "";

		if (lowerCmd === "clear") {
			commands.clear();
			return;
		} else if (lowerCmd in commands) {
			const result = commands[lowerCmd];
			output = typeof result === "function" ? result(args) : result;
		} else if (trimmed) {
			output = `Command not found: ${command}. Type 'help' for available commands.`;
		}

		setHistory((prev) => [
			...prev.slice(0, -1),
			`$ ${trimmed}`,
			output,
			"$ ",
		]);
		setCommandHistory((prev) => [...prev, trimmed]);
		setHistoryIndex(-1);
		setInput("");
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			executeCommand(input);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			const newIndex = historyIndex + 1;
			if (newIndex < commandHistory.length) {
				setHistoryIndex(newIndex);
				setInput(commandHistory[commandHistory.length - 1 - newIndex]);
			}
		} else if (e.key === "ArrowDown") {
			e.preventDefault();
			if (historyIndex > 0) {
				const newIndex = historyIndex - 1;
				setHistoryIndex(newIndex);
				setInput(commandHistory[commandHistory.length - 1 - newIndex]);
			} else if (historyIndex === 0) {
				setHistoryIndex(-1);
				setInput("");
			}
		}
	};

	useEffect(() => {
		if (terminalRef.current) {
			terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
		}
	}, [history]);

	return (
		<div
			marginTop="20px"
			className="terminal-container"
			style={terminalStyle}
			ref={terminalRef}
		>
			<div style={{ color: "#ff5f56", marginBottom: "10px" }}>● ● ●</div>
			<pre
				style={{
					margin: 0,
					whiteSpace: "pre-wrap",
					wordWrap: "break-word",
				}}
			>
				{history.map((line, i) => (
					<div key={i}>{line}</div>
				))}
			</pre>
			<input
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				onKeyDown={handleKeyDown}
				style={inputStyle}
				autoFocus
				placeholder=""
			/>
		</div>
	);
};

export default MiniTerminal;
