import { RegisterAnimation } from "@shared/lib/components";


function LoaderFade() {
    return (
        <RegisterAnimation
            id="frame-loader-fade"
            className="transition-opacity duration-320 ease-[steps(4)] motion-reduce:transition-none"
        />
    );
}

export { LoaderFade };
