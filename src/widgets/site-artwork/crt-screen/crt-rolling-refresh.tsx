import { CrtRefreshBar } from "@entities/site-artwork/crt-screen";
import { CrtRoll } from "@features/site-artwork/crt-roll";
import { AnimationComposer } from "@shared/lib/components";


function CrtRollingRefresh() {
    return (
        <AnimationComposer>
            <CrtRoll />
            <CrtRefreshBar />
        </AnimationComposer>
    );
}

export { CrtRollingRefresh };
