import React from 'react';
import { NftGalleryProps } from '../NftGallery';
import { OpenseaAsset } from '../types/OpenseaAsset';
import { joinClassNames } from '../utils';

export interface GalleryItemProps {
  asset: OpenseaAsset;
  metadataIsVisible: NftGalleryProps['metadataIsVisible'];
}

export const GalleryItem: React.FC<GalleryItemProps> = ({
  asset,
  metadataIsVisible,
}) => {
  const assetTitle = asset.name || `TokenID: ${asset.token_id}`;

  const renderAssetMedia = () => {
    // No media present -> render the name/tokenId as a placeholder.
    if (!asset.image_preview_url) {
      return (
        <div
          className={joinClassNames(
            'flex flex-col justify-center items-center w-full h-full cursor-pointer',
            'break-words cursor-pointer truncate text-lg font-semibold dark:text-gray-200'
          )}
        >
          {assetTitle}
        </div>
      );
    }

    const assetMediaExt = asset.image_preview_url.split('.').pop();

    if (assetMediaExt === 'mp4') {
      return (
        <video
          className={joinClassNames(
            'w-full h-full object-cover cursor-pointer',
            metadataIsVisible ? 'rounded-t-2xl' : 'rounded-2xl'
          )}
          src={asset.image_preview_url}
          preload="auto"
          controlsList="nodownload"
          autoPlay
          loop
          playsInline
        ></video>
      );
    }

    return (
      <img
        className={joinClassNames(
          'w-full h-full object-cover cursor-pointer',
          metadataIsVisible ? 'rounded-t-2xl' : 'rounded-2xl'
        )}
        src={asset.image_preview_url}
        alt={asset.name}
        loading="lazy"
      />
    );
  };

  return (
    <article className="rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition duration-300">
      <div style={{ height: '20rem' }}>{renderAssetMedia()}</div>
      {metadataIsVisible && (
        <div data-test-id="metadata-section" className="p-4">
          <div className="break-words cursor-pointer truncate text-lg font-semibold dark:text-gray-200">
            {assetTitle}
          </div>
          <hr className="mx-2 my-4 border-gray-100 dark:border-gray-900" />
          <div className="flex items-center cursor-pointer">
            {asset.collection.image_url && (
              <img
                src={asset.collection.image_url}
                alt={asset.collection.name}
                className="w-8 h-8 mr-2 rounded-full"
              />
            )}
            <div className="text-sm font-semibold truncate dark:text-gray-200">
              {asset.collection.name}
            </div>
          </div>
        </div>
      )}
    </article>
  );
};
