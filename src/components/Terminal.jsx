import { useState, useRef, useEffect } from "react";

const MiniTerminal = () => {
	const [history, setHistory] = useState([
		"Welcome to Terminal",
		"Type '/' for commands",
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
		"/": "Available commands: help, clear, echo, date, time, whoami",
		clear: () => {
			setHistory(["$ "]);
			setInput("");
		},
		echo: (args) => args.join(" "),
		date: () => new Date().toLocaleDateString(),
		time: () => new Date().toLocaleTimeString(),
		whoami: () => "user@terminal",
	};

	const commandsMeta = [
		{ id: "/", label: "/", desc: "Show available commands" },
		{ id: "clear", label: "clear", desc: "Clear the terminal" },
		{ id: "echo", label: "echo", desc: "Echo input back" },
		{ id: "date", label: "date", desc: "Show current date" },
		{ id: "time", label: "time", desc: "Show current time" },
		{ id: "whoami", label: "whoami", desc: "Show current user" },
	];

	const [showPalette, setShowPalette] = useState(false);
	const [paletteIndex, setPaletteIndex] = useState(0);

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
			output = `Command not found: ${command}. Type '/' for available commands.`;
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
		// If palette is shown, use arrow keys to navigate it
		if (showPalette) {
			if (e.key === "ArrowUp") {
				e.preventDefault();
				setPaletteIndex(
					(i) => (i - 1 + commandsMeta.length) % commandsMeta.length,
				);
				return;
			} else if (e.key === "ArrowDown") {
				e.preventDefault();
				setPaletteIndex((i) => (i + 1) % commandsMeta.length);
				return;
			} else if (e.key === "Escape") {
				setShowPalette(false);
				return;
			} else if (e.key === "Enter") {
				e.preventDefault();
				// select highlighted command: insert into input and close
				const sel = commandsMeta[paletteIndex];
				if (sel) {
					setInput(sel.label + " ");
				}
				setShowPalette(false);
				return;
			}
		}

		if (e.key === "Enter") {
			e.preventDefault();
			executeCommand(input);
			return;
		}

		if (e.key === "ArrowUp") {
			e.preventDefault();
			const newIndex = historyIndex + 1;
			if (newIndex < commandHistory.length) {
				setHistoryIndex(newIndex);
				setInput(commandHistory[commandHistory.length - 1 - newIndex]);
			}
			return;
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
			return;
		}

		// Open palette when user presses '/' at empty input
		if (e.key === "/" && input.trim() === "" && !showPalette) {
			e.preventDefault();
			setShowPalette(true);
			setPaletteIndex(0);
			return;
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
			<div style={{ display: "flex", gap: "5px", marginBottom: "10px" }}>
				<div style={{ color: "#FF5F56", marginBottom: "10px" }}>●</div>
				<div style={{ color: "#FFBD2E", marginBottom: "10px" }}>●</div>
				<div style={{ color: "#27C93F", marginBottom: "10px" }}>●</div>
			</div>
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
			<div style={{ position: "relative" }}>
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleKeyDown}
					style={inputStyle}
					autoFocus
					placeholder=""
				/>

				{showPalette && (
					<div
						style={{
							position: "absolute",
							top: "110%",
							left: 0,
							background: "#0f1724",
							border: "1px solid #263044",
							borderRadius: 8,
							padding: 8,
							width: "100%",
							zIndex: 50,
						}}
					>
						{commandsMeta.map((c, idx) => (
							<div
								key={c.id}
								style={{
									display: "flex",
									justifyContent: "space-between",
									padding: "6px 8px",
									background:
										idx === paletteIndex
											? "#172033"
											: "transparent",
									borderRadius: 6,
									color: "#e6eef8",
									cursor: "pointer",
								}}
								onMouseEnter={() => setPaletteIndex(idx)}
								onMouseDown={(ev) => {
									ev.preventDefault();
									setInput(c.label + " ");
									setShowPalette(false);
								}}
							>
								<div>{c.label}</div>
								<div style={{ color: "#9fb0c8", fontSize: 12 }}>
									{c.desc}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default MiniTerminal;
