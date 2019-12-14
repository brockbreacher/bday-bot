const fs = require("fs").promises;
const path = require("path");

let variables = ["TOKEN", "PREFIX", "DB_HOST", "DB_PORT", "DB_USERNAME", "DB_PASSWORD", "DB_DATABASE"];
const filename = path.join(__dirname, "..", ".env");

(async () => {
	const handle = await fs.open(filename, "a+");
	const content = await handle.readFile({ encoding: "utf8" });
	if (content) {
		console.log("Found current .env file, ignoring existing variables...");
		variables = variables.filter(x => !content.match(new RegExp(`${x}`, "m")));
	}
	await handle.appendFile(variables.reduce((acc, x) => acc + `${x}=\n`, content[content.length-1] && content[content.length-1] === "\n" ? "" : "\n"));
	console.log("\nGenerated .env file.\n\n You will need to edit this file to set the config options before running the bot.");
})();
