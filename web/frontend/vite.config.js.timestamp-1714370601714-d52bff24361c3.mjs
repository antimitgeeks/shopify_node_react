// vite.config.js
import { defineConfig } from "file:///C:/Users/antim.ITGEEKS/OneDrive/Desktop/Antim/mobilify/node_modules/vite/dist/node/index.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import react from "file:///C:/Users/antim.ITGEEKS/OneDrive/Desktop/Antim/mobilify/node_modules/@vitejs/plugin-react/dist/index.js";
import autoprefixer from "file:///C:/Users/antim.ITGEEKS/OneDrive/Desktop/Antim/mobilify/node_modules/autoprefixer/lib/autoprefixer.js";
import tailwindcss from "file:///C:/Users/antim.ITGEEKS/OneDrive/Desktop/Antim/mobilify/node_modules/tailwindcss/lib/index.js";
var __vite_injected_original_import_meta_url = "file:///C:/Users/antim.ITGEEKS/OneDrive/Desktop/Antim/mobilify/web/frontend/vite.config.js";
if (process.env.npm_lifecycle_event === "build" && !process.env.CI && !process.env.SHOPIFY_API_KEY) {
  console.warn(
    "\nBuilding the frontend app without an API key. The frontend build will not run without an API key. Set the SHOPIFY_API_KEY environment variable when running the build command.\n"
  );
}
var proxyOptions = {
  target: `http://127.0.0.1:${process.env.BACKEND_PORT}`,
  changeOrigin: false,
  secure: true,
  ws: false
};
var host = process.env.HOST ? process.env.HOST.replace(/https?:\/\//, "") : "localhost";
var hmrConfig;
if (host === "localhost") {
  hmrConfig = {
    protocol: "ws",
    host: "localhost",
    port: 64999,
    clientPort: 64999
  };
} else {
  hmrConfig = {
    protocol: "wss",
    host,
    port: process.env.FRONTEND_PORT,
    clientPort: 443
  };
}
var vite_config_default = defineConfig({
  root: dirname(fileURLToPath(__vite_injected_original_import_meta_url)),
  plugins: [react()],
  define: {
    "process.env.SHOPIFY_API_KEY": JSON.stringify(process.env.SHOPIFY_API_KEY)
  },
  resolve: {
    preserveSymlinks: true
  },
  server: {
    host: "localhost",
    port: process.env.FRONTEND_PORT,
    hmr: hmrConfig,
    proxy: {
      "^/(\\?.*)?$": proxyOptions,
      "^/api(/|(\\?.*)?$)": proxyOptions
    }
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbnRpbS5JVEdFRUtTXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcQW50aW1cXFxcbW9iaWxpZnlcXFxcd2ViXFxcXGZyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbnRpbS5JVEdFRUtTXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcQW50aW1cXFxcbW9iaWxpZnlcXFxcd2ViXFxcXGZyb250ZW5kXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hbnRpbS5JVEdFRUtTL09uZURyaXZlL0Rlc2t0b3AvQW50aW0vbW9iaWxpZnkvd2ViL2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHsgZGlybmFtZSB9IGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tIFwidXJsXCI7XHJcbmltcG9ydCBodHRwcyBmcm9tIFwiaHR0cHNcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gXCJhdXRvcHJlZml4ZXJcIjtcclxuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gXCJ0YWlsd2luZGNzc1wiO1xyXG5cclxuaWYgKFxyXG4gICAgcHJvY2Vzcy5lbnYubnBtX2xpZmVjeWNsZV9ldmVudCA9PT0gXCJidWlsZFwiICYmXHJcbiAgIXByb2Nlc3MuZW52LkNJICYmXHJcbiAgIXByb2Nlc3MuZW52LlNIT1BJRllfQVBJX0tFWVxyXG4pIHtcclxuICAgIGNvbnNvbGUud2FybihcclxuICAgICAgICBcIlxcbkJ1aWxkaW5nIHRoZSBmcm9udGVuZCBhcHAgd2l0aG91dCBhbiBBUEkga2V5LiBUaGUgZnJvbnRlbmQgYnVpbGQgd2lsbCBub3QgcnVuIHdpdGhvdXQgYW4gQVBJIGtleS4gU2V0IHRoZSBTSE9QSUZZX0FQSV9LRVkgZW52aXJvbm1lbnQgdmFyaWFibGUgd2hlbiBydW5uaW5nIHRoZSBidWlsZCBjb21tYW5kLlxcblwiXHJcbiAgICApO1xyXG59XHJcblxyXG5jb25zdCBwcm94eU9wdGlvbnMgPSB7XHJcbiAgICB0YXJnZXQ6IGBodHRwOi8vMTI3LjAuMC4xOiR7cHJvY2Vzcy5lbnYuQkFDS0VORF9QT1JUfWAsXHJcbiAgICBjaGFuZ2VPcmlnaW46IGZhbHNlLFxyXG4gICAgc2VjdXJlOiB0cnVlLFxyXG4gICAgd3M6IGZhbHNlLFxyXG59O1xyXG5cclxuY29uc3QgaG9zdCA9IHByb2Nlc3MuZW52LkhPU1RcclxuICAgID8gcHJvY2Vzcy5lbnYuSE9TVC5yZXBsYWNlKC9odHRwcz86XFwvXFwvLywgXCJcIilcclxuICAgIDogXCJsb2NhbGhvc3RcIjtcclxuXHJcbmxldCBobXJDb25maWc7XHJcbmlmIChob3N0ID09PSBcImxvY2FsaG9zdFwiKSB7XHJcbiAgICBobXJDb25maWcgPSB7XHJcbiAgICAgICAgcHJvdG9jb2w6IFwid3NcIixcclxuICAgICAgICBob3N0OiBcImxvY2FsaG9zdFwiLFxyXG4gICAgICAgIHBvcnQ6IDY0OTk5LFxyXG4gICAgICAgIGNsaWVudFBvcnQ6IDY0OTk5LFxyXG4gICAgfTtcclxufSBlbHNlIHtcclxuICAgIGhtckNvbmZpZyA9IHtcclxuICAgICAgICBwcm90b2NvbDogXCJ3c3NcIixcclxuICAgICAgICBob3N0OiBob3N0LFxyXG4gICAgICAgIHBvcnQ6IHByb2Nlc3MuZW52LkZST05URU5EX1BPUlQsXHJcbiAgICAgICAgY2xpZW50UG9ydDogNDQzLFxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICAgIHJvb3Q6IGRpcm5hbWUoZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpKSxcclxuICAgIHBsdWdpbnM6IFtyZWFjdCgpXSxcclxuICAgIGRlZmluZToge1xyXG4gICAgICAgIFwicHJvY2Vzcy5lbnYuU0hPUElGWV9BUElfS0VZXCI6IEpTT04uc3RyaW5naWZ5KHByb2Nlc3MuZW52LlNIT1BJRllfQVBJX0tFWSksXHJcbiAgICB9LFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICAgIHByZXNlcnZlU3ltbGlua3M6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgICAgaG9zdDogXCJsb2NhbGhvc3RcIixcclxuICAgICAgICBwb3J0OiBwcm9jZXNzLmVudi5GUk9OVEVORF9QT1JULFxyXG4gICAgICAgIGhtcjogaG1yQ29uZmlnLFxyXG4gICAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgICAgIFwiXi8oXFxcXD8uKik/JFwiOiBwcm94eU9wdGlvbnMsXHJcbiAgICAgICAgICAgIFwiXi9hcGkoL3woXFxcXD8uKik/JClcIjogcHJveHlPcHRpb25zLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgY3NzOiB7XHJcbiAgICAgICAgcG9zdGNzczoge1xyXG4gICAgICAgICAgICBwbHVnaW5zOiBbdGFpbHdpbmRjc3MsIGF1dG9wcmVmaXhlcl0sXHJcbiAgICAgICAgfSxcclxuICAgIH1cclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlksU0FBUyxvQkFBb0I7QUFDMWEsU0FBUyxlQUFlO0FBQ3hCLFNBQVMscUJBQXFCO0FBRTlCLE9BQU8sV0FBVztBQUNsQixPQUFPLGtCQUFrQjtBQUN6QixPQUFPLGlCQUFpQjtBQU51TyxJQUFNLDJDQUEyQztBQVFoVCxJQUNJLFFBQVEsSUFBSSx3QkFBd0IsV0FDdEMsQ0FBQyxRQUFRLElBQUksTUFDYixDQUFDLFFBQVEsSUFBSSxpQkFDYjtBQUNFLFVBQVE7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNKO0FBRUEsSUFBTSxlQUFlO0FBQUEsRUFDakIsUUFBUSxvQkFBb0IsUUFBUSxJQUFJLFlBQVk7QUFBQSxFQUNwRCxjQUFjO0FBQUEsRUFDZCxRQUFRO0FBQUEsRUFDUixJQUFJO0FBQ1I7QUFFQSxJQUFNLE9BQU8sUUFBUSxJQUFJLE9BQ25CLFFBQVEsSUFBSSxLQUFLLFFBQVEsZUFBZSxFQUFFLElBQzFDO0FBRU4sSUFBSTtBQUNKLElBQUksU0FBUyxhQUFhO0FBQ3RCLGNBQVk7QUFBQSxJQUNSLFVBQVU7QUFBQSxJQUNWLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxFQUNoQjtBQUNKLE9BQU87QUFDSCxjQUFZO0FBQUEsSUFDUixVQUFVO0FBQUEsSUFDVjtBQUFBLElBQ0EsTUFBTSxRQUFRLElBQUk7QUFBQSxJQUNsQixZQUFZO0FBQUEsRUFDaEI7QUFDSjtBQUVBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLE1BQU0sUUFBUSxjQUFjLHdDQUFlLENBQUM7QUFBQSxFQUM1QyxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsUUFBUTtBQUFBLElBQ0osK0JBQStCLEtBQUssVUFBVSxRQUFRLElBQUksZUFBZTtBQUFBLEVBQzdFO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxrQkFBa0I7QUFBQSxFQUN0QjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sTUFBTSxRQUFRLElBQUk7QUFBQSxJQUNsQixLQUFLO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxlQUFlO0FBQUEsTUFDZixzQkFBc0I7QUFBQSxJQUMxQjtBQUFBLEVBQ0o7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNELFNBQVM7QUFBQSxNQUNMLFNBQVMsQ0FBQyxhQUFhLFlBQVk7QUFBQSxJQUN2QztBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
