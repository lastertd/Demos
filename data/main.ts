// 示例字符串数组，其中每个字符串都是一个URL
import {assetsParser, getFileName, getJson, saveAllImg, saveJson} from "./utils";

import {ans} from "./utils";

// const ans = [
//   "https://commimg.pddpic.com/market-monet/2023-06-20/6f9f29bd457e65f20163f90bcb3a05eb.json",
//
// ];

async function main() {
  for (let url of ans) {
    const jsonData = await getJson(url);
    const aimJsonData = assetsParser(jsonData);
    const fileName = getFileName(url);

    await saveJson(`./data/files/${fileName}`, aimJsonData);
    await saveAllImg(`./data/files/${fileName}`, aimJsonData);
  }


}


main().catch(e => {
  console.log(e, "在主函数中出现了错误", e.message);
});

