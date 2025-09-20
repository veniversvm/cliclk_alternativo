import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

// --- Configuración ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..');

const CONTENT_DIR = path.join(PROJECT_ROOT, "src/content/blog");
const OUTPUT_PATH = path.join(PROJECT_ROOT, "public/search.json");
const PUBLIC_IMAGES_DIR = path.join(PROJECT_ROOT, "public/images/blog");
const IMAGE_EXTENSIONS = [".jpeg", ".jpg", ".png", ".gif", ".webp", ".svg"];

console.log("🚀 Generando índice de búsqueda...");

/**
 * Busca recursivamente la primera imagen en un directorio.
 * @param {string} postSlug - El slug del post (ej: "9GAG").
 * @returns {string | null} - El nombre del archivo de imagen o null si no se encuentra.
 */
function findFirstImage(postSlug) {
  const imageDirPath = path.join(PUBLIC_IMAGES_DIR, postSlug);

  // --- PASO DE DEPURACIÓN: Comprueba qué ruta se está buscando ---
  // console.log(`[findFirstImage] Buscando imágenes para el slug '${postSlug}' en: ${imageDirPath}`);

  if (!fs.existsSync(imageDirPath)) {
    // Si esta línea aparece, significa que la carpeta no existe o el nombre no coincide (mayúsculas/minúsculas).
    // console.log(`[findFirstImage] ❗️ Directorio NO encontrado.`);
    return null;
  }

  try {
    const files = fs.readdirSync(imageDirPath);
    for (const file of files) {
      if (IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase())) {
        // console.log(`[findFirstImage] ✅ Imagen encontrada: ${file}`);
        return file; // Devolvemos solo el nombre del archivo: "portada.jpg"
      }
    }
  } catch (err) {
    console.error(`[findFirstImage] ❌ Error leyendo el directorio ${imageDirPath}:`, err);
    return null;
  }

  // console.log(`[findFirstImage] ⚠️ No se encontraron archivos de imagen válidos en el directorio.`);
  return null;
}

/**
 * Obtiene los datos de todos los posts.
 */
function getAllPostsData() {
  const postDirs = fs.readdirSync(CONTENT_DIR).filter((file) => {
    return fs.statSync(path.join(CONTENT_DIR, file)).isDirectory();
  });

  const allPosts = postDirs.map((postDir) => {
    const postDirPath = path.join(CONTENT_DIR, postDir);
    const contentFile = fs.readdirSync(postDirPath).find(file => file.endsWith('.mdx') || file.endsWith('.md'));

    if (!contentFile) return null;

    const filePath = path.join(postDirPath, contentFile);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    // Lógica para encontrar la imagen de portada
    const coverImageFile = findFirstImage(postDir);

    // --- ¡¡LÍNEA CLAVE CORREGIDA!! ---
    // La URL pública no debe tener el slug duplicado.
    const coverImage = coverImageFile
      ? `/images/blog/${postDir}/${coverImageFile}`
      : null;
    // Esto generará: "/images/blog/9GAG/mi-imagen.jpg"

    return {
      slug: `${postDir}/${path.basename(contentFile, path.extname(contentFile))}`, // 👈 slug folder/archivo
      title: data.title,
      description: data.description,
      tags: data.tags || [],
      pubDate: data.pubDate,
      externalUrl: data.externalUrl,
      coverImage: coverImage,
      author: data.author,
    };
  }).filter(Boolean);

  return allPosts.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
}

// --- Ejecución ---
try {
  const allPostsData = getAllPostsData();
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(allPostsData, null, 2));
  console.log(`✅ Índice de búsqueda generado con ${allPostsData.length} posts.`);
  console.log(`📂 Guardado en: ${OUTPUT_PATH}`);
} catch (error) {
  console.error("❌ Error al generar el índice de búsqueda:", error);
}