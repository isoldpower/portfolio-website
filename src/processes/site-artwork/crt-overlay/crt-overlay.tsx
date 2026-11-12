import { CrtScanlines, CrtScreen } from "@entities/site-artwork/crt-screen";
import { CrtNoise, CrtRollingRefresh, CrtVignette } from "@widgets/site-artwork/crt-screen";


function CrtOverlay() {
    return (
        <CrtScreen>
            <CrtNoise />
            <CrtScanlines />
            <CrtVignette />
            <CrtRollingRefresh />
        </CrtScreen>
    );
}

export { CrtOverlay };
