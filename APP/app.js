const { watch, open, stat, unlink , rename} = require("node:fs/promises");

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

  const deleteFile = async(path) => {
    try{
      const existingFileHandle = await open(path, "r");
      if(existingFileHandle){
        await unlink(path);
        console.log(`Successfully deleted ${path}`)
      }
      existingFileHandle.close();
    } catch(e){
      console.log(e, `Error while deleting ${path}`);
    }
  }

  const renameFile = async(oldPath, newPath) => {
    try{
      const existingFileHandle = await open(oldPath, "r");
      if(existingFileHandle){
        const renamedFile = await rename(oldPath, newPath);
        console.log(`Successfully renamed ${newPath}`);
      }
      existingFileHandle.close();
    } catch(e) {
      console.log(e, `Error while renaming the ${newPath}`);
    }
  }

  const commandFileHandler = await open("./command.txt", "r");
  const CREATE_FILE = "create a file";
  const DELETE_FILE = "delete the file";
  const RENAME_FILE = "rename the file";
  try {
    commandFileHandler.on("change", async () => {

      const size = (await stat("./command.txt")).size;
      const buff = Buffer.alloc(size);
      const offset = 0;
      const length = buff.byteLength;
      const position = 0;
      await commandFileHandler.read(buff, offset, length, position);
      const command = buff.toString("utf-8");

      if (command.includes(CREATE_FILE)) {
        const filePath = command.substring(CREATE_FILE.length + 1);
        createFile(filePath);
      }

      if(command.includes(DELETE_FILE)){
        const filePath = command.substring(DELETE_FILE.length + 1);
        deleteFile(filePath);
      }

      if(command.includes(RENAME_FILE)){
        const oldFilePath = command.slice(RENAME_FILE.length + 1, RENAME_FILE.length + 13);
        const newFilePath = command.substring(RENAME_FILE.length + 17);
        renameFile(oldFilePath, newFilePath);
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
