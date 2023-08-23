const items = [];

while (true) {
  items.push(items);
}

/**
 * Sacada para ver o programa quebrando...
 * Máximo 64MB
 * 
 * node --max-old-space-size=64 index.js -> FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
 */