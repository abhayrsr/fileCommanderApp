
const { watch } = require("fs/promises")

(async () => {
	
	try{
		const watcher = watch('./')
		for await (const event of watcher){
			console.log(event)
		}
	} catch(error){
		console.log(error)
	}

})();
