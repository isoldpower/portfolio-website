/*
 * GROQ projection pieces shared by project queries. Field names are renamed to
 * camelCase here, so snake_case CMS names never reach the components.
 */

const technologyProjection = "{ _id, title, \"iconUrl\": icon_url }";

const sourceRepoProjection = `{
    _id,
    url,
    title,
    "displayVersion": display_version,
    "techStack": coalesce(tech_stack[]->${technologyProjection}, [])
}`;

const commonProjectFields = [
    "_id",
    "title",
    "\"slug\": slug.current",
    "summary",
    "kind",
    `"extraTech": coalesce(extra_tech[]->${technologyProjection}, [])`,
];

/*
 * Only the fields of the document's current kind are returned: switching kind in the
 * Studio leaves the old kind's values behind in the document.
 */
const kindSpecificFields = [
    `kind == "terminal" => {
        "wasmRepo": wasm_repo,
        "wasmTag": wasm_tag,
        "jsArtifact": js_artifact,
        "wasmArtifact": wasm_artifact
    }`,
    // The access key itself is never selected; the page only needs to know one is set.
    `kind == "web" => {
        "deployUrl": deploy_url,
        "earlyAccess": defined(access_key) && access_key != "",
        "availableTo": coalesce(available_to, []),
        "searchIntegration": coalesce(search_integration, false)
    }`,
    `kind == "embedded" => {
        "video": video.asset->{ playbackId, "aspectRatio": data.aspect_ratio },
        "photos": coalesce(photos, [])
    }`,
];

export { commonProjectFields, kindSpecificFields, sourceRepoProjection };
