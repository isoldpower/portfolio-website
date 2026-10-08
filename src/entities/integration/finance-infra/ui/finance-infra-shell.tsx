import type { FC, ReactNode, Ref } from "react";


interface FinanceInfraShellProps {
    client: ReactNode;
    core: ReactNode;
    streaming: ReactNode;
    overlay?: ReactNode;
    ref?: Ref<HTMLDivElement>;
}

const FinanceInfraShell: FC<FinanceInfraShellProps> = ({
    client,
    core,
    streaming,
    overlay,
    ref
}) => {
    return (
        <div
            ref={ref}
            className="relative grid grid-cols-[10fr_70fr_20fr] gap-x-6 rounded-xl border border-foreground/10 p-4"
        >
            {overlay}
            <div className="min-w-0">
                {client}
            </div>
            <div className="min-w-0 border-l border-dashed border-foreground/15 pl-6">
                {core}
            </div>
            <div className="min-w-0 border-l border-dashed border-foreground/15 pl-6">
                {streaming}
            </div>
        </div>
    );
};

export { FinanceInfraShell };
export type { FinanceInfraShellProps };
