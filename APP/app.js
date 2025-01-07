const { watch, open, stat } = require('node:fs/promises');

(async () => {

    const commandFileHandler = await open('./command.txt', 'r');
    try{
          commandFileHandler.on("change", async () => {
        const size = (await stat('./command.txt')).size;
        //we want to read the content...
        const buff = Buffer.alloc(size);
        const offset = 0;
        const length = buff.byteLength;
        const position = 0;
        await commandFileHandler.read(
          buff,
          offset,
          length,
          position
        );
        console.log(buff.toString('utf-8'));
    
    });




    } catch(error){
      console.log(error);

    }

    const watcher = watch('./command.txt');

    try{

    for await(const event of watcher){
      commandFileHandler.emit("change");
      }
    } catch(error){

      console.log(error);

  } finally {
      
      await filehandle.close()
    }

})();

