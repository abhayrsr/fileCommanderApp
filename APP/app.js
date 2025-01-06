const { watch } = require('node:fs/promises');

(async () => {

  try {
    const watcher = watch('./command.txt')

    for await(const event of watcher){
      console.log(event)
      }
    } catch(err){
       throw err
      }
})();

