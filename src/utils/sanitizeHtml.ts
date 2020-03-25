import insane from "insane";

export default function sanitizeHtml(html: string) {
    return insane(html, { allowedTags: [] });
}
