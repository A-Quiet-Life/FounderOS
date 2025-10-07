import type { Component } from "./types";

// Find the nearest edge on the destination component
export function findNearestEdge(
  fromComp: Component,
  toComp: Component,
  fromSide: "top" | "right" | "bottom" | "left"
): "top" | "right" | "bottom" | "left" {
  const fromPoint = getConnectionPoint(fromComp, fromSide);

  // Calculate distances to all edges of the destination component
  const distances = {
    top: Math.abs(fromPoint.y - toComp.y),
    bottom: Math.abs(fromPoint.y - (toComp.y + toComp.height)),
    left: Math.abs(fromPoint.x - toComp.x),
    right: Math.abs(fromPoint.x - (toComp.x + toComp.width)),
  };

  // Find the minimum distance
  let nearestEdge: "top" | "right" | "bottom" | "left" = "top";
  let minDistance = Infinity;

  for (const [edge, distance] of Object.entries(distances)) {
    if (distance < minDistance) {
      minDistance = distance;
      nearestEdge = edge as "top" | "right" | "bottom" | "left";
    }
  }

  return nearestEdge;
}

export function getConnectionPoint(
  component: Component,
  side: "top" | "right" | "bottom" | "left"
): { x: number; y: number } {
  switch (side) {
    case "top":
      return {
        x: component.x + component.width / 2,
        y: component.y,
      };
    case "bottom":
      return {
        x: component.x + component.width / 2,
        y: component.y + component.height,
      };
    case "left":
      return {
        x: component.x,
        y: component.y + component.height / 2,
      };
    case "right":
      return {
        x: component.x + component.width,
        y: component.y + component.height / 2,
      };
    default:
      return {
        x: component.x + component.width / 2,
        y: component.y + component.height / 2,
      };
  }
}
