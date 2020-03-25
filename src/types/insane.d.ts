interface Options {
    allowedTags?: string[];
    allowedSchemes?: string[];
    allowedClasses?: string[];
    allowedAttributes?: AttributeOptions;
    filter?: (token: any) => boolean;
    transformText?: any;
}

interface AttributeOptions {
    a?: string[];
    iframe?: string[];
    img?: string[];
}

declare module "insane" {
    function sanitize(
        notSanitized: string,
        options?: any,
        strict?: boolean
    ): string;
    export = sanitize;
}
