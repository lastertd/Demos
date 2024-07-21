<template>
  <div ref="turntableRef" class="turntable" :style="sdl">
    <div class="turntable-wrapper">
      <div class="turntable__bg1"></div>
      <div class="turntable__bg2"></div>
      <div class="turntable__container">
        <template v-for="(item, idx) of config.items" :key="item.id">
          <div class="turntable__item" :style="`--idx: ${idx}`">
            {{ item.description }}
            <img :src="item.imgUrl" alt=""/>
          </div>
        </template>
      </div>
    </div>

    <div class="turntable-button">
      <div class="turntable-button__inner" @click="handleClick">
        <span>抽奖</span>
        <span>剩余X次</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "大转盘效果演示",
});

interface TurntableConfig {
  /* 修正角度，由于轮盘背景由图片决定, 需要适当修正奖项的默认角度 */
  correctAngle: number;
  /* 轮盘大小 */
  size?: string;
  /* 轮盘当前旋转的角度 */
  currentAngle: number;
  /* 轮盘进行旋转时的持续时间 */
  duration: number;
  /* 缓动函数 */
  cuber: string;
  /* 在进行抽奖时额外选择的圈数 */
  laps: number;
  /* 是否正在进行旋转 */
  isRotating: boolean;
  /* 是否允许轮盘在滑动到指定目标时不是指向正中间，增加随机性 */
  allowRandom: boolean;
  /* 是否允许自传 */
  allowSelfRotate: boolean;
  /* 自转的速度, 一秒多少个deg */
  selfRotateSpeed: number;
  /* 轮盘的奖项 */
  items: Array<{
    /* 奖项ID */
    id: number;
    /* 奖项描述文字 */
    description: string;
    /* 奖项描述图片 */
    imgUrl?: string;
  }>;
}

const config: Ref<TurntableConfig> = ref({
  correctAngle: 30,
  size: "400px",
  currentAngle: 0,
  laps: 10,
  allowRandom: true,
  duration: 5000,
  cuber: "ease-in-out",
  isRotating: false,
  allowSelfRotate: true,
  selfRotateSpeed: 15,
  items: [
    {
      id: 0,
      description: "高级红包",
      imgUrl:
        "https://funimg.pddpic.com/common/spi_main/turtable_main_packet/yellow.png.slim.png",
    },
    {
      id: 1,
      description: "提现红包",
      imgUrl:
        "https://funimg.pddpic.com/common/spi_main/turtable_main_packet/green.png.slim.png",
    },
    {
      id: 2,
      description: "0.01元~0.5元",
      imgUrl:
        "https://funimg.pddpic.com/spi_main/fc3f93e0-34b8-43aa-a14b-b7e0c8a65f22.png.slim.png",
    },
    {
      id: 3,
      description: "提现红包*3",
      imgUrl:
        "https://funimg.pddpic.com/spi_main/three_icon_green_packet.png.slim.png",
    },
    {
      id: 4,
      description: "提现红包",
      imgUrl:
        "https://funimg.pddpic.com/common/spi_main/turtable_main_packet/green.png.slim.png",
    },
    {
      id: 5,
      description: "提现红包",
      imgUrl:
        "https://funimg.pddpic.com/common/spi_main/turtable_main_packet/green.png.slim.png",
    },
  ],
});

const sdl = computed(() => {
  return {
    "--size": config.value.size || "400px",
    "--current-angle": `${config.value.currentAngle}deg`,
    "--item-angle-size": `${360 / config.value.items.length}deg`,
    "--item-correct-angle": `${config.value.correctAngle}deg`,
    "--rotate-duration": `${config.value.duration}ms` || "700ms",
    "--rotate-cuber": config.value.cuber,
  };
});

const turntableRef = ref();

watch(
  () => config.value.allowSelfRotate,
  () => {
    if (config.value.allowSelfRotate) {
      selfRotate();
    } else {
      config.value.cuber = "ease-in-out";
    }
  },
);

/**
 * @description 滑动到指定id的奖项
 * @param id
 */
async function slideTo(id: number) {
  // 非法情况
  if (config.value.isRotating) return;

  // 设置标志"正在旋转"为真；设置标志"允许自转"为假
  config.value.isRotating = true;
  config.value.allowSelfRotate = false;

  // 计算最终需要到达的角度
  const oldAngle = config.value.currentAngle;
  const itemAngleSize = 360 / config.value.items.length;
  const aimAngle = itemAngleSize * (config.value.items.length - id);
  const moveAngle =
    aimAngle -
    (oldAngle % 360) -
    config.value.correctAngle +
    config.value.laps * 360;
  let randomAngle = 0;
  // 是否允许随机摆动一定的角度
  if (config.value.allowRandom) {
    let random = Math.random();
    random = random * 2 - 1;
    randomAngle = (random * itemAngleSize) / 2;
  }
  // 移动到目标角度
  config.value.currentAngle += moveAngle + randomAngle;

  // 等待旋转动画执行完成并添加一定的防抖时间
  await delay(config.value.duration + 300);

  // 设置标志"正在旋转"为假；
  config.value.isRotating = false;
}

/**
 * @description 自转函数
 */
async function selfRotate() {
  if (!config.value.allowSelfRotate) return;
  config.value.cuber = "linear";

  config.value.currentAngle +=
    (config.value.duration / 1000) * config.value.selfRotateSpeed;
  await delay(config.value.duration);
  selfRotate().then();
}

onMounted(() => {
  if (config.value.allowSelfRotate) {
    selfRotate();
  }
});

/**
 * @description 点击抽奖
 */
async function handleClick() {
  let aimId = Math.random() * config.value.items.length;
  aimId = Math.floor(aimId);
  console.log(aimId + 1);
  await slideTo(aimId);
  window.alert(`恭喜你抽中了${config.value.items[aimId].description}`);
}
</script>
<style lang="scss">
.turntable {
  position: relative;

  width: 400px;
  height: 400px;

  --size: 400px;
  --current-angle: 0deg;
  --item-angle-size: 60deg;
  --item-correct-angle: 30deg;
  --rotate-duration: 700ms;
  --rotate-cuber: "ease-in-out";
}

.turntable-wrapper {
  transition: all var(--rotate-duration) var(--rotate-cuber);
  transform: rotate(var(--current-angle));
  width: 100%;
  height: 100%;
}

.turntable__bg1,
.turntable__bg2 {
  width: 100%;
  aspect-ratio: 1/1;
  user-select: none;
  user-focus: none;

  background: url("https://funimg.pddpic.com/spi_main/turntable_arc_bg1.png.slim.png") center center no-repeat;
  background-size: cover;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
}

.turntable__bg2 {
  width: 118%;
  border-radius: 50%;
  background: url("https://funimg.pddpic.com/spi_main/turntable_wrapper_bg.png.slim.png") center center no-repeat;
  background-size: cover;

  z-index: 1;
}

.turntable__container {

  user-select: none;
  user-focus: none;

  & * {
    user-select: inherit;
    user-focus: inherit;
  }

  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;

  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.turntable__item {
  height: 50%;
  width: 50%;
  //border: solid 1px #e3d1d1;
  transform: rotate(
      calc(var(--item-angle-size) * var(--idx) + var(--item-correct-angle) + 0deg)
  );
  transform-origin: center bottom;
  position: absolute;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #f10f31;

  img {
    width: 50%;
  }
}

.turntable-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 35%;
  aspect-ratio: 1/1;
  font-size: 20px;
  font-weight: bold;
  color: #e9f5f1;

  .turntable-button__inner {
    height: 100%;
    width: 100%;
    background: url("https://funimg.pddpic.com/spi_main/turntable_cursor_v4.png.slim.png") center center no-repeat;
    background-size: contain;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
