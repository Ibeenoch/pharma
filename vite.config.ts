import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      svgrOptions: {
        icon: true, // Ensures SVGs behave like icons
        svgo: true, // This is now inside svgrOptions
        svgoConfig: {
          plugins: [
            { removeAttrs: { attrs: ["fill", "stroke"] } }, // Removes inline colors
            {
              replaceAttrValues: {
                "#000": "currentColor",
                "#fff": "currentColor",
              },
            }, // Allows dynamic color changes
          ],
        },
      },
    }),
  ],
});
