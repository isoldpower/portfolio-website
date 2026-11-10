import { CrtNoiseLayer } from "@entities/site-artwork/crt-screen";
import { useNoiseTile } from "@features/site-artwork/crt-noise";


function CrtNoise() {
    const tile = useNoiseTile();

    return (
        <CrtNoiseLayer tile={tile} />
    );
}

export { CrtNoise };
