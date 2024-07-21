import {CardEffect, type CardOptions} from "~/utils";
import type {Ref} from "vue";

/**
 * @description 卡片hover
 */
export const useCardEffect = (
  target: HTMLElement | Ref<HTMLElement | undefined> | undefined,
  options?: Omit<CardOptions, "el">,
) => {

  const cardEffect = new CardEffect(options);


  useEventListener(target, "mouseenter", (e) => cardEffect.updateT15(e));
  useEventListener(target, "mousemove", (e) => cardEffect.updateT15(e));
  useEventListener(target, "mouseleave", () => cardEffect.reset());

  onMounted(() => {
    const el = unrefElement(target);

    cardEffect.actOn(el);
  });
};
