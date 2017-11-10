const leven = require('leven');

class RegistryUtil {
  similarCommand(registry, input) {
    for (let i = 0; i < registry.commands.length; i++) {
      for (let j = 0; j < registry.commands[i].names.length; j++) {
        const distance = leven(input, registry.commands[i].names[j]);

        if ((input.length >= 3 && input.length < 6 && distance === 1) ||
            (input.length >= 6 && input.length < 11 && distance <= 2) ||
            (input.length >= 11 && distance <= 3)) {
          return registry.commands[i].names[j];
        }
      }
    }
  }
}

module.exports = new RegistryUtil();
