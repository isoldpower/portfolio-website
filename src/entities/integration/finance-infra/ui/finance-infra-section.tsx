import { cn } from "@shared/lib/utilities";
import { Overline } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode, Ref } from "react";


interface FinanceInfraSectionProps {
    title: string;
    children: ReactNode;
    className?: string;
    ref?: Ref<HTMLElement>;
}

const FinanceInfraSection: FC<FinanceInfraSectionProps> = ({
    title,
    children,
    className,
    ref
}) => {
    return (
        <section ref={ref} className={cn("flex min-w-0 flex-col gap-3", className)}>
            <Overline as="h3" tone="muted">{title}</Overline>
            {children}
        </section>
    );
};

export { FinanceInfraSection };
export type { FinanceInfraSectionProps };
