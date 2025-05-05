import type {ConfigEnv, Plugin, UserConfig} from "vite";
import path from "path";

export interface VitePluginOptions {
    appRootSelector?: string;
    entry?: RegExp | RegExp[];
}

export function withHydrationOverlayVite(opts: VitePluginOptions = {}): Plugin {
    const selector = opts.appRootSelector || "body";
    const entries = Array.isArray(opts.entry)
        ? opts.entry
        : [opts.entry || /entry\.client\.([tj])sx?$/];

    // this is how we recognize the initializer import
    const initModuleName = "hydration-overlay-initializer.js";
    const initImportSpecifier =
        "@wayneintacart/react-hydration-overlay/hydration-overlay-initializer";

    return {
        name: "react-hydration-overlay-vite",
        enforce: "pre",

        config(userConfig: UserConfig, env: ConfigEnv): Partial<UserConfig> {
            const existingDefine = userConfig.optimizeDeps?.esbuildOptions?.define || {};
            const existingEsbuildOptions = userConfig.optimizeDeps?.esbuildOptions || {};

            return {
                ...userConfig,
                define: {
                    ...(userConfig.define || {}),
                    "window.BUILDER_HYDRATION_OVERLAY.APP_ROOT_SELECTOR":
                        JSON.stringify(selector),
                },
                optimizeDeps: {
                    ...(userConfig.optimizeDeps || {}),
                    esbuildOptions: {
                        ...existingEsbuildOptions,
                        define: {
                            ...existingDefine,
                            "window.BUILDER_HYDRATION_OVERLAY.APP_ROOT_SELECTOR":
                                JSON.stringify(selector),
                        },
                    },
                },
            };
        },

        transform(code: string, id: string) {
            let out = code;

            // 1) inject the initializer at the top of your client entry
            if (entries.some((re) => re.test(id))) {
                out = `import "${initImportSpecifier}";\n` + out;
            }

            // 2) if this *is* the initializer module, replace its selector token
            if (id.endsWith(path.posix.join("dist", initModuleName))) {
                // replace every occurrence of the identifier with the literal
                out = out.replace(
                    /window\.BUILDER_HYDRATION_OVERLAY\.APP_ROOT_SELECTOR/g,
                    JSON.stringify(selector)
                );
            }

            // if nothing changed, return null so Vite skips source maps work
            return out === code ? null : { code: out, map: null };
        },
    };
}
