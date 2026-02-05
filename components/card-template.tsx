"use client";

import { forwardRef, useImperativeHandle, useEffect, useState } from "react";

export type CardVariant = "dark" | "light";

interface CardTemplateProps {
  userName: string;
  variant: CardVariant;
  onTextureReady: (dataUrl: string) => void;
  city?: string;
  date?: string;
}

export interface CardTemplateRef {
  captureTexture: () => Promise<void>;
  exportCard: () => void;
}

const CANVAS_SIZE = 1376;

const CardTemplate = forwardRef<CardTemplateRef, CardTemplateProps>(
  ({ userName, variant, onTextureReady, city, date }, ref) => {
    const [baseImage, setBaseImage] = useState<HTMLImageElement | null>(null);

    const imageSrc = variant === "dark" ? "/1.png" : "/2.png";
    const textColor = variant === "dark" ? "#ffffff" : "#000000";

    // Preload the base card image
    useEffect(() => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => setBaseImage(img);
      img.src = imageSrc;
    }, [imageSrc]);

    const captureTexture = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = CANVAS_SIZE;
      canvas.height = CANVAS_SIZE;
      const ctx = canvas.getContext("2d");
      
      if (!ctx) return;

      // Draw base card image (fills entire canvas)
      if (baseImage) {
        ctx.drawImage(baseImage, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
      } else {
        // Fallback black background if image not loaded
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      }

      // Draw user name at the bottom left area (below the geometric pattern)
      const displayName = userName || "YOUR NAME";
      ctx.fillStyle = textColor;
      ctx.font = 'normal 48px "Geist Mono", monospace';
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      
      const textX = (CANVAS_SIZE / 2) - 55;
      const textY = CANVAS_SIZE - 400;
      ctx.fillText(displayName.toUpperCase(), textX, textY);

      const dataUrl = canvas.toDataURL("image/png");
      onTextureReady(dataUrl);
    };

    const exportCard = () => {
      const CROP_BOTTOM = 334;
      const EXPORT_HEIGHT = CANVAS_SIZE - CROP_BOTTOM;

      // First, create a full-size canvas to draw the complete card
      const fullCanvas = document.createElement("canvas");
      fullCanvas.width = CANVAS_SIZE;
      fullCanvas.height = CANVAS_SIZE;
      const fullCtx = fullCanvas.getContext("2d");
      
      if (!fullCtx) return;

      // Draw base card image (fills entire canvas)
      if (baseImage) {
        fullCtx.drawImage(baseImage, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
      } else {
        // Fallback black background if image not loaded
        fullCtx.fillStyle = "#000000";
        fullCtx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      }

      // Draw user name at the bottom left area (below the geometric pattern)
      const displayName = userName || "YOUR NAME";
      fullCtx.fillStyle = textColor;
      fullCtx.font = 'normal 48px "Geist Mono", monospace';
      fullCtx.textAlign = "right";
      fullCtx.textBaseline = "middle";
      
      const textX = (CANVAS_SIZE / 2) - 55;
      const textY = CANVAS_SIZE - 400;
      fullCtx.fillText(displayName.toUpperCase(), textX, textY);

      // Render city label
      if (city) {
        const cityRender = fullCanvas.getContext("2d");

        if (!cityRender) return;

        cityRender.fillStyle = textColor;
        cityRender.font = 'normal 48px "Geist Mono", monospace';
        cityRender.textAlign = "right";
        cityRender.textBaseline = "middle";

        const cityTextX = (CANVAS_SIZE / 2) - 55;
        const cityTextY = CANVAS_SIZE - 1226;
        cityRender.fillText(city.toUpperCase(), cityTextX, cityTextY);
      }

      // Render date label
      if (date) {
        const dateRender = fullCanvas.getContext("2d");

        if (!dateRender) return;

        dateRender.fillStyle = '#878787';
        dateRender.font = 'normal 48px "Geist Mono", monospace';
        dateRender.textAlign = "right";
        dateRender.textBaseline = "middle";

        const dateTextX = (CANVAS_SIZE / 2) - 55;
        const dateTextY = CANVAS_SIZE - 1170;
        dateRender.fillText(date.toUpperCase(), dateTextX, dateTextY);
      }

      // Create cropped export canvas (excludes bottom 334px)
      const exportCanvas = document.createElement("canvas");
      exportCanvas.width = CANVAS_SIZE;
      exportCanvas.height = EXPORT_HEIGHT;
      const exportCtx = exportCanvas.getContext("2d");

      if (!exportCtx) return;

      // Copy the top portion of the full canvas to the export canvas
      exportCtx.drawImage(
        fullCanvas,
        0, 0, CANVAS_SIZE, EXPORT_HEIGHT, // Source: top portion
        0, 0, CANVAS_SIZE, EXPORT_HEIGHT  // Destination: same size
      );

      // Export at full resolution
      const dataUrl = exportCanvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.download = `v0-sd-${userName || "card"}.png`;
      link.href = dataUrl;
      link.click();
    };

    useImperativeHandle(ref, () => ({
      captureTexture,
      exportCard,
    }));

    // This component doesn't render anything visible
    return null;
  }
);

CardTemplate.displayName = "CardTemplate";

export default CardTemplate;