import {promises as fs, createWriteStream} from "fs";
import {dirname, join} from "path";
import axios from "axios";

const getFileName = (url: string, v: number = 1) => {
  const file = url.split("/").pop()!;

  if (v === 2) {
    return file;
  }


  return file.split(".")[0];
};

// 创建目录的异步函数
async function ensureDirectoryExistence(filePath: string) {
  const dName = dirname(filePath);
  try {
    await fs.access(dName);
  } catch (err) {
    // 如果目录不存在，则创建目录
    await fs.mkdir(dName, {recursive: true});
  }
}

const saveJson = async (prefix: string, data: any) => {
  const filePath = join(prefix, "data.json");

  try {
    // 确保目录存在
    await ensureDirectoryExistence(filePath);

    // 将 JSON 对象转换为字符串
    const jsonString = JSON.stringify(data, null, 2);

    // 写入文件
    await fs.writeFile(filePath, jsonString, "utf8");
    console.log("文件已成功保存在", filePath);
  } catch (err) {
    console.error("写入文件时出错:", err);
  }
};

// 从 URL 中提取日期
const extractDateFromUrl = (url: string) => {
  const match = url.match(/(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : null;
};

// 保存图片的异步函数
const saveImg = async (prefix: string, imgUrl: string): Promise<void> => {
  const date = extractDateFromUrl(imgUrl);
  if (!date) {
    console.error("无法从 URL 提取日期");
    return;
  }

  // 创建完整的目录路径
  const filePath = join(prefix, date, getFileName(imgUrl, 2));

  try {
    // 确保目录存在
    await ensureDirectoryExistence(filePath);

    // 下载图片
    const response = await axios.get(imgUrl, {responseType: "stream"});
    const writer = createWriteStream(filePath);
    response.data.pipe(writer);

    writer.on("finish", () => {
      console.log("图片已成功下载");
    });

    writer.on("error", (err) => {
      console.error("写入文件时出错:", err);
    });
  } catch (error) {
    console.error("下载图片时出错:", error);
  }
};

const saveAllImg = async (prefix: string, data: any) => {
  const assets = data?.assets as Array<any>;

  for (let item of assets) {
    if (!item.id.startsWith("image")) continue;
    const imgUrl = item.p;
    await saveImg(prefix, imgUrl);
  }

};


export {
  getFileName, saveJson, saveAllImg,
};