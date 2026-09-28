/*
 * CONFIGURACIÓN DE LA PÁGINA
 * Editá este archivo para cambiar el número de WhatsApp, los datos
 * de contacto y la lista de productos. No hace falta tocar nada más.
 */
const CONFIG = {
  // Número con código de país, sin "+", espacios ni guiones.
  // Ejemplo Argentina: 54 9 + característica + número -> "5491123456789"
  whatsapp: "5491100000000",

  zona: "Consultá tu zona",
  horario: "Lunes a sábado de 9 a 19 h",

  // Categorías (el orden es el que se muestra en los filtros)
  categorias: ["Empanadas", "Pizzas", "Rebozados", "Papas y verduras", "Pastas", "Postres"],

  // Productos: nombre, categoría, precio (0 = "Consultar"), unidad y emoji.
  productos: [
    { nombre: "Empanadas de carne x12", categoria: "Empanadas", precio: 0, unidad: "docena", emoji: "🥟" },
    { nombre: "Empanadas de jamón y queso x12", categoria: "Empanadas", precio: 0, unidad: "docena", emoji: "🥟" },
    { nombre: "Empanadas de pollo x12", categoria: "Empanadas", precio: 0, unidad: "docena", emoji: "🥟" },
    { nombre: "Pizza muzzarella", categoria: "Pizzas", precio: 0, unidad: "unidad", emoji: "🍕" },
    { nombre: "Prepizzas x2", categoria: "Pizzas", precio: 0, unidad: "pack", emoji: "🍕" },
    { nombre: "Milanesas de carne", categoria: "Rebozados", precio: 0, unidad: "kg", emoji: "🥩" },
    { nombre: "Milanesas de pollo", categoria: "Rebozados", precio: 0, unidad: "kg", emoji: "🍗" },
    { nombre: "Patitas de pollo", categoria: "Rebozados", precio: 0, unidad: "kg", emoji: "🍗" },
    { nombre: "Medallones de merluza", categoria: "Rebozados", precio: 0, unidad: "kg", emoji: "🐟" },
    { nombre: "Hamburguesas x4", categoria: "Rebozados", precio: 0, unidad: "pack", emoji: "🍔" },
    { nombre: "Papas bastón", categoria: "Papas y verduras", precio: 0, unidad: "kg", emoji: "🍟" },
    { nombre: "Papas noisette", categoria: "Papas y verduras", precio: 0, unidad: "kg", emoji: "🥔" },
    { nombre: "Vegetales mixtos", categoria: "Papas y verduras", precio: 0, unidad: "kg", emoji: "🥦" },
    { nombre: "Ravioles", categoria: "Pastas", precio: 0, unidad: "caja", emoji: "🍝" },
    { nombre: "Ñoquis", categoria: "Pastas", precio: 0, unidad: "kg", emoji: "🍝" },
    { nombre: "Helado 1 kg", categoria: "Postres", precio: 0, unidad: "unidad", emoji: "🍨" },
  ],
};
