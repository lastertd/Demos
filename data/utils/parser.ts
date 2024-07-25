import {isEmpty} from "./type";

const assetsParser = (data: any) => {
  if (isEmpty(data)) return data;

  const assets = data?.assets as Array<any>;

  for (let item of assets) {
    const url = (item?.p as string ?? "").replace(/\/market-monet/g, "https://commimg.pddpic.com/market-monet");
    if (!isEmpty(item.p) && !item.p.startsWith("http")) {
      item.p = url;
    }
  }

  return data;
};

export {
  assetsParser,
};