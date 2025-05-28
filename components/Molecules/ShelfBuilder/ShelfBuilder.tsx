import React, { useEffect, useRef, useState } from "react";
import { ShelfBuilderProps } from "./types";

const images = {
  estante: {
    alta: "https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/a318bfe0-e41d-47b5-90d5-dac4d40acf00/fit=cover",
    media:
      "https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/da8b540e-6411-468f-a73d-4a4534152100/fit=cover",
    baja: "https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/5e5437a8-80b1-4e10-8922-cf9f97d30c00/fit=cover",
  },
  cabinet: {
    alta: "https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/58960c82-d97f-40aa-4cb1-dfbf42d0a300/fit=cover",
    media:
      "https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/f745f0a2-5b8f-42b0-4ef3-9337b9ced700/fit=cover",
    baja: "https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/f4df83ff-4d2a-4797-025b-536692d17600/fit=cover",
  },
  CabinetAbierta: {
    alta: "https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/33c999df-3d9f-47dc-5268-754262682d00/fit=cover",
    media:
      "https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/f0ed1be8-3200-48e0-0436-714d2055ad00/fit=cover",
    baja: "https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/515c3512-8a92-4729-76ad-1c6f6af3bf00/fit=cover",
  },
};

const ShelfBuilder: React.FC<ShelfBuilderProps> = ({
  shelfConfigurations,
  maxRows = 5,
  maxColumns = 5,
  isCart = false,
  editingModuleId,
  isCard,
  propsNames,
  isPreConfigView,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 800 });
  const imageCache = useRef<Record<string, HTMLImageElement>>({});
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const preloadImages = async () => {
      const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          if (imageCache.current[src]) {
            resolve(imageCache.current[src]);
            return;
          }
          const img = new Image();
          img.onload = () => {
            imageCache.current[src] = img;
            resolve(img);
          };
          img.onerror = (error) => {
            console.error(`Error loading image: ${src}`, error);
            reject(error);
          };
          img.src = src;
        });
      };

      try {
        const imagePromises: Promise<HTMLImageElement>[] = [];
        Object.values(images).forEach((type) => {
          Object.values(type).forEach((src) => {
            imagePromises.push(loadImage(src));
          });
        });

        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Error preloading images:", error);
      }
    };

    preloadImages();
  }, [images]);

  useEffect(() => {
    const handleResize = () => {
      const container = canvasRef.current?.parentElement;
      if (container) {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        // Asegurar dimensiones mínimas
        const minWidth = 100;
        const minHeight = 100;

        // Calcular el tamaño manteniendo la proporción
        const aspectRatio = 1;
        let width = Math.max(containerWidth, minWidth);
        let height = Math.max(containerHeight, minHeight);

        if (width / height > aspectRatio) {
          width = height * aspectRatio;
        } else {
          height = width / aspectRatio;
        }

        setCanvasSize({
          width: width,
          height: height,
        });
      }
    };

    // Llamar a handleResize inmediatamente y luego en el siguiente frame
    handleResize();
    requestAnimationFrame(handleResize);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (
      !canvasRef.current ||
      !imagesLoaded ||
      Object.keys(imageCache.current).length === 0
    )
      return;

    const drawImages = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Verificar que el canvas tenga dimensiones válidas
      if (canvas.width === 0 || canvas.height === 0) {
        console.warn("Canvas has invalid dimensions, skipping draw");
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Limpiar el canvas principal primero
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = canvasSize.width;
      tempCanvas.height = canvasSize.height;
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;

      // Verificar que el canvas temporal tenga dimensiones válidas
      if (tempCanvas.width === 0 || tempCanvas.height === 0) {
        console.warn("Temporary canvas has invalid dimensions, skipping draw");
        return;
      }

      // Limpiar el canvas temporal
      tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);

      // Dibujar fondo
      if (!isCard) {
        tempCtx.fillStyle = "#fffbf3";
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
      }

      const scaleFactor = isCart
        ? 0.9
        : isCard
        ? shelfConfigurations.length === 1
          ? 1.4
          : shelfConfigurations.length === 2
          ? 1.3
          : shelfConfigurations.length === 3
          ? 1.2
          : 1.1
        : 1;
      const scaledWidth = canvasSize.width * scaleFactor;
      const scaledHeight = canvasSize.height * scaleFactor;

      const fixedShelfWidth = (scaledWidth * 1) / maxColumns;
      const fixedShelfHeight = fixedShelfWidth * 1.7;

      // Calcular el número máximo de columnas y filas usadas
      const usedColumns = Math.max(
        ...shelfConfigurations.map((config) => config.position.column)
      );
      const usedRows = Math.max(
        ...shelfConfigurations.map((config) => config.position.row)
      );

      // Calcular el ancho y alto total del contenido
      const totalContentWidth = fixedShelfWidth * usedColumns;
      const totalContentHeight = fixedShelfHeight * usedRows;

      // Asegurar que los offsets sean consistentes
      const horizontalOffset = Math.max(
        0,
        (canvasSize.width - totalContentWidth) / 2
      );
      const verticalOffset = Math.max(
        0,
        (canvasSize.height - totalContentHeight) / 2
      );

      const overlapOffset = fixedShelfWidth * 0.04;

      const getImageUrl = (shelf: any) => {
        switch (shelf.children?.attributes[propsNames.configuracion]) {
          case "estante":
            return images.estante[
              shelf.children.attributes[propsNames.alto] as
                | "alta"
                | "media"
                | "baja"
            ];
          case "cabinet":
            return images.cabinet[
              shelf.children.attributes[propsNames.alto] as
                | "alta"
                | "media"
                | "baja"
            ];
          case "nicho":
            return images.CabinetAbierta[
              shelf.children.attributes[propsNames.alto] as
                | "alta"
                | "media"
                | "baja"
            ];
          default:
            return images.estante.media;
        }
      };

      // Calcular las alturas máximas por columna
      const columnMaxHeights: Record<number, number> = {};
      const columnMaxWidths: Record<number, number> = {};

      shelfConfigurations.forEach((shelf) => {
        const column = shelf.position.column;
        const cachedImage = imageCache.current[getImageUrl(shelf)];

        if (cachedImage && cachedImage.width > 0 && cachedImage.height > 0) {
          const imageAspectRatio = cachedImage.width / cachedImage.height;
          const targetAspectRatio = fixedShelfWidth / fixedShelfHeight;

          let drawWidth = fixedShelfWidth;
          let drawHeight = fixedShelfHeight;

          if (imageAspectRatio > targetAspectRatio) {
            drawHeight = fixedShelfWidth / imageAspectRatio;
          } else {
            drawWidth = fixedShelfHeight * imageAspectRatio;
          }

          if (!columnMaxWidths[column] || drawWidth > columnMaxWidths[column]) {
            columnMaxWidths[column] = drawWidth;
          }

          if (
            !columnMaxHeights[column] ||
            drawHeight > columnMaxHeights[column]
          ) {
            columnMaxHeights[column] = drawHeight;
          }
        }
      });

      // Encontrar la altura máxima entre todas las columnas
      const maxColumnHeight = Math.max(...Object.values(columnMaxHeights));
      const maxColumnWidth = Math.max(...Object.values(columnMaxWidths));

      // Ajustar el offset vertical para centrar el contenido
      const adjustedVerticalOffset = (canvasSize.height - maxColumnHeight) / 2;
      const adjustedHorizontalOffset =
        (canvasSize.width - maxColumnWidth * usedColumns) / 2;

      // Definir la posición fija del piso
      const floorHeight = 20;
      const floorY = Math.min(
        adjustedVerticalOffset + maxColumnHeight,
        canvasSize.height - floorHeight
      );

      // Dibujar piso primero
      if (!isCard) {
        const floorGradient = tempCtx.createLinearGradient(
          0,
          floorY,
          0,
          floorY + floorHeight
        );

        floorGradient.addColorStop(0, "#CCCCCC");
        floorGradient.addColorStop(0.3, "#DDDDDD");
        floorGradient.addColorStop(0.6, "#EEEEEE");
        floorGradient.addColorStop(0.8, "#F2F2F2");
        floorGradient.addColorStop(1, "#fffbf3");

        tempCtx.fillStyle = floorGradient;
        tempCtx.fillRect(0, floorY, tempCanvas.width, floorHeight);

        const shadowGradient = tempCtx.createLinearGradient(
          0,
          floorY + floorHeight,
          0,
          floorY + floorHeight + 5
        );

        shadowGradient.addColorStop(0, "rgba(0, 0, 0, 0.05)");
        shadowGradient.addColorStop(0.5, "rgba(0, 0, 0, 0.02)");
        shadowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        tempCtx.fillStyle = shadowGradient;
        tempCtx.fillRect(0, floorY + floorHeight, tempCanvas.width, 5);
      }

      // Ordenar las configuraciones por columna y fila
      const sortedConfigs = [...shelfConfigurations].sort((a, b) => {
        if (a.position.column === b.position.column) {
          return a.position.row - b.position.row;
        }
        return a.position.column - b.position.column;
      });

      // Mantener un registro de la altura actual por columna
      const columnHeights: Record<number, number> = {};

      // Inicializar todas las columnas con el offset vertical ajustado
      for (let i = 1; i <= usedColumns; i++) {
        columnHeights[i] = adjustedVerticalOffset;
      }

      // Recalcular las posiciones para mantener los módulos juntos
      const recalculatedPositions = sortedConfigs.map((shelf, index) => ({
        ...shelf,
        position: {
          ...shelf.position,
          column: index + 1,
          row: 1,
        },
      }));

      recalculatedPositions.forEach((shelf) => {
        const column = shelf.position.column;
        const row = shelf.position.row;
        let drawHeight = fixedShelfHeight;

        const x =
          adjustedHorizontalOffset +
          (column - 1) * maxColumnWidth -
          (column > 1 ? overlapOffset * (column - 1) : 0);

        const y = columnHeights[column];

        const cachedImage = imageCache.current[getImageUrl(shelf)];
        if (cachedImage && cachedImage.width > 0 && cachedImage.height > 0) {
          tempCtx.save();

          // Calcular la proporción de la imagen
          const imageAspectRatio = cachedImage.width / cachedImage.height;
          const targetAspectRatio = fixedShelfWidth / fixedShelfHeight;

          let drawWidth = fixedShelfWidth;
          drawHeight = fixedShelfHeight;
          let drawX = x;
          let drawY = y;

          if (imageAspectRatio > targetAspectRatio) {
            // La imagen es más ancha que el contenedor
            drawHeight = fixedShelfWidth / imageAspectRatio;
            drawY = y + (fixedShelfHeight - drawHeight) / 2;
          } else {
            // La imagen es más alta que el contenedor
            drawWidth = fixedShelfHeight * imageAspectRatio;
            drawX = x + (fixedShelfWidth - drawWidth) / 2;
          }

          // Si necesitamos escala de grises, aplicar el efecto
          if (
            isCard &&
            shelf.moduleId !== editingModuleId &&
            !isPreConfigView
          ) {
            // Crear un canvas temporal solo para esta imagen
            const tempImageCanvas = document.createElement("canvas");
            tempImageCanvas.width = drawWidth;
            tempImageCanvas.height = drawHeight;
            const tempImageCtx = tempImageCanvas.getContext("2d");

            if (tempImageCtx) {
              // Dibujar solo esta imagen en el canvas temporal
              tempImageCtx.filter = "grayscale(100%)";
              tempImageCtx.drawImage(cachedImage, 0, 0, drawWidth, drawHeight);

              // Dibujar el canvas temporal en la posición correcta
              tempCtx.drawImage(
                tempImageCanvas,
                drawX,
                drawY,
                drawWidth,
                drawHeight
              );
            }
          } else {
            // Si no necesita escala de grises, dibujar normalmente
            tempCtx.drawImage(cachedImage, drawX, drawY, drawWidth, drawHeight);
          }

          //Tooltip para editar
          if (
            !isCart &&
            !isCard &&
            shelf.moduleId === editingModuleId &&
            shelfConfigurations.length > 1 &&
            !isPreConfigView
          ) {
            const bubbleWidth = 120;
            const bubbleHeight = 30;
            const bubbleX = x + (fixedShelfWidth - bubbleWidth) / 2;
            const bubbleY = y - bubbleHeight - 5;

            // Obtener el índice del módulo actual
            const moduleIndex = shelfConfigurations.findIndex(
              (m) => m.moduleId === shelf.moduleId
            );
            const moduleNumber = moduleIndex + 1;
            const moduleText =
              moduleNumber === 1
                ? "Primer módulo"
                : moduleNumber === 2
                ? "Segundo módulo"
                : moduleNumber === 3
                ? "Tercer módulo"
                : moduleNumber === 4
                ? "Cuarto módulo"
                : moduleNumber === 5
                ? "Quinto módulo"
                : `${moduleNumber}° módulo`;

            // Dibujar el globo con border radius
            tempCtx.beginPath();
            tempCtx.moveTo(bubbleX + 8, bubbleY);
            tempCtx.lineTo(bubbleX + bubbleWidth - 8, bubbleY);
            tempCtx.quadraticCurveTo(
              bubbleX + bubbleWidth,
              bubbleY,
              bubbleX + bubbleWidth,
              bubbleY + 8
            );
            tempCtx.lineTo(bubbleX + bubbleWidth, bubbleY + bubbleHeight - 8);
            tempCtx.quadraticCurveTo(
              bubbleX + bubbleWidth,
              bubbleY + bubbleHeight,
              bubbleX + bubbleWidth - 8,
              bubbleY + bubbleHeight
            );
            tempCtx.lineTo(bubbleX + 8, bubbleY + bubbleHeight);
            tempCtx.quadraticCurveTo(
              bubbleX,
              bubbleY + bubbleHeight,
              bubbleX,
              bubbleY + bubbleHeight - 8
            );
            tempCtx.lineTo(bubbleX, bubbleY + 8);
            tempCtx.quadraticCurveTo(bubbleX, bubbleY, bubbleX + 8, bubbleY);
            tempCtx.closePath();
            tempCtx.fillStyle = "#000000";
            tempCtx.fill();

            // Dibujar el texto
            tempCtx.fillStyle = "white";
            tempCtx.font = "bold 12px Arial";
            tempCtx.textAlign = "center";
            tempCtx.textBaseline = "middle";
            tempCtx.fillText(
              moduleText,
              bubbleX + bubbleWidth / 2,
              bubbleY + bubbleHeight / 2
            );

            // Dibujar la flecha apuntando hacia abajo
            tempCtx.beginPath();
            tempCtx.moveTo(
              bubbleX + bubbleWidth / 2,
              bubbleY + bubbleHeight + 10
            );
            tempCtx.lineTo(
              bubbleX + bubbleWidth / 2 - 10,
              bubbleY + bubbleHeight
            );
            tempCtx.lineTo(
              bubbleX + bubbleWidth / 2 + 10,
              bubbleY + bubbleHeight
            );
            tempCtx.closePath();
            tempCtx.fillStyle = "#000000";
            tempCtx.fill();
          }

          tempCtx.restore();
        }

        columnHeights[column] = y + drawHeight;
      });

      ctx.drawImage(tempCanvas, 0, 0);
    };

    requestAnimationFrame(() => {
      drawImages();
    });
  }, [
    shelfConfigurations,
    images,
    maxRows,
    maxColumns,
    canvasSize,
    imagesLoaded,
    isCart,
    editingModuleId,
    isCard,
  ]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
        ...(isCard && {
          aspectRatio: "unset",
          width: "100%",
        }),
      }}
    >
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      />
    </div>
  );
};

export default ShelfBuilder;
