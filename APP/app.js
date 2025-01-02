/*const { watch } = require('node:fs/promises');
const ac = new AbortController();
const { signal } = ac;
setTimeout(() => ac.abort(), 10000);

(async () => {
  try {

    const watcher = await watch('./command.txt', {signal})

    for await (const event of watcher)
      console.log(event);
    
  } catch (err) {
    if (err.name === 'AbortError')
      return;
    throw err;
  }
})();*/ 


const fs = require('fs');

const watcher = fs.watch('./command.txt', (eventType, filename) => {
  if (filename) {
    console.log({ eventType, filename });
  }
});

// Run a blocking loop for 10 seconds
const start = Date.now();
const duration = 10000; // 10 seconds

while (Date.now() - start < duration) {
  // Keep the process alive
}

// Stop watching after 10 seconds
watcher.close();
console.log('Stopped watching');

