import { Text } from "./text.tsx";

import type { TextClassOptions } from "../variants";
import type { TextProps } from "./text.tsx";


type PlainTextProps = Omit<TextProps, keyof TextClassOptions>;

function PlainText(props: PlainTextProps) {
    return <Text {...props} />;
}

export { PlainText };
export type { PlainTextProps };
