import fs from 'fs';
import path from 'path';

export function getJsonProducts() {
  const filePath = path.join(process.cwd(), 'hydrelle_products.json');
  if (!fs.existsSync(filePath)) return [];
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    return data.products || data;
  } catch (error) {
    console.error('Error reading JSON DB:', error);
    return [];
  }
}
