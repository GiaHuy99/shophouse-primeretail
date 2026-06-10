import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	turbopack: {
		root: import.meta.dirname,
	},
	images: {
		qualities: [75, 90],
		remotePatterns: [
			{ protocol: "https", hostname: "vinhome.com.vn", pathname: "/**" },
			{ protocol: "https", hostname: "vietnamland.vn", pathname: "/**" },
			{ protocol: "https", hostname: "alphareal.vn", pathname: "/**" },
			{ protocol: "https", hostname: "chamdalat.vn", pathname: "/**" },
			{ protocol: "https", hostname: "www.act.com.vn", pathname: "/**" },
		],
	},
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
