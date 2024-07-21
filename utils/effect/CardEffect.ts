import {isEmpty, throttle} from "~/utils";
import type {AnyFunction} from "~/typings/type";

export interface CardOptions {
  /* 受作用的元素 */
  el: HTMLElement;
  /* 旋转幅度 */
  rotate: number;
  /* 缩放幅度 */
  scale: number;
}

/**
 * @description 卡片视差效果
 * @link https://juejin.cn/post/7356240651040636943?searchId=2024041318155981E2BE04846295997A0D
 */
export class CardEffect {
  protected rotate: number;
  protected scale: number;
  protected el?: HTMLElement;
  public readonly updateT15: AnyFunction;


  /**
   * @description 构造函数
   */
  constructor(options?: Partial<CardOptions>) {
    this.rotate = options?.rotate ?? 1.0;
    this.scale = options?.scale ?? 1.0;
    this.updateT15 = throttle(this.update, 15, this);

    if (!isEmpty(options) && !isEmpty(options.el)) {
      this.actOn(options.el);
    }
  }

  /**
   * @description 将effect作用于el
   * @param el
   */
  public actOn(el?: HTMLElement) {
    if (!isEmpty(this.el) || isEmpty(el)) return;


    this.el = el;
    Object.assign(this.el.style, {
      "--rotateX": " 0deg",
      "--rotateY": "0deg",
      "--scale3d": "1",
      transition: "all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)",
      "transform-style": "preserve-3d",
      transform:
        "perspective(3000px) rotateY(var(--rotateX)) rotateX(var(--rotateY))\n" +
        "  scale3d(var(--scale3d), var(--scale3d), var(--scale3d))",
    });
  }

  /**
   * @description 更新样式
   * @param rotateX
   * @param rotateY
   * @param scale3d
   * @protected
   */
  protected updateSdl(rotateX: number, rotateY: number, scale3d: number) {
    if (isEmpty(this.el)) return;

    this.el.style.setProperty("--rotateX", rotateX + "deg");
    this.el.style.setProperty("--rotateY", rotateY + "deg");
    this.el.style.setProperty("--scale3d", scale3d.toString());
  }

  /**
   * @description 设置卡片效果
   * @param event
   */
  public update(event: MouseEvent) {
    const el = this.el;
    if (isEmpty(el)) return;

    const x = event.clientX;
    const y = event.clientY;

    const middleX = el.clientWidth / 2;
    const middleY = el.clientHeight / 2;

    const offsetX = ((x - middleX) / middleX) * this.rotate;
    const offsetY = ((y - middleY) / middleY) * this.rotate;

    this.updateSdl(offsetX, -1 * offsetY, this.scale);
  };


  /**
   * @description 重置卡片效果
   */
  public reset() {
    this.updateSdl(0, 0, 1);
  }

  public start() {
    this.el?.addEventListener("mouseenter", this.update);
    this.el?.addEventListener("mousemove", this.updateT15);
    this.el?.addEventListener("mouseleave", this.reset);

  }

  public stop() {
    this.el?.removeEventListener("mouseenter", this.update);
    this.el?.removeEventListener("mousemove", this.updateT15);
    this.el?.removeEventListener("mouseleave", this.reset);
  }


}