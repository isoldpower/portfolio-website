import type { CSSProperties } from "react";


const PIXEL_GRID_CLASS = "bg-[linear-gradient(#6699ff18_1px,transparent_1px),linear-gradient(90deg,#6699ff18_1px,transparent_1px)] bg-size-[24px_24px]";

const PIXEL_FRAME: CSSProperties = {
    clipPath: "polygon(0 16px,8px 16px,8px 8px,24px 8px,24px 0,calc(100% - 24px) 0,calc(100% - 24px) 8px,calc(100% - 8px) 8px,calc(100% - 8px) 16px,100% 16px,100% calc(100% - 16px),calc(100% - 8px) calc(100% - 16px),calc(100% - 8px) calc(100% - 8px),calc(100% - 24px) calc(100% - 8px),calc(100% - 24px) 100%,24px 100%,24px calc(100% - 8px),8px calc(100% - 8px),8px calc(100% - 16px),0 calc(100% - 16px))",
    maskImage: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)",
};

export { PIXEL_FRAME, PIXEL_GRID_CLASS };
