export interface Position {
  x: number;
  y: number;
}

export function calculateEvasivePosition(
  currentPos: Position,
  pointerPos: Position,
  containerWidth: number,
  containerHeight: number,
  minDistance: number = 150
): Position {
  const dx = pointerPos.x - currentPos.x;
  const dy = pointerPos.y - currentPos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance < minDistance) {
    // Calculate escape direction (opposite to pointer)
    const angle = Math.atan2(dy, dx) + Math.PI;
    const escapeDistance = minDistance * 1.5;
    
    let newX = currentPos.x + Math.cos(angle) * escapeDistance;
    let newY = currentPos.y + Math.sin(angle) * escapeDistance;
    
    // Add some randomness for natural feel
    newX += (Math.random() - 0.5) * 100;
    newY += (Math.random() - 0.5) * 100;
    
    // Keep within bounds with padding
    const padding = 60;
    newX = Math.max(padding, Math.min(containerWidth - padding, newX));
    newY = Math.max(padding, Math.min(containerHeight - padding, newY));
    
    return { x: newX, y: newY };
  }
  
  return currentPos;
}

export function getRandomPosition(width: number, height: number, padding: number = 60): Position {
  return {
    x: padding + Math.random() * (width - 2 * padding),
    y: padding + Math.random() * (height - 2 * padding),
  };
}
