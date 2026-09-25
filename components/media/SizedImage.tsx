import { forwardRef } from 'react';
import Image, { type ImageProps } from 'next/image';
import { lookupImageSize } from './imageDimensions';

/**
 * Drop-in replacement for next/image.
 *
 * `fill` images normally render WITHOUT width/height attributes, which audits
 * flag. When the file's real size is known, this renders the same image with
 * width/height attributes and the exact styles `fill` would have applied
 * (absolute, inset 0, 100% × 100%), so the on-screen result is unchanged.
 * `sizes` defaults to "100vw" — the same default `fill` uses — so the
 * responsive srcset stays the same too.
 *
 * Everything else (non-fill images, external URLs, unknown files) is passed
 * straight through to next/image.
 */
const SizedImage = forwardRef<HTMLImageElement, ImageProps>(function SizedImage(props, ref) {
  const { fill, src, sizes, style, width, height, ...rest } = props;

  if (fill && width == null && height == null) {
    const staticSrc = typeof src === 'object' && src !== null && 'width' in src ? src : null;
    const dims = staticSrc ? [staticSrc.width, staticSrc.height] : lookupImageSize(src);
    if (dims && dims[0] && dims[1]) {
      return (
        <Image
          ref={ref}
          {...rest}
          src={src}
          width={dims[0]}
          height={dims[1]}
          sizes={sizes ?? '100vw'}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            ...style,
          }}
        />
      );
    }
  }

  return <Image ref={ref} {...props} />;
});

export default SizedImage;
