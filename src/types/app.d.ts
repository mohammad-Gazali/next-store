export interface Route {
    id: number;
    href: string;
    content: string;
    authOnly?: boolean;
    icon: JSX.Element;
}