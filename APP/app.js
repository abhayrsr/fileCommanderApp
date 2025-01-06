const { watch, open, stat } = require('node:fs/promises');

(async () => {

    const commandFileHandler = await open('./command.txt', 'r');

    commandFileHandler.on("change", async () => {
    
        const size = (await stat('./command.txt')).size;
        //we want to read the content...
        const buff = Buffer.alloc(size);
        const offset = 0;
        const length = buff.byteLength;
        const position = 0;
        const content = await commandFileHandler.read(
          buff,
          offset,
          length,
          position
        );

    });


    const watcher = watch('./command.txt');

    try{

    for await(const event of watcher){
      commandFileHandler.emit("change");
    }
    } finally {
      
      await filehandle.close()
    }

})();

