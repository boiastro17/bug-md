function delay(ms) {
  console.log(`⏱️ delay for ${ms}ms`)
  return new Promise(resolve => setTimeout(resolve, ms))
}


async function loading (dest, hn) {
var lod = [
"《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
"《 ████▒▒▒▒▒▒▒▒》30%",
"《 ███████▒▒▒▒▒》50%",
"《 ██████████▒▒》80%",
"《 ████████████》100%",
"Loading Completed✅"
]
let { key } = await hn.sendMessage(dest, {text: 'Loading Please Wait'})

for (let i = 0; i < lod.length; i++) {
await hn.sendMessage(dest, {text: lod[i], edit: key });
}
}

function react(dest, hn, msg, reaction){
  hn.sendMessage(dest, {react: {text : reaction, key: msg.key}});
}

module.exports = {
  delay,
  loading,
  react
}
