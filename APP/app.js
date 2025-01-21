const { watch, open, stat } = require("node:fs/promises");

(async () => {
  const createFile = async (path) => {

    try{
      const existingFileHandle = await open(path, "r");
      existingFileHandle.close();
      return console.log(`The File ${path} already exist.`);      
    } catch(e){
      const newFileHandle = await open(path, 'w');
      console.log("A new file was successfully created.");
      newFileHandle.close();
    }
    
  }
  const commandFileHandler = await open("./command.txt", "r");
  const CREATE_FILE = "create a file";
  try {
    commandFileHandler.on("change", async () => {

      const size = (await stat("./command.txt")).size;
      const buff = Buffer.alloc(size);
      const offset = 0;
      const length = buff.byteLength;
      const position = 0;
      await commandFileHandler.read(buff, offset, length, position);
      console.log(buff.toString("utf-8"));
      const command = buff.toString("utf-8");

      if (command.includes(CREATE_FILE)) {
        const filePath = command.substring(CREATE_FILE.length + 1);
        createFile(filePath);
      }
      
    });
  } catch (error) {
    console.log(error);
  }

  const watcher = watch("./command.txt");

  try {
    for await (const event of watcher) {
      commandFileHandler.emit("change");
    }
  } catch (error) {
    console.log(error);
  } finally {
    await filehandle.close();
  }
})();
