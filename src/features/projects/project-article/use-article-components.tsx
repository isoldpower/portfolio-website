import { useMemo } from "react";
import { ProjectArticle } from "@entities/projects/project-article";
import { useArticleMedia } from "./use-article-media.ts";

import type { EmbeddedProject } from "@entities/projects/model";
import type { Components } from "react-markdown";


type UseArticleComponentsReturn = Components;

const isExternalHref = (href: string | undefined): boolean => {
    return Boolean(href && /^https?:\/\//.test(href));
};

const useArticleComponents = (project: EmbeddedProject): UseArticleComponentsReturn => {
    const resolveMedia = useArticleMedia(project);

    return useMemo((): Components => ({
        h1: ({ children }) => (
            <ProjectArticle.Heading level={1}>
                {children}
            </ProjectArticle.Heading>
        ),
        h2: ({ children }) => (
            <ProjectArticle.Heading level={2}>
                {children}
            </ProjectArticle.Heading>
        ),
        h3: ({ children }) => (
            <ProjectArticle.Heading level={3}>
                {children}
            </ProjectArticle.Heading>
        ),
        h4: ({ children }) => (
            <ProjectArticle.Heading level={4}>
                {children}
            </ProjectArticle.Heading>
        ),
        p: ({ node, children }) => {
            const [onlyChild] = node?.children ?? [];
            const isMediaOnly = node?.children.length === 1 &&
                onlyChild?.type === "element" &&
                onlyChild.tagName === "img";

            return isMediaOnly ? children : (
                <ProjectArticle.Paragraph>
                    {children}
                </ProjectArticle.Paragraph>
            );
        },
        ul: ({ children }) => (
            <ProjectArticle.List isOrdered={false}>
                {children}
            </ProjectArticle.List>
        ),
        ol: ({ children }) => (
            <ProjectArticle.List isOrdered>
                {children}
            </ProjectArticle.List>
        ),
        li: ({ children }) => (
            <ProjectArticle.ListItem>
                {children}
            </ProjectArticle.ListItem>
        ),
        a: ({ href, children }) => (
            <ProjectArticle.Link
                href={href}
                target={isExternalHref(href) ? "_blank" : undefined}
                rel={isExternalHref(href) ? "noopener noreferrer" : undefined}
            >
                {children}
            </ProjectArticle.Link>
        ),
        code: ({ children }) => (
            <ProjectArticle.InlineCode>
                {children}
            </ProjectArticle.InlineCode>
        ),
        pre: ({ children }) => (
            <ProjectArticle.CodeBlock>
                {children}
            </ProjectArticle.CodeBlock>
        ),
        blockquote: ({ children }) => (
            <ProjectArticle.Quote>
                {children}
            </ProjectArticle.Quote>
        ),
        hr: () => (
            <ProjectArticle.Rule />
        ),
        table: ({ children }) => (
            <ProjectArticle.Table>
                {children}
            </ProjectArticle.Table>
        ),
        img: ({ src, alt }) => {
            const caption = alt || undefined;
            const media = resolveMedia(typeof src === "string" ? src : "");

            if (media.kind === "video") {
                return (
                    <ProjectArticle.Figure caption={caption}>
                        <ProjectArticle.Video
                            playbackId={media.video.playbackId}
                            aspectRatio={media.video.aspectRatio}
                            title={caption ?? project.title}
                        />
                    </ProjectArticle.Figure>
                );
            } else if (media.kind === "photo") {
                return (
                    <ProjectArticle.Figure caption={caption}>
                        <ProjectArticle.Image
                            src={media.photo.src}
                            width={media.photo.width}
                            height={media.photo.height}
                            alt={alt ?? ""}
                        />
                    </ProjectArticle.Figure>
                );
            } else if (media.kind === "image" && media.src) {
                return (
                    <ProjectArticle.Figure caption={caption}>
                        <ProjectArticle.Image src={media.src} alt={alt ?? ""} />
                    </ProjectArticle.Figure>
                );
            }

            return null;
        },
    }), [resolveMedia, project.title]);
};

export { useArticleComponents };
export type { UseArticleComponentsReturn };
