import { CrtVignetteLayer } from "@entities/site-artwork/crt-screen";
import { useDitherVignette } from "@features/site-artwork/crt-vignette";


function CrtVignette() {
    const vignetteRef = useDitherVignette();

    return (
        <CrtVignetteLayer ref={vignetteRef} />
    );
}

export { CrtVignette };
