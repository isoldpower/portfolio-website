import { DefaultGutter } from "@shared/lib/components";

import { SiteFooterCopyright } from "./footer/site-footer-copyright.tsx";
import { SiteFooterCursor } from "./footer/site-footer-cursor.tsx";

import type { SiteFooterCopyrightProps } from "./footer/site-footer-copyright.tsx";
import type { SiteFooterCursorProps } from "./footer/site-footer-cursor.tsx";
import type { FC, ReactNode } from "react";


interface SiteFooterProps {
    children: ReactNode;
}

type SiteFooterObject = FC<SiteFooterProps> & {
    Copyright: FC<SiteFooterCopyrightProps>;
    Cursor: FC<SiteFooterCursorProps>;
};

const SiteFooter: SiteFooterObject = ({ children }) => {
    return (
        <footer className="relative layer-content mt-24 border-t border-accent bg-background">
            <DefaultGutter className="py-3">
                {children}
            </DefaultGutter>
        </footer>
    );
};

SiteFooter.Copyright = SiteFooterCopyright;
SiteFooter.Cursor = SiteFooterCursor;
SiteFooter.displayName = "SiteFooter";

export { SiteFooter };
export type { SiteFooterProps };
