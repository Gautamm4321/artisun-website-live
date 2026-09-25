import { forwardRef, type ImgHTMLAttributes } from 'react';
import { lookupImageSize } from './imageDimensions';

/**
 * Drop-in replacement for a plain <img>. Adds the file's real width/height
 * attributes when they are missing (or fills in the one that is missing,
 * keeping the aspect ratio).
 *
 * Rendering is unchanged: the attributes equal the image's natural size, and
 * Tailwind's base styles (img { height: auto; max-width: 100% }) plus any
 * existing classes still decide the displayed size. The attributes just let
 * the browser reserve the right space before the file loads.
 */
const SizedImg = forwardRef<HTMLImageElement, ImgHTMLAttributes<HTMLImageElement>>(function SizedImg(
  props,
  ref,
) {
  const { width, height } = props;
  if (width != null && height != null) {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img ref={ref} {...props} />;
  }
  const dims = lookupImageSize(props.src);
  let w = width;
  let h = height;
  if (dims) {
    if (w == null && h == null) {
      w = dims[0];
      h = dims[1];
    } else if (w == null && h != null && !Number.isNaN(Number(h))) {
      w = Math.round((Number(h) * dims[0]) / dims[1]);
    } else if (h == null && w != null && !Number.isNaN(Number(w))) {
      h = Math.round((Number(w) * dims[1]) / dims[0]);
    }
  }
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  return <img ref={ref} {...props} width={w} height={h} />;
});

export default SizedImg;
