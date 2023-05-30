const [nodePath, filePath, ...commands] = process.argv;

// console.log(comands);

function parseArguments(_commands) {
  const cmd = new Map();
  const commandPrefix = '--';

  for (const key in _commands) {
    const index = parseInt(key);
    const command = _commands[key];

    if (!command.includes(commandPrefix)) {
      continue;
    }

    cmd.set(
      command.replace(commandPrefix, ''),
      _commands[index + 1]
    );
  }

  return Object.fromEntries(cmd);
}

console.log(parseArguments(commands));