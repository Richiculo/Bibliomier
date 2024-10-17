/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF', // Un azul más oscuro para los botones
        secondary: '#1E3A8A', // Una variación más suave para hover
        lightText: '#374151', // Texto en gris oscuro para buena visibilidad en fondo blanco
        accent: '#F59E0B', // Color de acento para destacar botones o detalles
      },
    },
  },
  plugins: [],
}