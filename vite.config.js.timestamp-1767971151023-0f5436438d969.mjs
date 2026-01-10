// vite.config.js
import { defineConfig } from "file:///Users/shaul/vibe/node_modules/.bun/vite@4.5.14+ac86858b89714c69/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/shaul/vibe/node_modules/.bun/vite-plugin-dts@4.5.4+f6e55156b681a77a/node_modules/vite-plugin-dts/dist/index.mjs";
var vite_config_default = defineConfig({
  server: {
    port: 8e3,
    allowedHosts: [".coder"]
  },
  plugins: [
    dts({
      include: ["lib/**/*.ts"],
      exclude: ["lib/**/*.test.ts"],
      rollupTypes: true,
      // Bundle all .d.ts into single file
      copyDtsFiles: false
      // Don't copy individual .d.ts files
    })
  ],
  build: {
    lib: {
      entry: "lib/index.ts",
      name: "GhosttyWeb",
      fileName: (format) => {
        return format === "es" ? "ghostty-web.js" : "ghostty-web.umd.cjs";
      },
      formats: ["es", "umd"]
    },
    rollupOptions: {
      external: [],
      // No external dependencies
      output: {
        assetFileNames: "assets/[name][extname]",
        globals: {}
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvc2hhdWwvdmliZS9wYWNrYWdlcy9naG9zdHR5LXdlYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3NoYXVsL3ZpYmUvcGFja2FnZXMvZ2hvc3R0eS13ZWIvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3NoYXVsL3ZpYmUvcGFja2FnZXMvZ2hvc3R0eS13ZWIvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogODAwMCxcbiAgICBhbGxvd2VkSG9zdHM6IFsnLmNvZGVyJ10sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICBkdHMoe1xuICAgICAgaW5jbHVkZTogWydsaWIvKiovKi50cyddLFxuICAgICAgZXhjbHVkZTogWydsaWIvKiovKi50ZXN0LnRzJ10sXG4gICAgICByb2xsdXBUeXBlczogdHJ1ZSwgLy8gQnVuZGxlIGFsbCAuZC50cyBpbnRvIHNpbmdsZSBmaWxlXG4gICAgICBjb3B5RHRzRmlsZXM6IGZhbHNlLCAvLyBEb24ndCBjb3B5IGluZGl2aWR1YWwgLmQudHMgZmlsZXNcbiAgICB9KSxcbiAgXSxcbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiAnbGliL2luZGV4LnRzJyxcbiAgICAgIG5hbWU6ICdHaG9zdHR5V2ViJyxcbiAgICAgIGZpbGVOYW1lOiAoZm9ybWF0KSA9PiB7XG4gICAgICAgIHJldHVybiBmb3JtYXQgPT09ICdlcycgPyAnZ2hvc3R0eS13ZWIuanMnIDogJ2dob3N0dHktd2ViLnVtZC5janMnO1xuICAgICAgfSxcbiAgICAgIGZvcm1hdHM6IFsnZXMnLCAndW1kJ10sXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogW10sIC8vIE5vIGV4dGVybmFsIGRlcGVuZGVuY2llc1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXVtleHRuYW1lXScsXG4gICAgICAgIGdsb2JhbHM6IHt9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9TLFNBQVMsb0JBQW9CO0FBQ2pVLE9BQU8sU0FBUztBQUVoQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixjQUFjLENBQUMsUUFBUTtBQUFBLEVBQ3pCO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsTUFDRixTQUFTLENBQUMsYUFBYTtBQUFBLE1BQ3ZCLFNBQVMsQ0FBQyxrQkFBa0I7QUFBQSxNQUM1QixhQUFhO0FBQUE7QUFBQSxNQUNiLGNBQWM7QUFBQTtBQUFBLElBQ2hCLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixVQUFVLENBQUMsV0FBVztBQUNwQixlQUFPLFdBQVcsT0FBTyxtQkFBbUI7QUFBQSxNQUM5QztBQUFBLE1BQ0EsU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLElBQ3ZCO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUM7QUFBQTtBQUFBLE1BQ1gsUUFBUTtBQUFBLFFBQ04sZ0JBQWdCO0FBQUEsUUFDaEIsU0FBUyxDQUFDO0FBQUEsTUFDWjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
